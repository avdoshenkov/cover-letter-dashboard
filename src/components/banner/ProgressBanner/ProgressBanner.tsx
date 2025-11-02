import styles from './ProgressBanner.module.css';
import { Button, PlusIcon } from '@/components/common';

export type TProgressBannerProps = {
  current: number;
  goal: number;
  onCreate: () => void;
};

export const ProgressBanner = ({ current, goal, onCreate }: TProgressBannerProps) => {
  const clampedCurrent = Math.min(current, goal);

  return (
    <section className={styles.banner} aria-live="polite">
      <div className={styles.content}>
        <h2 className={styles.title}>Hit your goal</h2>
        <p className={styles.description}>
          Generate and send out couple more job applications today to get hired faster
        </p>
        <Button
          type="button"
          size="md"
          icon={<PlusIcon />}
          onClick={onCreate}
          className={styles.cta}
        >
          Create new
        </Button>
        <div className={styles.progress}>
          <div className={styles.steps} aria-hidden>
            {Array.from({ length: goal }).map((_, index) => (
              <div
                key={index}
                className={
                  index < clampedCurrent ? `${styles.step} ${styles.stepActive}` : styles.step
                }
              />
            ))}
          </div>
          <span className={styles.count}>{`${clampedCurrent} out of ${goal}`}</span>
        </div>
      </div>
    </section>
  );
};
