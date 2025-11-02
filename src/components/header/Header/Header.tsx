'use client';

import Link from 'next/link';
import styles from './Header.module.css';
import { HeaderProgress } from '../HeaderProgress';
import { HomeIcon } from '@/components/common';
import {
  selectLettersCount,
  selectGoalCount,
  selectIsGoalReached,
  useCoverLetterStore
} from '@/store/coverLetters';

export const Header = () => {
  const current = useCoverLetterStore(selectLettersCount);
  const goal = useCoverLetterStore(selectGoalCount);
  const reached = useCoverLetterStore(selectIsGoalReached);

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.logo}>CoverLetter</span>
        <span className={styles.tagline}>Craft compelling applications</span>
      </div>
      <HeaderProgress current={current} goal={goal} reached={reached} />
      <Link className={styles.homeLink} href="/">
        <HomeIcon />
        <span>Dashboard</span>
      </Link>
    </header>
  );
};
