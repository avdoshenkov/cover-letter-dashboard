'use client';

import { CoverLetterCard } from '../CoverLetterCard';
import styles from './DashboardView.module.css';
import { TCoverLetter } from '@/types/coverLetter';
import { CreateButton, PageHeader } from '@/components/common';

type TDashboardViewProps = {
  letters: TCoverLetter[];
  onDelete: (id: string) => void;
};

export const DashboardView = ({ letters, onDelete }: TDashboardViewProps) => (
  <div className={styles.wrapper}>
    <PageHeader title="Applications" actions={<CreateButton size="sm" />} />

    {letters.length === 0 ? null : (
      <div className={styles.grid}>
        {letters.map((letter) => (
          <CoverLetterCard key={letter.id} letter={letter} onDelete={onDelete} />
        ))}
      </div>
    )}
  </div>
);
