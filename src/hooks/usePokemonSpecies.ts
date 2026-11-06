// Hook for fetching Pokemon species data

import { useQuery } from '@tanstack/react-query';
import { apiGet } from '../services/api';

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}

export interface PokemonSpecies {
  id: number;
  name: string;
  flavor_text_entries: FlavorTextEntry[];
  evolution_chain: {
    url: string;
  };
}

export function usePokemonSpecies(id: number) {
  return useQuery<PokemonSpecies, Error>({
    queryKey: ['pokemon-species', id],
    queryFn: () => apiGet<PokemonSpecies>(`/pokemon-species/${id}`),
  });
}

/**
 * Extract evolution chain ID from species URL
 * Example: https://pokeapi.co/api/v2/evolution-chain/1/ -> 1
 */
export function extractEvolutionChainId(url: string): number {
  const match = url.match(/\/evolution-chain\/(\d+)\//);
  return match ? parseInt(match[1], 10) : 0;
}
