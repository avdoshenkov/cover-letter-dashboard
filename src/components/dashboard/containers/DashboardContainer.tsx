'use client';

import { useCallback } from 'react';
import { DashboardView } from '../DashboardView';
import { selectLetters, useCoverLetterStore } from '@/store/coverLetters';

export const DashboardContainer = () => {
  const letters = useCoverLetterStore(selectLetters);
  const removeLetter = useCoverLetterStore((state) => state.removeLetter);

  const handleDelete = useCallback(
    (id: string) => {
      removeLetter(id);
    },
    [removeLetter]
  );

  return <DashboardView letters={letters} onDelete={handleDelete} />;
};
