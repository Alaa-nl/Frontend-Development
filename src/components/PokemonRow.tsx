// Reusable Pokemon list row component

import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { colors, spacing } from '../constants/theme';
import { getPokemonSpriteUrl } from '../services/pokemon';

export const POKEMON_ROW_HEIGHT = 80;

interface PokemonRowProps {
  id: number;
  name: string;
}

export function PokemonRow({ id, name }: PokemonRowProps) {
  const formattedNumber = `#${id.toString().padStart(4, '0')}`;
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <Link href={`/pokemon/${id}`} asChild>
      <Pressable
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      >
        <Image
          source={{ uri: getPokemonSpriteUrl(id) }}
          style={styles.image}
          contentFit="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.number}>{formattedNumber}</Text>
          <Text style={styles.name}>{formattedName}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: POKEMON_ROW_HEIGHT,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pressed: {
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  number: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: 'Rubik-Regular',
    marginBottom: spacing.xs,
  },
  name: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'Rubik-Medium',
  },
});
