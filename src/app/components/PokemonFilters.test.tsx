import { render, screen } from "@testing-library/react";
import { PokemonFilters } from "@/app/components/PokemonFilters";

describe("PokemonFilters", () => {
  it("mantém busca, tipo e geração selecionados no formulário GET", () => {
    render(
      <PokemonFilters
        query="pika"
        selectedType="electric"
        selectedGeneration="1"
        types={[
          { name: "fire", url: "https://pokeapi.co/api/v2/type/10/" },
          { name: "electric", url: "https://pokeapi.co/api/v2/type/13/" },
        ]}
      />,
    );

    expect(screen.getByRole("searchbox", { name: "Buscar por nome" })).toHaveValue("pika");
    expect(screen.getByRole("combobox", { name: "Tipo" })).toHaveValue("electric");
    expect(screen.getByRole("combobox", { name: "Geração" })).toHaveValue("1");
    expect(screen.getByRole("option", { name: "Todas as gerações" })).toHaveValue("");
    expect(screen.getByRole("option", { name: "Paldea" })).toHaveValue("9");
    expect(screen.getByRole("button", { name: "Buscar" })).toHaveAttribute("type", "submit");
    expect(screen.getByRole("link", { name: "Limpar" })).toHaveAttribute("href", "/");
  });
});