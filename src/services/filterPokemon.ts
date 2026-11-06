// Filter Pokemon list by name query

import { PokemonWithId } from './pokemon';

/**
 * Filter Pokemon list by name (case-insensitive, partial match)
 * @param pokemon - Full list of Pokemon
 * @param query - Search query string
 * @returns Filtered list of Pokemon matching the query
 */
export function filterPokemon(
  pokemon: PokemonWithId[],
  query: string,
): PokemonWithId[] {
  if (!query.trim()) {
    return pokemon;
  }

  const normalizedQuery = query.toLowerCase().trim();
  return pokemon.filter((p) => p.name.toLowerCase().includes(normalizedQuery));
}
