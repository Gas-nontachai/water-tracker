import { useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useHydrationStore, type ActivityLevel, type Gender } from '@/hooks/use-hydration-store';

export default function OnboardingScreen() {
  const setProfile = useHydrationStore((s) => s.setProfile);

  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState<Gender>('other');
  const [activity, setActivity] = useState<ActivityLevel>('medium');

  const onContinue = () => {
    const w = Number(weight);
    const trimmedName = name.trim();

    if (!trimmedName) {
      Alert.alert('Missing name', 'Please enter your name.');
      return;
    }

    if (!w || w < 30 || w > 300) {
      Alert.alert('Invalid weight', 'Please enter a valid weight (30 - 300 kg).');
      return;
    }

    setProfile({
      name: trimmedName,
      weight: w,
      gender,
      activity,
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Welcome 👋</ThemedText>
      <ThemedText type="subtitle">Let’s set up your profile</ThemedText>

      <ThemedView style={styles.section}>
        <ThemedText>Name</ThemedText>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="e.g. Alex"
          style={styles.input}
        />
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText>Weight (kg)</ThemedText>
        <TextInput
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholder="e.g. 70"
          style={styles.input}
        />
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText>Gender</ThemedText>

        <ThemedView style={styles.row}>
          {(['male', 'female', 'other'] as Gender[]).map((g) => (
            <Pressable
              key={g}
              onPress={() => setGender(g)}
              style={[styles.option, gender === g && styles.optionActive]}
            >
              <ThemedText
                type="defaultSemiBold"
                style={gender === g && styles.optionActiveText}
              >
                {g}
              </ThemedText>
            </Pressable>
          ))}
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText>Activity level</ThemedText>

        <ThemedView style={styles.row}>
          {(['low', 'medium', 'high'] as ActivityLevel[]).map((level) => (
            <Pressable
              key={level}
              onPress={() => setActivity(level)}
              style={[styles.option, activity === level && styles.optionActive]}
            >
              <ThemedText
                type="defaultSemiBold"
                style={activity === level && styles.optionActiveText}
              >
                {level}
              </ThemedText>
            </Pressable>
          ))}
        </ThemedView>
      </ThemedView>

      <Pressable style={styles.primaryButton} onPress={onContinue}>
        <ThemedText type="defaultSemiBold">Continue</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 20,
    justifyContent: 'center',
  },
  section: {
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  option: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  optionActive: {
    backgroundColor: '#4f8cff20',
    borderColor: '#4f8cff',
  },
  optionActiveText: {
    color: '#4f8cff',
  },
  primaryButton: {
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
});
