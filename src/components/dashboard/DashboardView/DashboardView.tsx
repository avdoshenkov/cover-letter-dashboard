'use client';

import { ProgressBanner } from '@/components/banner/ProgressBanner';
import { CoverLetterCard } from '../CoverLetterCard';
import styles from './DashboardView.module.css';
import { TCoverLetter } from '@/types/coverLetter';
import { Button, PlusIcon, PageHeader } from '@/components/common';

type TDashboardViewProps = {
  letters: TCoverLetter[];
  onCopy: (id: string) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
  onCardClick: (id: string) => void;
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
  onCardClick,
  progress
}: TDashboardViewProps) => (
  <div className={styles.wrapper}>
    <PageHeader
      title="Applications"
      actions={
        <Button type="button" size="sm" icon={<PlusIcon />} onClick={onCreate}>
          Create new
        </Button>
      }
    />

    {letters.length === 0 ? null : (
      <div className={styles.grid}>
        {letters.map((letter) => (
          <CoverLetterCard
            key={letter.id}
            letter={letter}
            onCopy={onCopy}
            onDelete={onDelete}
            onClick={() => onCardClick(letter.id)}
          />
        ))}
      </div>
    )}

    {!progress.reached ? (
      <ProgressBanner current={progress.current} goal={progress.goal} onCreate={onCreate} />
    ) : null}
  </div>
);
