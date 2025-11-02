'use client';

import Link from 'next/link';
import { ProgressBanner } from '@/components/banner/ProgressBanner';
import { CoverLetterCard } from '../CoverLetterCard';
import styles from './DashboardView.module.css';
import { TCoverLetter } from '@/types/coverLetter';

type TDashboardViewProps = {
  letters: TCoverLetter[];
  onCopy: (id: string) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
  progress: {
    current: number;
    goal: number;
    reached: boolean;
  };
};

export const DashboardView = ({
  letters,
  onCopy,
  onDelete,
  onCreate,
  progress
}: TDashboardViewProps) => (
  <div className={styles.wrapper}>
    <div className={styles.headerRow}>
      <h1 className={styles.title}>Your applications</h1>
      <div className={styles.actions}>
        <Link href="/new" className={styles.linkButton}>
          Create new letter
        </Link>
      </div>
    </div>

    {!progress.reached ? (
      <ProgressBanner current={progress.current} goal={progress.goal} onCreate={onCreate} />
    ) : null}

    {letters.length === 0 ? (
      <section className={styles.empty}>
        <h2 className={styles.emptyTitle}>No letters yet</h2>
        <p>Start crafting personalised cover letters and track your progress right here.</p>
        <Link href="/new" className={styles.linkButton}>
          Generate your first letter
        </Link>
      </section>
    ) : (
      <div className={styles.grid}>
        {letters.map((letter) => (
          <CoverLetterCard key={letter.id} letter={letter} onCopy={onCopy} onDelete={onDelete} />
        ))}
      </div>
    )}
  </div>
);
