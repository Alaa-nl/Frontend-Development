import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { queryClient } from '../services/queryClient';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Rubik-Regular': require('../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Medium': require('../../assets/fonts/Rubik-Medium.ttf'),
    'Rubik-Bold': require('../../assets/fonts/Rubik-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#DC0A2D',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'Rubik-Bold',
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Pokédex' }} />
        <Stack.Screen name="pokemon/[id]" options={{ title: 'Pokémon' }} />
      </Stack>
    </QueryClientProvider>
  );
}
