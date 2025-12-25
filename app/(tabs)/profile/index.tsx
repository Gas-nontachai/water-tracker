import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { PrimaryButton } from '@/components/primary-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useHydrationStore } from '@/hooks/use-hydration-store';

export default function ProfileScreen() {
  const profile = useHydrationStore((s) => s.profile);
  const router = useRouter();

  if (!profile) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>No profile data</ThemedText>
        <PrimaryButton title="Create profile" onPress={() => router.push('/profile/edit')} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Profile</ThemedText>
      <ThemedText type="subtitle">Your personal details</ThemedText>

      <ThemedView style={styles.card}>
        <ThemedView style={styles.detailRow}>
          <ThemedText type="defaultSemiBold">Name</ThemedText>
          <ThemedText>{profile.name || '—'}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.detailRow}>
          <ThemedText type="defaultSemiBold">Weight</ThemedText>
          <ThemedText>{profile.weight} kg</ThemedText>
        </ThemedView>
        <ThemedView style={styles.detailRow}>
          <ThemedText type="defaultSemiBold">Gender</ThemedText>
          <ThemedText>{profile.gender}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.detailRow}>
          <ThemedText type="defaultSemiBold">Activity</ThemedText>
          <ThemedText>{profile.activity}</ThemedText>
        </ThemedView>
      </ThemedView>

      <PrimaryButton title="Edit profile" onPress={() => router.push('/profile/edit')} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 20,
  },
  card: {
    gap: 16,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  detailRow: {
    gap: 6,
  },
});
