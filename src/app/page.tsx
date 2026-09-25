import { Suspense } from "react";
import { LoadMoreButton } from "@/app/components/LoadMoreButton";
import { PokemonFilters } from "@/app/components/PokemonFilters";
import { PokemonGrid } from "@/app/components/PokemonGrid";
import {
  INITIAL_PAGE_SIZE,
  MAX_VISIBLE_POKEMON,
} from "@/lib/constants";
import { getPokemonCatalog, getPokemonTypes } from "@/lib/api";

interface HomeProps {
  searchParams: Promise<{
    q?: string;
    type?: string;
    generation?: string;
    limit?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const type = params.type?.trim() ?? "";
  const generation = params.generation?.trim() ?? "";
  const parsedLimit = Number.parseInt(params.limit ?? "", 10);
  const limit = Number.isFinite(parsedLimit)
    ? Math.min(Math.max(parsedLimit, INITIAL_PAGE_SIZE), MAX_VISIBLE_POKEMON)
    : INITIAL_PAGE_SIZE;
  const [catalog, types] = await Promise.all([
    getPokemonCatalog({ query, type, generation, limit }),
    getPokemonTypes(),
  ]);

  return (
    <main className="min-h-screen pb-16">
      <header className="border-b-2 border-[var(--foreground)] bg-[var(--accent)] text-white">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-4 py-8 sm:px-6 lg:px-8">
          <div>
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.2em]">
              Arquivo de espécies
            </p>
            <h1 className="text-4xl uppercase sm:text-6xl">Pokédex Nacional</h1>
          </div>
          <span className="hidden border border-white px-3 py-2 font-mono text-sm font-bold md:block">
            DATA / 001
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PokemonFilters
          query={query}
          selectedType={type}
          selectedGeneration={generation}
          types={types}
        />

        <section className="pt-9" aria-labelledby="catalog-title">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
                Catálogo pesquisável
              </p>
              <h2 id="catalog-title" className="mt-1 text-2xl uppercase sm:text-3xl">
                Registros encontrados
              </h2>
            </div>
            <p className="font-mono text-sm font-bold" aria-live="polite">
              Exibindo {catalog.items.length} de {catalog.total}
            </p>
          </div>

          <PokemonGrid pokemon={catalog.items} />
          {catalog.hasMore ? (
            <Suspense fallback={null}>
              <LoadMoreButton currentLimit={limit} />
            </Suspense>
          ) : null}
        </section>
      </div>
    </main>
  );
}
