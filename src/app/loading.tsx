export default function Loading() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="font-mono text-sm font-bold uppercase" role="status">
        Consultando registros da Pokédex...
      </p>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            className="aspect-[3/4] animate-pulse border border-[var(--border)] bg-stone-200"
          />
        ))}
      </div>
    </main>
  );
}