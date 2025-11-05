'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardView } from '../DashboardView';
import { selectLetters, useCoverLetterStore } from '@/store/coverLetters';

export const DashboardContainer = () => {
  const router = useRouter();
  const letters = useCoverLetterStore(selectLetters);
  const removeLetter = useCoverLetterStore((state) => state.removeLetter);

  const handleDelete = useCallback(
    (id: string) => {
      removeLetter(id);
    },
    [removeLetter]
  );

  const handleCreate = useCallback(() => {
    router.push('/new');
  }, [router]);

  return <DashboardView letters={letters} onDelete={handleDelete} onCreate={handleCreate} />;
};
