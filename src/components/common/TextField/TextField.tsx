'use client';

import { forwardRef, TextareaHTMLAttributes, InputHTMLAttributes, ForwardedRef } from 'react';
import { clsx } from 'clsx';
import styles from './TextField.module.css';

type TBaseProps = {
  label: string;
  helper?: string;
  error?: string;
  counter?: string;
};

type TInputFieldProps = TBaseProps & {
  textarea?: false;
} & InputHTMLAttributes<HTMLInputElement>;

type TTextAreaFieldProps = TBaseProps & {
  textarea: true;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

type TTextFieldProps = TInputFieldProps | TTextAreaFieldProps;

const TextFieldComponent = (
  { label, helper, error, counter, textarea, className, ...rest }: TTextFieldProps,
  ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
) => (
  <label className={clsx(styles.field, className)}>
    <div className={styles.labelRow}>
      <span className={styles.label}>{label}</span>
      {helper ? <span className={styles.helper}>{helper}</span> : null}
    </div>
    {textarea ? (
      <textarea
        ref={ref as ForwardedRef<HTMLTextAreaElement>}
        className={clsx(styles.textarea, error && styles.errorState)}
        rows={9}
        {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    ) : (
      <input
        ref={ref as ForwardedRef<HTMLInputElement>}
        className={clsx(styles.input, error && styles.errorState)}
        {...(rest as InputHTMLAttributes<HTMLInputElement>)}
      />
    )}
    {counter ? (
      <span className={clsx(styles.counter, error && styles.counterError)}>{counter}</span>
    ) : null}
    {error ? (
      <span className={styles.errorMessage} role="alert">
        {error}
      </span>
    ) : null}
  </label>
);

TextFieldComponent.displayName = 'TextField';

export const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TTextFieldProps>(
  TextFieldComponent
);
