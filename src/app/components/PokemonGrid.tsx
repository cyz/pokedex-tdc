import type { PokemonSummary } from "@/lib/types";
import { PokemonCard } from "@/app/components/PokemonCard";

interface PokemonGridProps {
  pokemon: PokemonSummary[];
}

export function PokemonGrid({ pokemon }: PokemonGridProps) {
  if (pokemon.length === 0) {
    return (
      <div className="border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">
        <p className="text-xl font-black uppercase">Nenhum registro encontrado</p>
        <p className="mt-2 text-[var(--muted)]">
          Ajuste o nome ou selecione outro tipo para continuar.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {pokemon.map((item) => (
        <PokemonCard key={item.id} pokemon={item} />
      ))}
    </div>
  );
}