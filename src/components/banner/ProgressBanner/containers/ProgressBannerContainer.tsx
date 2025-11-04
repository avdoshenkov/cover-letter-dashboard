'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressBanner } from '../ProgressBanner';
import {
  selectLettersCount,
  selectGoalCount,
  selectIsGoalReached,
  useCoverLetterStore
} from '@/store/coverLetters';

export const ProgressBannerContainer = () => {
  const router = useRouter();
  const current = useCoverLetterStore(selectLettersCount);
  const goal = useCoverLetterStore(selectGoalCount);
  const reached = useCoverLetterStore(selectIsGoalReached);

  const handleCreate = useCallback(() => {
    router.push('/new');
  }, [router]);

  if (reached) {
    return null;
  }

  return <ProgressBanner current={current} goal={goal} onCreate={handleCreate} />;
};
