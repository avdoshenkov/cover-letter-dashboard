'use client';

import Image from 'next/image';
import styles from './Header.module.css';
import { HeaderProgress } from '../HeaderProgress';
import { HomeIcon, Button } from '@/components/common';
import {
  selectLettersCount,
  selectGoalCount,
  selectIsGoalReached,
  useCoverLetterStore
} from '@/store/coverLetters';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const current = useCoverLetterStore(selectLettersCount);
  const goal = useCoverLetterStore(selectGoalCount);
  const reached = useCoverLetterStore(selectIsGoalReached);
  const router = useRouter();

  const handleHome = () => {
    // might be link but for now use button to have a consistent style
    router.push('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Image src="/img/logo.svg" loading="eager" alt="Alt + Shift Logo" width={179} height={48} />
      </div>
      <HeaderProgress className={styles.progress} current={current} goal={goal} reached={reached} />
      <Button variant="outline" icon={<HomeIcon />} onClick={handleHome} />
    </header>
  );
};
