'use client';

import Link from 'next/link';
import styles from './Header.module.css';
import { HeaderProgress } from '../HeaderProgress';
import { HomeIcon } from '@/components/common';
import { selectProgress, useCoverLetterStore } from '@/store/coverLetters';

export const Header = () => {
  const progress = useCoverLetterStore(selectProgress);

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.logo}>CoverLetter</span>
        <span className={styles.tagline}>Craft compelling applications</span>
      </div>
      <HeaderProgress current={progress.current} goal={progress.goal} reached={progress.reached} />
      <Link className={styles.homeLink} href="/">
        <HomeIcon />
        <span>Dashboard</span>
      </Link>
    </header>
  );
};
