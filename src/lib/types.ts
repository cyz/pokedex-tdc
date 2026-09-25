export interface NamedApiResource {
  name: string;
  url: string;
}

export interface NamedApiResourceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedApiResource[];
}

export interface PokemonApiResponse {
  id: number;
  name: string;
  base_experience: number | null;
  height: number;
  weight: number;
  abilities: Array<{
    is_hidden: boolean;
    ability: NamedApiResource;
  }>;
  sprites: {
    front_default: string | null;
    other?: {
      "official-artwork"?: {
        front_default: string | null;
      };
    };
  };
  stats: Array<{
    base_stat: number;
    stat: NamedApiResource;
  }>;
  types: Array<{
    slot: number;
    type: NamedApiResource;
  }>;
}

export interface PokemonSpeciesApiResponse {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: NamedApiResource;
  }>;
  genera: Array<{
    genus: string;
    language: NamedApiResource;
  }>;
}

export interface PokemonTypeApiResponse {
  id: number;
  name: string;
  pokemon: Array<{
    slot: number;
    pokemon: NamedApiResource;
  }>;
}

export interface PokemonSummary {
  id: number;
  name: string;
  image: string | null;
  types: string[];
}

export interface PokemonDetail extends PokemonSummary {
  description: string;
  genus: string;
  heightMeters: number;
  weightKilograms: number;
  baseExperience: number | null;
  abilities: Array<{
    name: string;
    isHidden: boolean;
  }>;
  stats: Array<{
    name: string;
    value: number;
  }>;
}

export interface PokemonCatalog {
  items: PokemonSummary[];
  total: number;
  hasMore: boolean;
}

export interface CatalogOptions {
  query?: string;
  type?: string;
  generation?: string;
  limit?: number;
}