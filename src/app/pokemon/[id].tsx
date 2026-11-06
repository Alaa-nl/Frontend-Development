// Pokemon detail screen

import { useLocalSearchParams, router } from 'expo-router';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { usePokemon } from '../../hooks/usePokemon';
import {
  extractEvolutionChainId,
  usePokemonSpecies,
} from '../../hooks/usePokemonSpecies';
import {
  flattenEvolutionChain,
  useEvolutionChain,
} from '../../hooks/useEvolutionChain';
import {
  useAddFavorite,
  useIsFavorite,
  useRemoveFavorite,
} from '../../hooks/useFavorites';
import { colors, spacing, typeColors } from '../../constants/theme';
import { getPokemonSpriteUrl } from '../../services/pokemon';

type Tab = 'about' | 'stats' | 'evolution';

export default function PokemonDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pokemonId = parseInt(id, 10);
  const [activeTab, setActiveTab] = useState<Tab>('about');

  const { data: pokemon, isLoading, error } = usePokemon(pokemonId);
  const { data: species } = usePokemonSpecies(pokemonId);
  const { data: isFav } = useIsFavorite(pokemonId);
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const evolutionChainId = species
    ? extractEvolutionChainId(species.evolution_chain.url)
    : 0;
  const {
    data: evolutionChain,
    isLoading: isLoadingEvolution,
    error: evolutionError,
  } = useEvolutionChain(evolutionChainId);

  const handleToggleFavorite = async () => {
    if (!pokemon) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (isFav) {
      removeFavorite.mutate(pokemonId);
    } else {
      addFavorite.mutate({ id: pokemonId, name: pokemon.name });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>Failed to load Pokémon</Text>
        <Text style={styles.errorSubtext}>
          {error?.message || 'Unknown error'}
        </Text>
      </View>
    );
  }

  const primaryType = pokemon.types[0].type.name;
  const typeColor = typeColors[primaryType] || colors.primary;

  const description = species?.flavor_text_entries.find(
    (entry) => entry.language.name === 'en',
  )?.flavor_text;

  const evolutions = evolutionChain
    ? flattenEvolutionChain(evolutionChain.chain)
    : [];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: typeColor }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.name}>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </Text>
            <Text style={styles.number}>#{String(pokemon.id).padStart(3, '0')}</Text>
          </View>
          <Pressable onPress={handleToggleFavorite} style={styles.favoriteBtn}>
            <Text style={styles.favoriteIcon}>{isFav ? '❤️' : '🤍'}</Text>
          </Pressable>
        </View>

        <Image
          source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
          style={styles.artwork}
          resizeMode="contain"
        />

        <View style={styles.types}>
          {pokemon.types.map((type) => (
            <View
              key={type.type.name}
              style={[
                styles.typeTag,
                { backgroundColor: typeColors[type.type.name] || colors.primary },
              ]}
            >
              <Text style={styles.typeText}>
                {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Pressable
          onPress={() => setActiveTab('about')}
          style={[styles.tab, activeTab === 'about' && styles.tabActive]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'about' && styles.tabTextActive,
            ]}
          >
            About
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('stats')}
          style={[styles.tab, activeTab === 'stats' && styles.tabActive]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'stats' && styles.tabTextActive,
            ]}
          >
            Stats
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('evolution')}
          style={[styles.tab, activeTab === 'evolution' && styles.tabActive]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'evolution' && styles.tabTextActive,
            ]}
          >
            Evolution
          </Text>
        </Pressable>
      </View>

      {/* Tab Content */}
      <View style={styles.content}>
        {activeTab === 'about' && (
          <View>
            {description && (
              <Text style={styles.description}>
                {description.replace(/\f/g, ' ')}
              </Text>
            )}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Height</Text>
              <Text style={styles.infoValue}>{pokemon.height / 10} m</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Weight</Text>
              <Text style={styles.infoValue}>{pokemon.weight / 10} kg</Text>
            </View>
          </View>
        )}

        {activeTab === 'stats' && (
          <View>
            {pokemon.stats.map((stat) => {
              const statName = stat.stat.name
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

              return (
                <View key={stat.stat.name} style={styles.statRow}>
                  <Text style={styles.statName}>{statName}</Text>
                  <Text style={styles.statValue}>{stat.base_stat}</Text>
                  <View style={styles.statBarBg}>
                    <View
                      style={[
                        styles.statBarFill,
                        {
                          width: `${Math.min(100, (stat.base_stat / 200) * 100)}%`,
                          backgroundColor: typeColor,
                        },
                      ]}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {activeTab === 'evolution' && (
          <View>
            {isLoadingEvolution && (
              <ActivityIndicator size="small" color={colors.primary} />
            )}
            {evolutionError && (
              <Text style={styles.errorText}>Failed to load evolution chain</Text>
            )}
            {evolutions.length > 0 && (
              <View style={styles.evolutionChain}>
                {evolutions.map((evo, index) => (
                  <View key={evo.id}>
                    <Pressable
                      onPress={() => router.push(`/pokemon/${evo.id}`)}
                      style={styles.evolutionItem}
                    >
                      <Image
                        source={{ uri: getPokemonSpriteUrl(evo.id) }}
                        style={styles.evolutionImage}
                        resizeMode="contain"
                      />
                      <Text style={styles.evolutionName}>
                        {evo.name.charAt(0).toUpperCase() + evo.name.slice(1)}
                      </Text>
                      <Text style={styles.evolutionNumber}>
                        #{String(evo.id).padStart(3, '0')}
                      </Text>
                    </Pressable>
                    {index < evolutions.length - 1 && (
                      <Text style={styles.evolutionArrow}>↓</Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  error: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  errorText: {
    fontSize: 18,
    color: colors.error,
    fontFamily: 'Rubik-Bold',
    marginBottom: spacing.sm,
  },
  errorSubtext: {
    fontSize: 14,
    color: colors.textLight,
    fontFamily: 'Rubik-Regular',
    textAlign: 'center',
  },
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  name: {
    fontSize: 32,
    fontFamily: 'Rubik-Bold',
    color: '#FFFFFF',
  },
  number: {
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  favoriteBtn: {
    padding: spacing.sm,
  },
  favoriteIcon: {
    fontSize: 32,
  },
  artwork: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: spacing.md,
  },
  types: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  typeTag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
  },
  typeText: {
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
    color: '#FFFFFF',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    color: colors.textLight,
  },
  tabTextActive: {
    color: colors.primary,
  },
  content: {
    padding: spacing.lg,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
    color: colors.text,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
    color: colors.textLight,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    color: colors.text,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  statName: {
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    color: colors.text,
    width: 120,
  },
  statValue: {
    fontSize: 14,
    fontFamily: 'Rubik-Bold',
    color: colors.text,
    width: 40,
    textAlign: 'right',
  },
  statBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  evolutionChain: {
    alignItems: 'center',
  },
  evolutionItem: {
    alignItems: 'center',
    padding: spacing.md,
  },
  evolutionImage: {
    width: 120,
    height: 120,
  },
  evolutionName: {
    fontSize: 18,
    fontFamily: 'Rubik-Bold',
    color: colors.text,
    marginTop: spacing.sm,
  },
  evolutionNumber: {
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    color: colors.textLight,
  },
  evolutionArrow: {
    fontSize: 32,
    color: colors.textLight,
    textAlign: 'center',
    marginVertical: spacing.sm,
  },
});
