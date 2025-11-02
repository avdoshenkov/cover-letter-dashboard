'use client';

import Link from 'next/link';
import Image from 'next/image';
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
        <Image src="/img/logo.svg" loading="eager" alt="Alt + Shift Logo" width={179} height={48} />
      </div>
      <HeaderProgress current={3} goal={goal} reached={reached} />
      <Link className={styles.homeLink} href="/">
        <HomeIcon />
      </Link>
    </header>
  );
};
