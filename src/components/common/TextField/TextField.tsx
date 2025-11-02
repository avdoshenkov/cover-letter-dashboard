'use client';

import { forwardRef, TextareaHTMLAttributes, InputHTMLAttributes, ForwardedRef } from 'react';
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
  { label, helper, error, counter, textarea, ...rest }: TTextFieldProps,
  ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
) => (
  <label className={styles.field}>
    <div className={styles.labelRow}>
      <span className={styles.label}>{label}</span>
      {counter ? (
        <span className={styles.counter}>{counter}</span>
      ) : helper ? (
        <span className={styles.helper}>{helper}</span>
      ) : null}
    </div>
    {textarea ? (
      <textarea
        ref={ref as ForwardedRef<HTMLTextAreaElement>}
        className={`${styles.textarea} ${error ? styles.errorState : ''}`.trim()}
        {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    ) : (
      <input
        ref={ref as ForwardedRef<HTMLInputElement>}
        className={`${styles.input} ${error ? styles.errorState : ''}`.trim()}
        {...(rest as InputHTMLAttributes<HTMLInputElement>)}
      />
    )}
    {error ? <span className={styles.errorMessage}>{error}</span> : null}
  </label>
);

TextFieldComponent.displayName = 'TextField';

export const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TTextFieldProps>(
  TextFieldComponent
);
