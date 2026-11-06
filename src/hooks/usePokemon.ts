// Hook for fetching Pokemon details

import { useQuery } from '@tanstack/react-query';
import { apiGet } from '../services/api';

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

export function usePokemon(id: number) {
  return useQuery<Pokemon, Error>({
    queryKey: ['pokemon', id],
    queryFn: () => apiGet<Pokemon>(`/pokemon/${id}`),
  });
}
