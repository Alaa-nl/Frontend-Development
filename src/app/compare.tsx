import { Image } from 'expo-image';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, spacing } from '../constants/theme';
import { usePokemon } from '../hooks/usePokemon';
import { usePokemonList } from '../hooks/usePokemonList';
import { compareStats } from '../services/compare';
import { filterPokemon } from '../services/filterPokemon';
import { getPokemonSpriteUrl } from '../services/pokemon';

type Side = 'left' | 'right';

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

function capitalize(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function PokemonSlot({ id }: { id: number }) {
  const { data, isLoading, error, refetch } = usePokemon(id);

  if (isLoading) {
    return <ActivityIndicator color={colors.primary} />;
  }
  if (error || !data) {
    return (
      <Pressable onPress={() => refetch()}>
        <Text style={styles.errorText}>Failed to load. Tap to retry</Text>
      </Pressable>
    );
  }
  return (
    <View style={styles.slotContent}>
      <Image source={{ uri: getPokemonSpriteUrl(id) }} style={styles.slotImage} contentFit='contain' />
      <Text style={styles.slotName}>{capitalize(data.name)}</Text>
    </View>
  );
}

function StatsTable({ leftId, rightId }: { leftId: number; rightId: number }) {
  const left = usePokemon(leftId);
  const right = usePokemon(rightId);

  if (left.isLoading || right.isLoading) {
    return <ActivityIndicator color={colors.primary} style={styles.tableStatus} />;
  }
  if (!left.data || !right.data) {
    return <Text style={[styles.errorText, styles.tableStatus]}>Could not load the stats</Text>;
  }

  const rows = compareStats(left.data.stats, right.data.stats);

  return (
    <View style={styles.table}>
      {rows.map((row) => (
        <View key={row.name} style={styles.row}>
          <Text style={[styles.value, row.winner === 'left' && styles.winner, row.winner === 'tie' && styles.tie]}>
            {row.left}
          </Text>
          <Text style={styles.statName}>{STAT_LABELS[row.name] ?? row.name}</Text>
          <Text style={[styles.value, row.winner === 'right' && styles.winner, row.winner === 'tie' && styles.tie]}>
            {row.right}
          </Text>
        </View>
      ))}
      <Text style={styles.legend}>Higher value in red. Grey means a tie.</Text>
    </View>
  );
}

export default function CompareScreen() {
  const [leftId, setLeftId] = useState<number | null>(null);
  const [rightId, setRightId] = useState<number | null>(null);
  const [picking, setPicking] = useState<Side | null>(null);
  const [query, setQuery] = useState('');
  const { data: list, isLoading, error, refetch } = usePokemonList();

  const results = useMemo(() => (list ? filterPokemon(list, query) : []), [list, query]);

  const pick = (id: number) => {
    if (picking === 'left') setLeftId(id);
    if (picking === 'right') setRightId(id);
    setPicking(null);
    setQuery('');
  };

  const renderSlot = (side: Side, id: number | null) => (
    <Pressable
      style={[styles.slot, picking === side && styles.slotActive]}
      onPress={() => setPicking(side)}
    >
      {id ? <PokemonSlot id={id} /> : <Text style={styles.slotEmpty}>Pick a Pokémon</Text>}
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.slots}>
        {renderSlot('left', leftId)}
        {renderSlot('right', rightId)}
      </View>

      {picking ? (
        <View style={styles.picker}>
          <TextInput
            style={styles.searchInput}
            placeholder='Search Pokémon'
            placeholderTextColor={colors.textLight}
            value={query}
            onChangeText={setQuery}
            autoCapitalize='none'
            autoCorrect={false}
            autoFocus
          />
          {isLoading && <ActivityIndicator color={colors.primary} />}
          {error && (
            <Pressable onPress={() => refetch()}>
              <Text style={styles.errorText}>Failed to load the list. Tap to retry</Text>
            </Pressable>
          )}
          {list && results.length === 0 && <Text style={styles.slotEmpty}>No Pokémon found</Text>}
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            keyboardShouldPersistTaps='handled'
            renderItem={({ item }) => (
              <Pressable style={styles.result} onPress={() => pick(item.id)}>
                <Text style={styles.resultText}>
                  #{item.id.toString().padStart(4, '0')} {capitalize(item.name)}
                </Text>
              </Pressable>
            )}
          />
        </View>
      ) : leftId && rightId ? (
        <StatsTable leftId={leftId} rightId={rightId} />
      ) : (
        <Text style={[styles.slotEmpty, styles.tableStatus]}>Tap a card to pick two Pokémon</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.md },
  slots: { flexDirection: 'row', gap: spacing.md },
  slot: {
    flex: 1,
    height: 150,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
  },
  slotActive: { borderColor: colors.primary, borderWidth: 2 },
  slotContent: { alignItems: 'center' },
  slotImage: { width: 90, height: 90 },
  slotName: { fontFamily: 'Rubik-Medium', fontSize: 16, color: colors.text },
  slotEmpty: { fontFamily: 'Rubik-Regular', fontSize: 14, color: colors.textLight, textAlign: 'center' },
  picker: { flex: 1, marginTop: spacing.md },
  searchInput: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  result: { paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  resultText: { fontFamily: 'Rubik-Regular', fontSize: 16, color: colors.text },
  table: { marginTop: spacing.lg },
  tableStatus: { marginTop: spacing.lg },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statName: { flex: 1, textAlign: 'center', fontFamily: 'Rubik-Medium', fontSize: 14, color: colors.textLight },
  value: { width: 60, textAlign: 'center', fontFamily: 'Rubik-Regular', fontSize: 18, color: colors.text },
  winner: { fontFamily: 'Rubik-Bold', color: colors.primary },
  tie: { color: colors.textLight },
  legend: { marginTop: spacing.md, textAlign: 'center', fontFamily: 'Rubik-Regular', fontSize: 12, color: colors.textLight },
  errorText: { fontFamily: 'Rubik-Regular', fontSize: 14, color: colors.error, textAlign: 'center' },
});
