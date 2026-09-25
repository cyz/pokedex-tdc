import {
  INITIAL_PAGE_SIZE,
  MAX_VISIBLE_POKEMON,
  POKE_API_REVALIDATE_SECONDS,
  POKE_API_URL,
} from "@/lib/constants";
import type {
  CatalogOptions,
  NamedApiResource,
  NamedApiResourceList,
  PokemonApiResponse,
  PokemonCatalog,
  PokemonDetail,
  PokemonSpeciesApiResponse,
  PokemonSummary,
  PokemonTypeApiResponse,
} from "@/lib/types";

export class PokeApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "PokeApiError";
  }
}

async function fetchPokeApi<T>(path: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${POKE_API_URL}${path}`, {
      next: { revalidate: POKE_API_REVALIDATE_SECONDS },
    });
  } catch {
    throw new PokeApiError("Não foi possível conectar à PokéAPI.");
  }

  if (!response.ok) {
    throw new PokeApiError(
      response.status === 404
        ? "Pokémon não encontrado."
        : "A PokéAPI não está disponível no momento.",
      response.status,
    );
  }

  return response.json() as Promise<T>;
}

export function extractResourceId(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

export function formatResourceName(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function normalizeFlavorText(text: string): string {
  return text.replace(/[\n\f\r]+/g, " ").replace(/\s+/g, " ").trim();
}

export function filterPokemonResources(
  resources: NamedApiResource[],
  query: string,
): NamedApiResource[] {
  const normalizedQuery = query.trim().toLocaleLowerCase().replace(/\s+/g, "-");

  return resources
    .filter(({ name }) => name.toLocaleLowerCase().includes(normalizedQuery))
    .sort((first, second) => extractResourceId(first.url) - extractResourceId(second.url));
}

export function toPokemonSummary(pokemon: PokemonApiResponse): PokemonSummary {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image:
      pokemon.sprites.other?.["official-artwork"]?.front_default ??
      pokemon.sprites.front_default,
    types: [...pokemon.types]
      .sort((first, second) => first.slot - second.slot)
      .map(({ type }) => type.name),
  };
}

export async function getPokemonIndex(): Promise<NamedApiResource[]> {
  const data = await fetchPokeApi<NamedApiResourceList>(
    "/pokemon?limit=100000&offset=0",
  );
  return data.results;
}

export async function getPokemonTypes(): Promise<NamedApiResource[]> {
  const data = await fetchPokeApi<NamedApiResourceList>("/type?limit=100");
  return data.results.filter(({ url }) => extractResourceId(url) <= 19);
}

export async function getPokemonByType(type: string): Promise<NamedApiResource[]> {
  const data = await fetchPokeApi<PokemonTypeApiResponse>(
    `/type/${encodeURIComponent(type.toLocaleLowerCase())}`,
  );
  return data.pokemon.map(({ pokemon }) => pokemon);
}

export async function getPokemon(idOrName: string | number): Promise<PokemonApiResponse> {
  const identifier = encodeURIComponent(String(idOrName).trim().toLocaleLowerCase());
  return fetchPokeApi<PokemonApiResponse>(`/pokemon/${identifier}`);
}

export async function getPokemonSpecies(
  idOrName: string | number,
): Promise<PokemonSpeciesApiResponse> {
  const identifier = encodeURIComponent(String(idOrName).trim().toLocaleLowerCase());
  return fetchPokeApi<PokemonSpeciesApiResponse>(`/pokemon-species/${identifier}`);
}

export async function getPokemonCatalog({
  query = "",
  type = "",
  limit = INITIAL_PAGE_SIZE,
}: CatalogOptions = {}): Promise<PokemonCatalog> {
  const resources = type ? await getPokemonByType(type) : await getPokemonIndex();
  const filtered = filterPokemonResources(resources, query);
  const safeLimit = Math.min(
    Math.max(Math.trunc(limit) || INITIAL_PAGE_SIZE, INITIAL_PAGE_SIZE),
    MAX_VISIBLE_POKEMON,
  );
  const visibleResources = filtered.slice(0, safeLimit);
  const pokemon = await Promise.all(
    visibleResources.map(({ name }) => getPokemon(name)),
  );

  return {
    items: pokemon.map(toPokemonSummary),
    total: filtered.length,
    hasMore: safeLimit < filtered.length && safeLimit < MAX_VISIBLE_POKEMON,
  };
}

export async function getPokemonDetail(idOrName: string): Promise<PokemonDetail> {
  const pokemon = await getPokemon(idOrName);
  const species = await getPokemonSpecies(pokemon.id);
  const descriptionEntry = species.flavor_text_entries.find(
    ({ language }) => language.name === "en",
  );
  const genusEntry = species.genera.find(({ language }) => language.name === "en");

  return {
    ...toPokemonSummary(pokemon),
    description: descriptionEntry
      ? normalizeFlavorText(descriptionEntry.flavor_text)
      : "Descrição não disponível.",
    genus: genusEntry?.genus ?? "Pokémon",
    heightMeters: pokemon.height / 10,
    weightKilograms: pokemon.weight / 10,
    baseExperience: pokemon.base_experience,
    abilities: pokemon.abilities.map(({ ability, is_hidden: isHidden }) => ({
      name: ability.name,
      isHidden,
    })),
    stats: pokemon.stats.map(({ base_stat: value, stat }) => ({
      name: stat.name,
      value,
    })),
  };
}