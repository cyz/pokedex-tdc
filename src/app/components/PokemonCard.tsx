import Image from "next/image";
import Link from "next/link";
import { formatResourceName } from "@/lib/api";
import type { PokemonSummary } from "@/lib/types";
import { TypeBadge } from "@/app/components/TypeBadge";

interface PokemonCardProps {
  pokemon: PokemonSummary;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <article className="group relative overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[0_5px_0_rgba(28,37,38,0.12)] transition-transform duration-200 hover:-translate-y-1">
      <Link
        href={`/pokemon/${pokemon.id}`}
        className="block h-full p-4"
        aria-label={`Ver detalhes de ${formatResourceName(pokemon.name)}`}
      >
        <div className="flex items-center justify-between border-b border-dashed border-[var(--border)] pb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
            Registro
          </span>
          <span className="font-mono text-sm font-bold text-[var(--accent-dark)]">
            #{String(pokemon.id).padStart(4, "0")}
          </span>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-52">
          {pokemon.image ? (
            <Image
              src={pokemon.image}
              alt={formatResourceName(pokemon.name)}
              fill
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 30vw, 220px"
              className="object-contain drop-shadow-[0_14px_10px_rgba(28,37,38,0.18)] transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[var(--muted)]">
              Imagem indisponível
            </div>
          )}
        </div>

        <h2 className="mb-3 text-xl font-black uppercase">
          {formatResourceName(pokemon.name)}
        </h2>
        <div className="flex flex-wrap gap-2">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </Link>
    </article>
  );
}