import {
  extractResourceId,
  filterPokemonResources,
  formatResourceName,
  getPokemonCatalog,
  getPokemon,
  normalizeFlavorText,
  PokeApiError,
} from "@/lib/api";

describe("PokéAPI helpers", () => {
  it("extrai o ID e ordena resultados filtrados pela Pokédex", () => {
    const resources = [
      { name: "raichu", url: "https://pokeapi.co/api/v2/pokemon/26/" },
      { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
      { name: "pichu", url: "https://pokeapi.co/api/v2/pokemon/172/" },
    ];

    expect(extractResourceId(resources[0].url)).toBe(26);
    expect(filterPokemonResources(resources, "CHU").map(({ name }) => name)).toEqual([
      "pikachu",
      "raichu",
      "pichu",
    ]);
  });

  it("normaliza nomes e textos retornados pela API", () => {
    expect(formatResourceName("mr-mime")).toBe("Mr Mime");
    expect(normalizeFlavorText("Uma linha\ncom\f espaços.")).toBe(
      "Uma linha com espaços.",
    );
  });
});

describe("PokéAPI requests", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("converte resposta 404 em erro de domínio", async () => {
    jest.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);

    await expect(getPokemon("inexistente")).rejects.toEqual(
      expect.objectContaining<PokeApiError>({
        message: "Pokémon não encontrado.",
        status: 404,
      }),
    );
  });

  it("converte falha de rede em erro de domínio", async () => {
    jest.mocked(fetch).mockRejectedValue(new Error("offline"));

    await expect(getPokemon("pikachu")).rejects.toThrow(
      "Não foi possível conectar à PokéAPI.",
    );
  });

  it("busca detalhes somente dos registros visíveis", async () => {
    const resources = Array.from({ length: 30 }, (_, index) => ({
      name: `pokemon-${index + 1}`,
      url: `https://pokeapi.co/api/v2/pokemon/${index + 1}/`,
    }));

    jest.mocked(fetch).mockImplementation(async (input) => {
      const url = String(input);

      if (url.includes("limit=100000")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({ count: 30, next: null, previous: null, results: resources }),
        } as Response;
      }

      const id = Number(url.match(/pokemon-(\d+)$/)?.[1]);
      return {
        ok: true,
        status: 200,
        json: async () => ({
          id,
          name: `pokemon-${id}`,
          base_experience: 50,
          height: 10,
          weight: 100,
          abilities: [],
          sprites: { front_default: null },
          stats: [],
          types: [],
        }),
      } as Response;
    });

    const catalog = await getPokemonCatalog({ limit: 24 });

    expect(catalog.items).toHaveLength(24);
    expect(catalog.total).toBe(30);
    expect(catalog.hasMore).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(25);
  });
});