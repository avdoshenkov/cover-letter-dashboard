'use client';

import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import { TCoverLetter, TCoverLetterFormInput } from '@/types/coverLetter';

const STORAGE_KEY = 'cover-letter-dashboard';
const GOAL_COUNT = 5;

type TCoverLetterState = {
  letters: TCoverLetter[];
  goalCount: number;
  hasHydrated: boolean;
  addLetter: (input: TCoverLetterFormInput, body: string) => TCoverLetter;
  updateLetter: (id: string, input: TCoverLetterFormInput, body: string) => void;
  removeLetter: (id: string) => void;
  clear: () => void;
  setHasHydrated: (value: boolean) => void;
};

const createStorage = () =>
  createJSONStorage(() => {
    if (typeof window === 'undefined') {
      return {
        getItem: () => null,
        setItem: () => undefined,
        removeItem: () => undefined
      };
    }

    return window.localStorage;
  });

export const useCoverLetterStore = create<TCoverLetterState>()(
  devtools(
    persist(
      (set, get) => ({
        // Data (persisted)
        letters: [],
        goalCount: GOAL_COUNT,

        // Runtime state (not persisted)
        hasHydrated: false,

        setHasHydrated: (value: boolean) => set({ hasHydrated: value }),
        addLetter: (input, body) => {
          const newLetter: TCoverLetter = {
            id: nanoid(),
            company: input.company,
            jobTitle: input.jobTitle,
            skills: input.skills,
            additionalDetails: input.additionalDetails,
            body,
            createdAt: new Date().toISOString()
          };

          set({ letters: [newLetter, ...get().letters] });
          return newLetter;
        },
        updateLetter: (id, input, body) => {
          const letters = get().letters;
          const existingLetter = letters.find((letter) => letter.id === id);

          if (!existingLetter) {
            return;
          }

          const updatedLetter: TCoverLetter = {
            ...existingLetter,
            company: input.company,
            jobTitle: input.jobTitle,
            skills: input.skills,
            additionalDetails: input.additionalDetails,
            body
          };

          set({ letters: letters.map((letter) => (letter.id === id ? updatedLetter : letter)) });
        },
        removeLetter: (id) => {
          set({ letters: get().letters.filter((letter) => letter.id !== id) });
        },
        clear: () => set({ letters: [] })
      }),
      {
        name: STORAGE_KEY,
        storage: createStorage(),
        partialize: (state) => ({
          letters: state.letters,
          goalCount: state.goalCount
        }),
        onRehydrateStorage: () => {
          return (state, error) => {
            if (error) {
              console.error('Failed to rehydrate store:', error);
            } else {
              state?.setHasHydrated(true);
            }
          };
        }
      }
    )
  )
);

export const selectLetters = (state: TCoverLetterState) => state.letters;
export const selectGoalCount = (state: TCoverLetterState) => state.goalCount;

export const selectLettersCount = (state: TCoverLetterState) => state.letters.length;
export const selectIsGoalReached = (state: TCoverLetterState) =>
  state.letters.length >= state.goalCount;

export const selectLetterById = (id: string) => (state: TCoverLetterState) =>
  state.letters.find((letter) => letter.id === id);

export const selectHasHydrated = (state: TCoverLetterState) => state.hasHydrated;
