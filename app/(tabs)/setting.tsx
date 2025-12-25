import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
type Unit = 'ml' | 'oz';

export default function SettingScreen() {

  const [unit, setUnit] = useState<Unit>('ml');

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Settings</ThemedText>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Preferences</ThemedText>
          <ThemedView style={styles.segmented}>
            {(['ml', 'oz'] as Unit[]).map((nextUnit) => (
              <Pressable
                key={nextUnit}
                onPress={() => setUnit(nextUnit)}
                style={[styles.segment, unit === nextUnit && styles.segmentActive]}
              >
                <ThemedText
                  type="defaultSemiBold"
                  style={unit === nextUnit && styles.segmentActiveText}
                >
                  {nextUnit.toUpperCase()}
                </ThemedText>
              </Pressable>
            ))}
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    gap: 24,
  },
  header: {
    gap: 6,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  section: {
    gap: 12,
  },
  segmented: {
    flexDirection: 'row',
    gap: 8,
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  segmentActive: {
    backgroundColor: '#4f8cff20',
    borderColor: '#4f8cff',
  },
  segmentActiveText: {
    color: '#4f8cff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    gap: 16,
  },
  rowText: {
    flex: 1,
    gap: 4,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    gap: 16,
  },
});
