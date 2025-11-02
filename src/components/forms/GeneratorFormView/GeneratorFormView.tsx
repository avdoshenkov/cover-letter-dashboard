'use client';

import { FormEventHandler } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { ArrowUpRightIcon, Button, CopyIcon, RotateCcwIcon, TextField } from '@/components/common';
import { ProgressBanner } from '@/components/banner/ProgressBanner';
import styles from './GeneratorFormView.module.css';
import { TCoverLetterFormInput } from '@/types/coverLetter';

export type TGeneratorFormViewProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<TCoverLetterFormInput>;
  errors: Partial<Record<keyof TCoverLetterFormInput, string>>;
  isSubmitting: boolean;
  generatedLetter?: string;
  onCopyResult: () => void;
  onReset: () => void;
  characterCount: number;
  maxCharacters: number;
  onCreate: () => void;
  progress: {
    current: number;
    goal: number;
    reached: boolean;
  };
};

export const GeneratorFormView = ({
  onSubmit,
  register,
  errors,
  isSubmitting,
  generatedLetter,
  onCopyResult,
  onReset,
  characterCount,
  maxCharacters,
  onCreate,
  progress
}: TGeneratorFormViewProps) => (
  <div className={styles.wrapper}>
    <section className={styles.formCard}>
      <h1 className={styles.title}>Generate a new letter</h1>
      {!progress.reached ? (
        <ProgressBanner current={progress.current} goal={progress.goal} onCreate={onCreate} />
      ) : null}
      <form onSubmit={onSubmit} className={styles.formFields}>
        <TextField
          label="Company"
          placeholder="Company name"
          error={errors.company}
          {...register('company')}
          required
        />
        <TextField
          label="Job title"
          placeholder="Product Designer"
          error={errors.jobTitle}
          {...register('jobTitle')}
          required
        />
        <TextField
          label="Key skills"
          placeholder="UX Research, Interface Design, Prototyping"
          error={errors.skills}
          {...register('skills')}
          required
        />
        <TextField
          label="Additional details"
          placeholder="Share achievements or context to personalise the letter"
          error={errors.additionalDetails}
          {...register('additionalDetails')}
          textarea
          counter={`${characterCount}/${maxCharacters}`}
          maxLength={maxCharacters}
        />
        <div className={styles.actions}>
          <Button
            type="submit"
            loading={isSubmitting}
            variant="solid"
            size="lg"
            fullWidth
            iconPlacement="end"
            icon={<ArrowUpRightIcon />}
            loadingText="Generating…"
          >
            Generate letter
          </Button>
          <Button
            type="button"
            onClick={onReset}
            disabled={isSubmitting}
            variant="ghost"
            size="sm"
            icon={<RotateCcwIcon />}
          >
            Reset
          </Button>
        </div>
      </form>
    </section>
    <section className={styles.previewCard}>
      <h2 className={styles.title}>Preview</h2>
      {isSubmitting ? (
        <div className={styles.loadingState}>Crafting your personalised letter…</div>
      ) : generatedLetter ? (
        <>
          <pre className={styles.previewBody}>{generatedLetter}</pre>
          <Button
            type="button"
            onClick={onCopyResult}
            variant="outline"
            size="sm"
            iconPlacement="end"
            icon={<CopyIcon />}
          >
            Copy to clipboard
          </Button>
        </>
      ) : (
        <div className={styles.loadingState}>Fill in the form to generate a tailored cover letter.</div>
      )}
    </section>
  </div>
);
