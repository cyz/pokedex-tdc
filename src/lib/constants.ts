export const POKE_API_URL = "https://pokeapi.co/api/v2";
export const POKE_API_REVALIDATE_SECONDS = 60 * 60 * 24;
export const INITIAL_PAGE_SIZE = 24;
export const PAGE_INCREMENT = 24;
export const MAX_VISIBLE_POKEMON = 240;

export const GENERATIONS = [
  { id: "1", name: "Kanto", startId: 1, endId: 151 },
  { id: "2", name: "Johto", startId: 152, endId: 251 },
  { id: "3", name: "Hoenn", startId: 252, endId: 386 },
  { id: "4", name: "Sinnoh", startId: 387, endId: 493 },
  { id: "5", name: "Unova", startId: 494, endId: 649 },
  { id: "6", name: "Kalos", startId: 650, endId: 721 },
  { id: "7", name: "Alola", startId: 722, endId: 809 },
  { id: "8", name: "Galar", startId: 810, endId: 898 },
  { id: "9", name: "Paldea", startId: 906, endId: 1025 },
] as const;

export const TYPE_LABELS: Record<string, string> = {
  normal: "Normal",
  fire: "Fogo",
  water: "Água",
  electric: "Elétrico",
  grass: "Planta",
  ice: "Gelo",
  fighting: "Lutador",
  poison: "Venenoso",
  ground: "Terrestre",
  flying: "Voador",
  psychic: "Psíquico",
  bug: "Inseto",
  rock: "Pedra",
  ghost: "Fantasma",
  dragon: "Dragão",
  dark: "Sombrio",
  steel: "Aço",
  fairy: "Fada",
  stellar: "Estelar",
};

export const TYPE_STYLES: Record<string, string> = {
  normal: "bg-stone-200 text-stone-900",
  fire: "bg-orange-500 text-white",
  water: "bg-sky-600 text-white",
  electric: "bg-yellow-300 text-stone-950",
  grass: "bg-emerald-600 text-white",
  ice: "bg-cyan-200 text-cyan-950",
  fighting: "bg-red-700 text-white",
  poison: "bg-fuchsia-700 text-white",
  ground: "bg-amber-700 text-white",
  flying: "bg-indigo-300 text-indigo-950",
  psychic: "bg-pink-600 text-white",
  bug: "bg-lime-600 text-stone-950",
  rock: "bg-yellow-700 text-white",
  ghost: "bg-violet-800 text-white",
  dragon: "bg-indigo-700 text-white",
  dark: "bg-neutral-800 text-white",
  steel: "bg-slate-500 text-white",
  fairy: "bg-pink-300 text-pink-950",
  stellar: "bg-teal-600 text-white",
};