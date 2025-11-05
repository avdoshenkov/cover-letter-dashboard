'use client';

import Link from 'next/link';
import styles from './CoverLetterCard.module.css';
import { TCoverLetter } from '@/types/coverLetter';
import { Button, CopyButton, TrashIcon } from '@/components/common';

type TCoverLetterCardProps = {
  letter: TCoverLetter;
  onDelete: (id: string) => void;
};

export const CoverLetterCard = ({ letter, onDelete }: TCoverLetterCardProps) => {
  return (
    <article className={styles.card}>
      <Link href={`/edit/${letter.id}`} className={styles.bodyLink}>
        <pre className={styles.body}>{letter.body}</pre>
      </Link>
      <div className={styles.actions}>
        <Button
          className={styles.deleteButton}
          type="button"
          variant="ghost"
          size="sm"
          icon={<TrashIcon />}
          onClick={() => onDelete(letter.id)}
        >
          Delete
        </Button>
        <CopyButton textToCopy={letter.body} />
      </div>
    </article>
  );
};
