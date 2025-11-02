'use client';

import styles from './CoverLetterCard.module.css';
import { type TCoverLetter } from '@/types/coverLetter';
import { Button, CopyIcon, TrashIcon } from '@/components/common';

type TCoverLetterCardProps = {
  letter: TCoverLetter;
  onCopy: (id: string) => void;
  onDelete: (id: string) => void;
};

export const CoverLetterCard = ({ letter, onCopy, onDelete }: TCoverLetterCardProps) => {
  const formattedDate = new Date(letter.createdAt).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>{letter.jobTitle}</h3>
          <p className={styles.meta}>
            {letter.company} · {formattedDate}
          </p>
        </div>
        <div className={styles.meta}>Skills: {letter.skills}</div>
      </div>
      <pre className={styles.body}>{letter.body}</pre>
      <div className={styles.actions}>
        <Button
          type="button"
          variant="outline"
          size="sm"
          iconPlacement="end"
          icon={<CopyIcon />}
          onClick={() => onCopy(letter.id)}
        >
          Copy text
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          icon={<TrashIcon />}
          onClick={() => onDelete(letter.id)}
        >
          Delete
        </Button>
      </div>
    </article>
  );
};
