import { FlatList, StyleSheet, Text, View, ActivityIndicator, Pressable, ListRenderItemInfo, TextInput } from 'react-native';
import { useState, useMemo } from 'react';
import { usePokemonList } from '../hooks/usePokemonList';
import { PokemonRow, POKEMON_ROW_HEIGHT } from '../components/PokemonRow';
import { colors, spacing } from '../constants/theme';
import { PokemonWithId } from '../services/pokemon';
import { filterPokemon } from '../services/filterPokemon';

export default function Index() {
  const { data: pokemon, isLoading, error, refetch } = usePokemonList();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPokemon = useMemo(() => {
    if (!pokemon) return [];
    return filterPokemon(pokemon, searchQuery);
  }, [pokemon, searchQuery]);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading Pokémon...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Failed to load Pokémon</Text>
        <Text style={styles.errorMessage}>{error.message}</Text>
        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  const renderItem = ({ item }: ListRenderItemInfo<PokemonWithId>) => (
    <PokemonRow id={item.id} name={item.name} />
  );

  const getItemLayout = (_data: ArrayLike<PokemonWithId> | null | undefined, index: number) => ({
    length: POKEMON_ROW_HEIGHT,
    offset: POKEMON_ROW_HEIGHT * index,
    index,
  });

  const showEmptyState = searchQuery.trim() && filteredPokemon.length === 0;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Pokémon"
          placeholderTextColor={colors.textLight}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {showEmptyState ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Pokémon found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPokemon}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          getItemLayout={getItemLayout}
          initialNumToRender={15}
          maxToRenderPerBatch={10}
          windowSize={10}
          removeClippedSubviews={true}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  searchInput: {
    height: 48,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  list: {
    flex: 1,
    backgroundColor: colors.background,
  },
  emptyContainer: {
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
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: 16,
    color: colors.textLight,
    fontFamily: 'Rubik-Regular',
  },
  errorText: {
    fontSize: 18,
    color: colors.error,
    fontFamily: 'Rubik-Bold',
    marginBottom: spacing.sm,
  },
  errorMessage: {
    fontSize: 14,
    color: colors.textLight,
    fontFamily: 'Rubik-Regular',
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.background,
    fontSize: 16,
    fontFamily: 'Rubik-Bold',
  },
});
