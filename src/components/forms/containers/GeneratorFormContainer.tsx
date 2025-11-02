'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { GeneratorFormView } from '../GeneratorFormView';
import { generateCoverLetter } from '@/services/generateCoverLetter';
import { TCoverLetterFormInput } from '@/types/coverLetter';
import { 
  selectLettersCount, 
  selectGoalCount, 
  selectIsGoalReached, 
  useCoverLetterStore 
} from '@/store/coverLetters';

const MAX_CHARACTERS = 1200;

const schema = z.object({
  company: z.string().min(1, 'Company is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  skills: z.string().min(1, 'Skills are required'),
  additionalDetails: z
    .string()
    .max(MAX_CHARACTERS, 'Additional details must be 1200 characters or less')
    .optional()
    .or(z.literal(''))
});

const defaultValues: TCoverLetterFormInput = {
  company: '',
  jobTitle: '',
  skills: '',
  additionalDetails: ''
};

export const GeneratorFormContainer = () => {
  const [generatedLetter, setGeneratedLetter] = useState<string>();
  const router = useRouter();
  const addLetter = useCoverLetterStore((state) => state.addLetter);
  const current = useCoverLetterStore(selectLettersCount);
  const goal = useCoverLetterStore(selectGoalCount);
  const reached = useCoverLetterStore(selectIsGoalReached);

  const progress = useMemo(
    () => ({ current, goal, reached }),
    [current, goal, reached]
  );

  const {
    register,
    handleSubmit,
    formState,
    reset,
    control
  } = useForm<TCoverLetterFormInput>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: 'onSubmit'
  });

  const additionalDetailsValue = useWatch({
    control,
    name: 'additionalDetails'
  });
  const characterCount = additionalDetailsValue?.length ?? 0;

  const onSubmit = handleSubmit(
    async (values) => {
      const payload: TCoverLetterFormInput = {
        company: values.company.trim(),
        jobTitle: values.jobTitle.trim(),
        skills: values.skills.trim(),
        additionalDetails: values.additionalDetails?.trim() ? values.additionalDetails.trim() : undefined
      };

      const body = await generateCoverLetter(payload);
      setGeneratedLetter(body);
      addLetter(payload, body);
    }
  );

  const handleCopyResult = useCallback(() => {
    if (!generatedLetter || typeof navigator === 'undefined') {
      return;
    }

    void navigator.clipboard.writeText(generatedLetter);
  }, [generatedLetter]);

  const handleReset = useCallback(() => {
    reset(defaultValues);
    setGeneratedLetter(undefined);
  }, [reset]);

  const handleCreate = useCallback(() => {
    router.push('/new');
  }, [router]);

  const errorMessages = useMemo(
    () => ({
      company: formState.errors.company?.message,
      jobTitle: formState.errors.jobTitle?.message,
      skills: formState.errors.skills?.message,
      additionalDetails: formState.errors.additionalDetails?.message
    }),
    [formState.errors]
  );

  return (
    <GeneratorFormView
      onSubmit={onSubmit}
      register={register}
      errors={errorMessages}
      isSubmitting={formState.isSubmitting}
      generatedLetter={generatedLetter}
      onCopyResult={handleCopyResult}
      onReset={handleReset}
      characterCount={characterCount}
      maxCharacters={MAX_CHARACTERS}
      onCreate={handleCreate}
      progress={progress}
    />
  );
};
