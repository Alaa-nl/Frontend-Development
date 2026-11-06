// Pokemon API service functions

import { apiGet } from './api';

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonWithId extends PokemonListItem {
  id: number;
}

/**
 * Extract Pokemon ID from PokeAPI URL
 * Example: https://pokeapi.co/api/v2/pokemon/25/ -> 25
 */
export function extractPokemonId(url: string): number {
  const match = url.match(/\/pokemon\/(\d+)\//);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Fetch all Pokemon in one request for list and search reuse
 */
export async function fetchPokemonList(): Promise<PokemonWithId[]> {
  const response = await apiGet<PokemonListResponse>(
    '/pokemon?limit=100000&offset=0',
  );

  return response.results.map((pokemon) => ({
    ...pokemon,
    id: extractPokemonId(pokemon.url),
  }));
}

/**
 * Get sprite URL for a Pokemon by ID
 */
export function getPokemonSpriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
