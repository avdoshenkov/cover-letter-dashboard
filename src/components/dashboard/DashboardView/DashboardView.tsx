'use client';

import { CoverLetterCard } from '../CoverLetterCard';
import styles from './DashboardView.module.css';
import { TCoverLetter } from '@/types/coverLetter';
import { Button, PlusIcon, PageHeader } from '@/components/common';

type TDashboardViewProps = {
  letters: TCoverLetter[];
  onDelete: (id: string) => void;
  onCreate: () => void;
};

export const DashboardView = ({ letters, onDelete, onCreate }: TDashboardViewProps) => (
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
          <CoverLetterCard key={letter.id} letter={letter} onDelete={onDelete} />
        ))}
      </div>
    )}
  </div>
);
