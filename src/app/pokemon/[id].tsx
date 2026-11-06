// Placeholder Pokemon detail screen

import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../../constants/theme';

export default function PokemonDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pokémon #{id}</Text>
      <Text style={styles.placeholder}>Detail screen coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  text: {
    fontSize: 24,
    color: colors.text,
    fontFamily: 'Rubik-Bold',
    marginBottom: spacing.md,
  },
  placeholder: {
    fontSize: 16,
    color: colors.textLight,
    fontFamily: 'Rubik-Regular',
  },
});
