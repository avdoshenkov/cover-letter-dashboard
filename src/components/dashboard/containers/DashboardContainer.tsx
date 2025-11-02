'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardView } from '../DashboardView';
import {
  selectLetters,
  selectLettersCount,
  selectGoalCount,
  selectIsGoalReached,
  useCoverLetterStore
} from '@/store/coverLetters';

type TClipboard = typeof navigator | undefined;

export const DashboardContainer = () => {
  const router = useRouter();
  const letters = useCoverLetterStore(selectLetters);
  const current = useCoverLetterStore(selectLettersCount);
  const goal = useCoverLetterStore(selectGoalCount);
  const reached = useCoverLetterStore(selectIsGoalReached);
  const removeLetter = useCoverLetterStore((state) => state.removeLetter);

  const progress = useMemo(() => ({ current, goal, reached }), [current, goal, reached]);

  const handleCopy = useCallback(
    async (id: string) => {
      const target = letters.find((letter) => letter.id === id);
      if (!target) {
        return;
      }

      const clipboard: TClipboard = typeof navigator !== 'undefined' ? navigator : undefined;
      if (clipboard?.clipboard) {
        await clipboard.clipboard.writeText(target.body);
      }
    },
    [letters]
  );

  const handleDelete = useCallback(
    (id: string) => {
      removeLetter(id);
    },
    [removeLetter]
  );

  const handleCreate = useCallback(() => {
    router.push('/new');
  }, [router]);

  return (
    <DashboardView
      letters={letters}
      onCopy={handleCopy}
      onDelete={handleDelete}
      onCreate={handleCreate}
      progress={progress}
    />
  );
};
