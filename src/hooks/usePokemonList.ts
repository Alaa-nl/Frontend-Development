// Hook for fetching the complete Pokemon list

import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList, PokemonWithId } from '../services/pokemon';

export function usePokemonList() {
  return useQuery<PokemonWithId[], Error>({
    queryKey: ['pokemon', 'list'],
    queryFn: fetchPokemonList,
  });
}
