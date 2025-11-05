'use client';

import { FormEventHandler, ReactNode } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { CopyButton, LoadingCircle, PageHeader, TextField } from '@/components/common';
import styles from './GeneratorFormView.module.css';
import { TCoverLetterFormInput } from '@/types/coverLetter';

export type TGeneratorFormViewProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<TCoverLetterFormInput>;
  errors: Partial<Record<keyof TCoverLetterFormInput, string>>;
  isSubmitting: boolean;
  generatedLetter?: string;
  characterCount: number;
  maxCharacters: number;
  formTitle: string;
  isPlaceholderTitle?: boolean;
  submitButton: ReactNode;
};

export const GeneratorFormView = ({
  onSubmit,
  register,
  errors,
  isSubmitting,
  generatedLetter,
  characterCount,
  maxCharacters,
  formTitle,
  isPlaceholderTitle = false,
  submitButton
}: TGeneratorFormViewProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.formContainer}>
        <section className={styles.formCard}>
          <PageHeader title={formTitle} isPlaceholder={isPlaceholderTitle} />

          <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.formFields}>
              <TextField
                label="Job title"
                placeholder="Product Designer"
                error={errors.jobTitle}
                {...register('jobTitle')}
                required
              />
              <TextField
                label="Company"
                placeholder="Company name"
                error={errors.company}
                {...register('company')}
                required
              />
              <TextField
                className={styles.fullWidthField}
                label="I am good at..."
                placeholder="UX Research, Interface Design, Prototyping"
                error={errors.skills}
                {...register('skills')}
                required
              />
              <TextField
                className={styles.fullWidthField}
                label="Additional details"
                placeholder="Share achievements or context to personalise the letter"
                error={errors.additionalDetails}
                {...register('additionalDetails')}
                textarea
                counter={`${characterCount}/${maxCharacters}`}
                maxLength={maxCharacters}
              />
            </div>
            <div className={styles.actions}>{submitButton}</div>
          </form>
        </section>
        <section className={styles.previewCard}>
          {isSubmitting ? (
            <LoadingCircle />
          ) : (
            <>
              {generatedLetter ? (
                <pre className={styles.previewBody}>{generatedLetter}</pre>
              ) : (
                <div className={styles.loadingState}>
                  Your personalized job application will appear here...
                </div>
              )}
              <div className={styles.copyButton}>
                <CopyButton textToCopy={generatedLetter ?? ''} disabled={!generatedLetter} />
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};
