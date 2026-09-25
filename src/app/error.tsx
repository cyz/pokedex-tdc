"use client";

interface ErrorPageProps {
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-lg border-2 border-[var(--foreground)] bg-[var(--surface)] p-8 text-center shadow-[6px_6px_0_var(--foreground)]">
        <p className="font-mono text-sm font-bold uppercase text-[var(--accent-dark)]">
          Falha de comunicação
        </p>
        <h1 className="mt-3 text-3xl uppercase">Não foi possível carregar os registros</h1>
        <p className="mt-3 text-[var(--muted)]">
          Verifique sua conexão e tente consultar a Pokédex novamente.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 bg-[var(--accent)] px-6 py-3 font-black uppercase text-white hover:bg-[var(--accent-dark)]"
        >
          Tentar novamente
        </button>
      </div>
    </main>
  );
}