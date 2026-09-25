import Link from "next/link";

export default function PokemonNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-lg border-2 border-[var(--foreground)] bg-[var(--surface)] p-8 text-center shadow-[6px_6px_0_var(--foreground)]">
        <p className="font-mono text-sm font-bold uppercase text-[var(--accent-dark)]">
          Erro 404
        </p>
        <h1 className="mt-3 text-3xl uppercase">Registro não encontrado</h1>
        <p className="mt-3 text-[var(--muted)]">
          Esse nome ou número não corresponde a um Pokémon disponível.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex bg-[var(--accent)] px-6 py-3 font-black uppercase text-white hover:bg-[var(--accent-dark)]"
        >
          Voltar ao catálogo
        </Link>
      </div>
    </main>
  );
}