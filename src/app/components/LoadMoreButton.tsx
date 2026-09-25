"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { PAGE_INCREMENT } from "@/lib/constants";

interface LoadMoreButtonProps {
  currentLimit: number;
}

export function LoadMoreButton({ currentLimit }: LoadMoreButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function loadMore() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", String(currentLimit + PAGE_INCREMENT));
    startTransition(() => {
      router.push(`/?${params.toString()}`, { scroll: false });
    });
  }

  return (
    <div className="mt-10 flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={loadMore}
        disabled={isPending}
        className="min-h-12 border-2 border-[var(--foreground)] bg-[var(--surface)] px-8 font-black uppercase shadow-[4px_4px_0_var(--foreground)] hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
      >
        {isPending ? "Carregando..." : "Carregar mais"}
      </button>
      <p className="sr-only" aria-live="polite">
        {isPending ? "Carregando mais Pokémon" : ""}
      </p>
    </div>
  );
}