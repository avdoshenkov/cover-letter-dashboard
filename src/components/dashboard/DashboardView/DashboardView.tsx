'use client';

import { ProgressBanner } from '@/components/banner/ProgressBanner';
import { CoverLetterCard } from '../CoverLetterCard';
import styles from './DashboardView.module.css';
import { TCoverLetter } from '@/types/coverLetter';
import { Button, PlusIcon } from '@/components/common';

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
      <h1 className={styles.title}>Applications</h1>
      <div className={styles.actions}>
        <Button type="button" size="sm" icon={<PlusIcon />} onClick={onCreate}>
          Create new
        </Button>
      </div>
    </div>

    {letters.length === 0 ? null : (
      <div className={styles.grid}>
        {letters.map((letter) => (
          <CoverLetterCard key={letter.id} letter={letter} onCopy={onCopy} onDelete={onDelete} />
        ))}
      </div>
    )}

    {!progress.reached ? (
      <ProgressBanner current={progress.current} goal={progress.goal} onCreate={onCreate} />
    ) : null}
  </div>
);
