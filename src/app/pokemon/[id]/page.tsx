import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TypeBadge } from "@/app/components/TypeBadge";
import {
  formatResourceName,
  getPokemonDetail,
  PokeApiError,
} from "@/lib/api";

interface PokemonPageProps {
  params: Promise<{ id: string }>;
}

const STAT_LABELS: Record<string, string> = {
  hp: "Pontos de vida",
  attack: "Ataque",
  defense: "Defesa",
  "special-attack": "Ataque especial",
  "special-defense": "Defesa especial",
  speed: "Velocidade",
};

async function loadPokemon(id: string) {
  try {
    return await getPokemonDetail(id);
  } catch (error) {
    if (error instanceof PokeApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }
}

export async function generateMetadata({
  params,
}: PokemonPageProps): Promise<Metadata> {
  const { id } = await params;
  const pokemon = await loadPokemon(id);
  const name = formatResourceName(pokemon.name);

  return {
    title: name,
    description: `${name}: tipos, habilidades e atributos básicos na Pokédex Nacional.`,
  };
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { id } = await params;
  const pokemon = await loadPokemon(id);
  const displayName = formatResourceName(pokemon.name);

  return (
    <main className="min-h-screen pb-16">
      <header className="border-b-2 border-[var(--foreground)] bg-[var(--foreground)] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="font-bold uppercase underline decoration-2 underline-offset-4 hover:text-stone-200"
          >
            Voltar ao catálogo
          </Link>
          <span className="font-mono text-sm font-bold">
            #{String(pokemon.id).padStart(4, "0")}
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden border-2 border-[var(--foreground)] bg-[var(--surface)] shadow-[8px_8px_0_var(--foreground)] lg:grid-cols-[0.9fr_1.1fr]">
          <section className="relative flex min-h-[380px] items-center justify-center border-b-2 border-[var(--foreground)] bg-[var(--accent)] p-8 lg:border-b-0 lg:border-r-2">
            <div className="absolute left-5 top-5 border border-white px-3 py-2 font-mono text-xs font-bold uppercase text-white">
              Imagem oficial
            </div>
            {pokemon.image ? (
              <div className="relative aspect-square w-full max-w-md">
                <Image
                  src={pokemon.image}
                  alt={displayName}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 440px"
                  className="object-contain drop-shadow-[0_22px_14px_rgba(28,37,38,0.3)]"
                />
              </div>
            ) : (
              <p className="font-bold uppercase text-white">Imagem indisponível</p>
            )}
          </section>

          <section className="p-6 sm:p-9">
            <p className="font-mono text-sm font-bold uppercase text-[var(--accent-dark)]">
              {pokemon.genus}
            </p>
            <h1 className="mt-2 text-4xl uppercase sm:text-6xl">{displayName}</h1>
            <div className="mt-4 flex flex-wrap gap-2">
              {pokemon.types.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </div>
            <p className="mt-6 border-l-4 border-[var(--accent)] pl-4 leading-7 text-[var(--muted)]">
              {pokemon.description}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-px border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3">
              <div className="bg-[var(--surface)] p-4">
                <dt className="text-xs font-bold uppercase text-[var(--muted)]">Altura</dt>
                <dd className="mt-1 text-lg font-black">{pokemon.heightMeters} m</dd>
              </div>
              <div className="bg-[var(--surface)] p-4">
                <dt className="text-xs font-bold uppercase text-[var(--muted)]">Peso</dt>
                <dd className="mt-1 text-lg font-black">{pokemon.weightKilograms} kg</dd>
              </div>
              <div className="col-span-2 bg-[var(--surface)] p-4 sm:col-span-1">
                <dt className="text-xs font-bold uppercase text-[var(--muted)]">
                  Experiência base
                </dt>
                <dd className="mt-1 text-lg font-black">
                  {pokemon.baseExperience ?? "N/D"}
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              <h2 className="text-xl uppercase">Habilidades</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {pokemon.abilities.map(({ name, isHidden }) => (
                  <li
                    key={name}
                    className="border border-[var(--border)] bg-stone-100 px-3 py-2 text-sm font-bold"
                  >
                    {formatResourceName(name)}
                    {isHidden ? " (oculta)" : ""}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <section className="mt-12" aria-labelledby="stats-title">
          <h2 id="stats-title" className="text-2xl uppercase sm:text-3xl">
            Atributos básicos
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {pokemon.stats.map(({ name, value }) => (
              <div key={name} className="border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <span className="font-bold uppercase">{STAT_LABELS[name] ?? name}</span>
                  <span className="font-mono font-bold">{value}</span>
                </div>
                <div className="h-3 overflow-hidden bg-stone-200" aria-hidden="true">
                  <div
                    className="h-full bg-[var(--accent)]"
                    style={{ width: `${Math.min((value / 255) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <nav className="mt-10 flex items-center justify-between gap-4" aria-label="Navegação entre Pokémon">
          {pokemon.id > 1 ? (
            <Link
              href={`/pokemon/${pokemon.id - 1}`}
              className="border border-[var(--foreground)] bg-[var(--surface)] px-4 py-3 font-bold uppercase hover:bg-stone-100"
            >
              Registro anterior
            </Link>
          ) : (
            <span />
          )}
          <Link
            href={`/pokemon/${pokemon.id + 1}`}
            className="border border-[var(--foreground)] bg-[var(--surface)] px-4 py-3 text-right font-bold uppercase hover:bg-stone-100"
          >
            Próximo registro
          </Link>
        </nav>
      </div>
    </main>
  );
}