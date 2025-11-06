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
  { label, helper, error, counter, textarea, className, ...rest }: TTextFieldProps,
  ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
) => (
  <label className={[styles.field, className].filter(Boolean).join(' ')}>
    <div className={styles.labelRow}>
      <span className={styles.label}>{label}</span>
      {helper ? <span className={styles.helper}>{helper}</span> : null}
    </div>
    {textarea ? (
      <textarea
        ref={ref as ForwardedRef<HTMLTextAreaElement>}
        className={`${styles.textarea} ${error ? styles.errorState : ''}`.trim()}
        rows={9}
        {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    ) : (
      <input
        ref={ref as ForwardedRef<HTMLInputElement>}
        className={`${styles.input} ${error ? styles.errorState : ''}`.trim()}
        {...(rest as InputHTMLAttributes<HTMLInputElement>)}
      />
    )}
    {counter ? (
      <span className={`${styles.counter} ${error ? styles.counterError : ''}`.trim()}>
        {counter}
      </span>
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
