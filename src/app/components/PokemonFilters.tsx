import Link from "next/link";
import { GENERATIONS, TYPE_LABELS } from "@/lib/constants";
import type { NamedApiResource } from "@/lib/types";

interface PokemonFiltersProps {
  query: string;
  selectedType: string;
  selectedGeneration: string;
  types: NamedApiResource[];
}

export function PokemonFilters({
  query,
  selectedType,
  selectedGeneration,
  types,
}: PokemonFiltersProps) {
  return (
    <form
      action="/"
      className="grid gap-4 border-y-2 border-[var(--foreground)] bg-[var(--surface)] px-4 py-5 md:grid-cols-[minmax(0,1fr)_minmax(180px,0.35fr)_minmax(180px,0.35fr)_auto_auto] md:items-end"
    >
      <label className="grid gap-2 text-sm font-bold uppercase" htmlFor="pokemon-search">
        Buscar por nome
        <input
          id="pokemon-search"
          name="q"
          type="search"
          defaultValue={query}
          placeholder="Ex.: pikachu"
          className="h-11 min-w-0 border border-[var(--border)] bg-white px-3 text-base font-normal normal-case placeholder:text-stone-400"
        />
      </label>

      <label className="grid gap-2 text-sm font-bold uppercase" htmlFor="pokemon-type">
        Tipo
        <select
          id="pokemon-type"
          name="type"
          defaultValue={selectedType}
          className="h-11 border border-[var(--border)] bg-white px-3 text-base font-normal normal-case"
        >
          <option value="">Todos os tipos</option>
          {types.map(({ name }) => (
            <option key={name} value={name}>
              {TYPE_LABELS[name] ?? name}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-sm font-bold uppercase" htmlFor="pokemon-generation">
        Geração
        <select
          id="pokemon-generation"
          name="generation"
          defaultValue={selectedGeneration}
          className="h-11 border border-[var(--border)] bg-white px-3 text-base font-normal normal-case"
        >
          <option value="">Todas as gerações</option>
          {GENERATIONS.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="h-11 bg-[var(--accent)] px-6 font-black uppercase text-white hover:bg-[var(--accent-dark)]"
      >
        Buscar
      </button>
      <Link
        href="/"
        className="flex h-11 items-center justify-center border border-[var(--foreground)] px-5 font-bold uppercase hover:bg-stone-100"
      >
        Limpar
      </Link>
    </form>
  );
}