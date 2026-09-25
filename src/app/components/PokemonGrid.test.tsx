import { render, screen } from "@testing-library/react";
import { PokemonGrid } from "@/app/components/PokemonGrid";

describe("PokemonGrid", () => {
  it("exibe um estado vazio acessível", () => {
    render(<PokemonGrid pokemon={[]} />);

    expect(screen.getByText("Nenhum registro encontrado")).toBeInTheDocument();
  });

  it("renderiza cartões com nome, número e tipos", () => {
    render(
      <PokemonGrid
        pokemon={[
          {
            id: 25,
            name: "pikachu",
            image: null,
            types: ["electric"],
          },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: "Ver detalhes de Pikachu" })).toHaveAttribute(
      "href",
      "/pokemon/25",
    );
    expect(screen.getByText("#0025")).toBeInTheDocument();
    expect(screen.getByText("Elétrico")).toBeInTheDocument();
  });
});