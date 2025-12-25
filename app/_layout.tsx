import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useHydrationStore } from '@/hooks/use-hydration-store';
import { useThemeColor } from '@/hooks/use-theme-color';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { profile } = useHydrationStore();
  const backgroundColor = useThemeColor({}, 'background');
  
  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]} edges={['top']}>
          <Stack screenOptions={{ headerShown: false }}>
            {!profile ? (
              <Stack.Screen name="(onboarding)" />
            ) : (
              <Stack.Screen name="(tabs)" />
            )}
          </Stack>

          <StatusBar style="auto" />
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
