'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { GeneratorFormView } from '../GeneratorFormView';
import { generateCoverLetter } from '@/services/generateCoverLetter';
import { TCoverLetterFormInput } from '@/types/coverLetter';
import { selectLetterById, useCoverLetterStore } from '@/store/coverLetters';

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

export type TCoverLetterFormContainerProps = {
  letterId?: string;
};

export const CoverLetterFormContainer = ({ letterId }: TCoverLetterFormContainerProps) => {
  const router = useRouter();
  const letter = useCoverLetterStore(letterId ? selectLetterById(letterId) : () => undefined);
  const addLetter = useCoverLetterStore((state) => state.addLetter);
  const updateLetter = useCoverLetterStore((state) => state.updateLetter);

  const isEditMode = !!letterId;

  // Set initial generated letter for edit mode
  const [generatedLetter, setGeneratedLetter] = useState<string | undefined>(
    isEditMode ? letter?.body : undefined
  );

  // Redirect if trying to edit non-existent letter
  useEffect(() => {
    if (isEditMode && !letter) {
      router.push('/');
    }
  }, [isEditMode, letter, router]);

  const defaultValues: TCoverLetterFormInput = useMemo(
    () => ({
      company: letter?.company || '',
      jobTitle: letter?.jobTitle || '',
      skills: letter?.skills || '',
      additionalDetails: letter?.additionalDetails || ''
    }),
    [letter]
  );

  const { register, handleSubmit, formState, control } = useForm<TCoverLetterFormInput>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: 'onSubmit'
  });

  const jobTitle = useWatch({
    control,
    name: 'jobTitle'
  });

  const company = useWatch({
    control,
    name: 'company'
  });

  const additionalDetailsValue = useWatch({
    control,
    name: 'additionalDetails'
  });
  const characterCount = additionalDetailsValue?.length ?? 0;

  const isPlaceholderTitle = !jobTitle && !company;

  const formTitle = useMemo(() => {
    if (isPlaceholderTitle) {
      return 'New application';
    }
    if (jobTitle && company) {
      return `${jobTitle}, ${company}`;
    }
    return jobTitle || company;
  }, [jobTitle, company, isPlaceholderTitle]);

  const onSubmit = handleSubmit(async (values) => {
    const payload: TCoverLetterFormInput = {
      company: values.company.trim(),
      jobTitle: values.jobTitle.trim(),
      skills: values.skills.trim(),
      additionalDetails: values.additionalDetails?.trim()
        ? values.additionalDetails.trim()
        : undefined
    };

    const body = await generateCoverLetter(payload);
    setGeneratedLetter(body);

    if (isEditMode && letterId) {
      updateLetter(letterId, payload, body);
    } else {
      addLetter(payload, body);
    }
  });

  const errorMessages = useMemo(
    () => ({
      company: formState.errors.company?.message,
      jobTitle: formState.errors.jobTitle?.message,
      skills: formState.errors.skills?.message,
      additionalDetails: formState.errors.additionalDetails?.message
    }),
    [formState.errors]
  );

  // Don't render if trying to edit non-existent letter
  if (isEditMode && !letter) {
    return null;
  }

  return (
    <GeneratorFormView
      onSubmit={onSubmit}
      register={register}
      errors={errorMessages}
      isSubmitting={formState.isSubmitting}
      generatedLetter={generatedLetter}
      isPlaceholderTitle={!isEditMode && isPlaceholderTitle}
      characterCount={characterCount}
      maxCharacters={MAX_CHARACTERS}
      formTitle={formTitle}
      submitButtonText={isEditMode ? 'Try Again' : 'Generate Now'}
    />
  );
};
