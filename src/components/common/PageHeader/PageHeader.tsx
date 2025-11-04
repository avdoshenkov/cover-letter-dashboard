import { ReactNode } from 'react';
import styles from './PageHeader.module.css';

export type TPageHeaderProps = {
  title: string;
  actions?: ReactNode;
  isPlaceholder?: boolean;
};

export const PageHeader = ({ title, actions, isPlaceholder }: TPageHeaderProps) => {
  const titleClassName = isPlaceholder ? `${styles.title} ${styles.placeholder}` : styles.title;

  return (
    <div className={styles.headerRow}>
      <h1 className={titleClassName}>{title}</h1>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
};
