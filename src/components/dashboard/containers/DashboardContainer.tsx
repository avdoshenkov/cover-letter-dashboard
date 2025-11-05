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

export const DashboardContainer = () => {
  const router = useRouter();
  const letters = useCoverLetterStore(selectLetters);
  const current = useCoverLetterStore(selectLettersCount);
  const goal = useCoverLetterStore(selectGoalCount);
  const reached = useCoverLetterStore(selectIsGoalReached);
  const removeLetter = useCoverLetterStore((state) => state.removeLetter);

  const progress = useMemo(() => ({ current, goal, reached }), [current, goal, reached]);

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
      onDelete={handleDelete}
      onCreate={handleCreate}
      progress={progress}
    />
  );
};
