import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { queryClient } from '../services/queryClient';
import { initDatabase } from '../services/favorites';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Rubik-Regular': require('../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Medium': require('../../assets/fonts/Rubik-Medium.ttf'),
    'Rubik-Bold': require('../../assets/fonts/Rubik-Bold.ttf'),
  });
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    initDatabase()
      .then(() => setDbReady(true))
      .catch((error) => {
        console.error('Failed to initialize database:', error);
        setDbReady(true); // Continue anyway to avoid blocking the app
      });
  }, []);

  useEffect(() => {
    if ((fontsLoaded || fontError) && dbReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, dbReady]);

  if ((!fontsLoaded && !fontError) || !dbReady) {
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
        <Stack.Screen name="favorites" options={{ title: 'Favorites' }} />
        <Stack.Screen name="compare" options={{ title: 'Compare' }} />
      </Stack>
    </QueryClientProvider>
  );
}
