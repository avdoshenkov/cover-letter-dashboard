'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';
import { SpinnerIcon } from '../icons';

type TVariant = 'primary' | 'solid' | 'outline' | 'ghost';
type TSize = 'sm' | 'md' | 'lg';

const variantClassMap: Record<TVariant, string> = {
  primary: styles.variantPrimary,
  solid: styles.variantSolid,
  outline: styles.variantOutline,
  ghost: styles.variantGhost
};

const sizeClassMap: Record<TSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg
};

const composeClassName = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(' ');

export type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: TVariant;
  size?: TSize;
  icon?: ReactNode;
  iconPlacement?: 'start' | 'end';
  fullWidth?: boolean;
  loading?: boolean;
  loadingText?: ReactNode;
};

export const Button = ({
  children,
  icon,
  iconPlacement = 'start',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  loadingText = '',
  disabled,
  type = 'button',
  className,
  ...props
}: TButtonProps) => {
  const isDisabled = disabled || loading;
  const isIconOnly = !children && !loading && Boolean(icon);

  const classNames = composeClassName(
    styles.button,
    variantClassMap[variant],
    sizeClassMap[size],
    fullWidth ? styles.fullWidth : '',
    isIconOnly ? styles.iconOnly : '',
    loading ? styles.loading : '',
    className
  );

  const renderIcon = (node: ReactNode, additionalClassName?: string) => (
    <span className={composeClassName(styles.icon, additionalClassName)} aria-hidden>
      {node}
    </span>
  );

  const spinnerIcon = renderIcon(<SpinnerIcon />, styles.spinner);

  const startIcon = loading
    ? spinnerIcon
    : icon && iconPlacement === 'start'
      ? renderIcon(icon)
      : null;

  const endIcon = !loading && icon && iconPlacement === 'end' ? renderIcon(icon) : null;

  const labelContent = loading ? (loadingText !== undefined ? loadingText : children) : children;

  return (
    <button
      type={type}
      className={classNames}
      disabled={isDisabled}
      {...props}
      aria-busy={loading || undefined}
    >
      {startIcon}
      {labelContent ? <span className={styles.label}>{labelContent}</span> : null}
      {endIcon}
    </button>
  );
};
