import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useHydrationStore } from '@/hooks/use-hydration-store';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { profile } = useHydrationStore();
  
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {!profile ? (
          <Stack.Screen name="(onboarding)" />
        ) : (
          <Stack.Screen name="(tabs)" />
        )}
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
