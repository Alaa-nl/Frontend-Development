import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { PokemonRow } from '../components/PokemonRow';
import { colors, spacing } from '../constants/theme';
import { useFavoritesList } from '../hooks/useFavorites';

export default function FavoritesScreen() {
  const { data: favorites, isLoading, error, refetch } = useFavoritesList();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size='large' color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load favorites</Text>
        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No favorites yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <PokemonRow id={item.id} name={item.name} />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
    fontFamily: 'Rubik-Regular',
  },
  errorText: {
    fontSize: 18,
    color: colors.error,
    fontFamily: 'Rubik-Bold',
    marginBottom: spacing.md,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  retryText: {
    color: colors.background,
    fontFamily: 'Rubik-Medium',
    fontSize: 16,
  },
});
