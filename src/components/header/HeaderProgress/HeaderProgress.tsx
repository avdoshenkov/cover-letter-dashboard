'use client';

import { clsx } from 'clsx';
import styles from './HeaderProgress.module.css';
import { CheckIcon } from '@/components/common';

export type THeaderProgressProps = {
  current: number;
  goal: number;
  reached: boolean;
  className?: string;
};

export const HeaderProgress = ({ current, goal, reached, className }: THeaderProgressProps) => {
  const clampedCurrent = Math.min(current, goal);
  const label = `${clampedCurrent}/${goal} applications generated`;

  return (
    <div className={clsx(styles.progress, className)}>
      <span className={styles.label}>{label}</span>
      {reached ? (
        <CheckIcon />
      ) : (
        <div className={styles.dots} aria-hidden>
          {Array.from({ length: goal }).map((_, index) => (
            <div key={index} className={clsx(styles.dot, index < current && styles.dotActive)} />
          ))}
        </div>
      )}
    </div>
  );
};
