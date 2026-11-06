// TanStack Query hooks for favorites

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addFavorite,
  getAllFavorites,
  isFavorite,
  removeFavorite,
  type Favorite,
} from '../services/favorites';

/**
 * Get all favorites, newest first
 */
export function useFavoritesList() {
  return useQuery<Favorite[], Error>({
    queryKey: ['favorites'],
    queryFn: getAllFavorites,
  });
}

/**
 * Check if a Pokemon is favorited
 */
export function useIsFavorite(id: number) {
  return useQuery<boolean, Error>({
    queryKey: ['favorites', 'is-favorite', id],
    queryFn: () => isFavorite(id),
  });
}

/**
 * Add a Pokemon to favorites
 */
export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      addFavorite(id, name),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({
        queryKey: ['favorites', 'is-favorite', variables.id],
      });
    },
  });
}

/**
 * Remove a Pokemon from favorites
 */
export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => removeFavorite(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({
        queryKey: ['favorites', 'is-favorite', id],
      });
    },
  });
}
