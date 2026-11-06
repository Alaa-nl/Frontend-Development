// Hook for fetching evolution chain data

import { useQuery } from '@tanstack/react-query';
import { apiGet } from '../services/api';

export interface EvolutionDetail {
  min_level: number | null;
  trigger: {
    name: string;
    url: string;
  };
}

export interface ChainLink {
  species: {
    name: string;
    url: string;
  };
  evolves_to: ChainLink[];
  evolution_details: EvolutionDetail[];
}

export interface EvolutionChain {
  id: number;
  chain: ChainLink;
}

export interface FlatEvolution {
  id: number;
  name: string;
}

export function useEvolutionChain(id: number) {
  return useQuery<EvolutionChain, Error>({
    queryKey: ['evolution-chain', id],
    queryFn: () => apiGet<EvolutionChain>(`/evolution-chain/${id}`),
  });
}

/**
 * Extract Pokemon ID from species URL
 * Example: https://pokeapi.co/api/v2/pokemon-species/1/ -> 1
 */
export function extractSpeciesId(url: string): number {
  const match = url.match(/\/pokemon-species\/(\d+)\//);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Flatten evolution chain into a simple array
 */
export function flattenEvolutionChain(chain: ChainLink): FlatEvolution[] {
  const result: FlatEvolution[] = [];

  function traverse(link: ChainLink) {
    const id = extractSpeciesId(link.species.url);
    result.push({
      id,
      name: link.species.name,
    });

    for (const evolution of link.evolves_to) {
      traverse(evolution);
    }
  }

  traverse(chain);
  return result;
}
