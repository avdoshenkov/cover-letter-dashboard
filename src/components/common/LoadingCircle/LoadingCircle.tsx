import styles from './LoadingCircle.module.css';

export const LoadingCircle = () => {
  return (
    <div className={styles.container}>
      <div className={styles.circle} />
    </div>
  );
};
