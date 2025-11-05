'use client';

import { ProgressBanner } from '../ProgressBanner';
import {
  selectLettersCount,
  selectGoalCount,
  selectIsGoalReached,
  useCoverLetterStore
} from '@/store/coverLetters';

export const ProgressBannerContainer = () => {
  const current = useCoverLetterStore(selectLettersCount);
  const goal = useCoverLetterStore(selectGoalCount);
  const reached = useCoverLetterStore(selectIsGoalReached);

  if (reached) {
    return null;
  }

  return <ProgressBanner current={current} goal={goal} />;
};
