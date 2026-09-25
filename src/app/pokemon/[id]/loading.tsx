export default function PokemonLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="font-mono text-sm font-bold uppercase" role="status">
        Abrindo registro do Pokémon...
      </p>
      <div className="mt-6 grid overflow-hidden border-2 border-[var(--foreground)] lg:grid-cols-2">
        <div className="min-h-96 animate-pulse bg-red-200" />
        <div className="min-h-96 animate-pulse bg-stone-200" />
      </div>
    </main>
  );
}