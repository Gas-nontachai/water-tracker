import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ActivityLevel = 'low' | 'medium' | 'high';
export type Gender = 'male' | 'female' | 'other';

export type Profile = {
  name: string;
  weight: number;
  gender: Gender;
  activity: ActivityLevel;
};

type HydrationPersistedState = {
  hasOnboarded: boolean;
  profile?: Profile;
  dailyGoal: number;
  todayIntake: number;
  history: Record<string, number>;
};

type HydrationState = HydrationPersistedState & {
  hasHydrated: boolean;

  setProfile: (profile: Profile) => void;
  addWater: (ml: number) => void;
  resetToday: () => void;
  restoreState: (state: Partial<HydrationPersistedState>) => void;
};

const calculateDailyGoal = (weight: number, activity: ActivityLevel) => {
  const base = weight * 35;
  if (activity === 'low') return base;
  if (activity === 'medium') return base + 500;
  return base + 1000;
};

const todayKey = () => new Date().toISOString().slice(0, 10);

export const useHydrationStore = create<HydrationState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,

      hasOnboarded: false,
      profile: undefined,
      dailyGoal: 0,
      todayIntake: 0,
      history: {},

      setProfile: (profile) => {
        const goal = calculateDailyGoal(profile.weight, profile.activity);
        set({
          profile,
          dailyGoal: goal,
          hasOnboarded: true,
        });
      },

      addWater: (ml) => {
        const key = todayKey();
        const { todayIntake, history } = get();
        const newIntake = Math.max(0, todayIntake + ml);

        set({
          todayIntake: newIntake,
          history: {
            ...history,
            [key]: newIntake,
          },
        });
      },

      resetToday: () => {
        set({ todayIntake: 0 });
      },

      restoreState: (state) => {
        set(state);
      },
    }),
    {
      name: 'hydration-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        hasOnboarded: state.hasOnboarded,
        profile: state.profile,
        dailyGoal: state.dailyGoal,
        todayIntake: state.todayIntake,
        history: state.history,
      }),
      onRehydrateStorage: () => () => {
        useHydrationStore.setState({ hasHydrated: true });
      },
    }
  )
);
