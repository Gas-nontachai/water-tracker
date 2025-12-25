import { useRef, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, TextInput, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useHydrationStore, type ActivityLevel, type Gender } from '@/hooks/use-hydration-store';

export default function OnboardingScreen() {
  const router = useRouter();
  const setProfile = useHydrationStore((s) => s.setProfile);
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);

  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState<Gender>('other');
  const [activity, setActivity] = useState<ActivityLevel>('medium');
  const [pageIndex, setPageIndex] = useState(0);

  const pages = [
    {
      title: 'Track water fast',
      body: 'Log your drinks in seconds and stay on top of your goal.',
    },
    {
      title: 'Build a daily habit',
      body: 'Gentle reminders and streaks help you stay consistent.',
    },
    {
      title: 'Personalize your goal',
      body: 'Tell us a bit about you so we can tailor your target.',
    },
  ];
  const lastPageIndex = pages.length - 1;

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
    router.replace('/(tabs)');
  };

  const goToPage = (index: number) => {
    scrollRef.current?.scrollTo({ x: width * index, animated: true });
    setPageIndex(index);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
        onMomentumScrollEnd={(event) => {
          const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setPageIndex(nextIndex);
        }}
      >
        {pages.map((page, index) => (
          <ThemedView
            key={page.title}
            style={[styles.page, { width }, index === lastPageIndex && styles.formPage]}
          >
            <ThemedText type="title">{page.title}</ThemedText>
            <ThemedText type="subtitle">{page.body}</ThemedText>

            {index === lastPageIndex && (
              <ThemedView style={styles.form}>
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
              </ThemedView>
            )}
          </ThemedView>
        ))}
      </ScrollView>

      <ThemedView style={styles.footer}>
        <ThemedView style={styles.dots}>
          {pages.map((page, index) => (
            <ThemedView
              key={page.title}
              style={[styles.dot, index === pageIndex && styles.dotActive]}
            />
          ))}
        </ThemedView>

        {pageIndex < lastPageIndex ? (
          <Pressable style={styles.primaryButton} onPress={() => goToPage(pageIndex + 1)}>
            <ThemedText type="defaultSemiBold">Next</ThemedText>
          </Pressable>
        ) : (
          <Pressable style={styles.primaryButton} onPress={onContinue}>
            <ThemedText type="defaultSemiBold">Continue</ThemedText>
          </Pressable>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  page: {
    padding: 24,
    gap: 16,
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  formPage: {
    justifyContent: 'flex-start',
    paddingTop: 32,
  },
  form: {
    gap: 20,
    marginTop: 12,
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
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#b0b0b0',
  },
  dotActive: {
    backgroundColor: '#4f8cff',
  },
  primaryButton: {
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
});
