'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GeneratorFormView } from '../GeneratorFormView';
import { generateCoverLetterAction } from '@/actions/generateCoverLetter';
import { TCoverLetterFormInput } from '@/types/coverLetter';
import { selectLetterById, selectHasHydrated, useCoverLetterStore } from '@/store/coverLetters';
import { Button } from '@/components/common';
import { RepeatIcon } from '@/components/common/icons';
import { usePreventNavigation } from './usePreventNavigation';
import { coverLetterFormSchema, MAX_CHARACTERS } from '@/schemas/coverLetter';

export type TCoverLetterFormContainerProps = {
  letterId?: string;
};

export const CoverLetterFormContainer = ({ letterId }: TCoverLetterFormContainerProps) => {
  const router = useRouter();
  const hasHydrated = useCoverLetterStore(selectHasHydrated);
  const letter = useCoverLetterStore(letterId ? selectLetterById(letterId) : () => undefined);
  const addLetter = useCoverLetterStore((state) => state.addLetter);
  const updateLetter = useCoverLetterStore((state) => state.updateLetter);

  const isEditMode = !!letterId;

  useEffect(() => {
    if (hasHydrated && isEditMode && !letter) {
      router.push('/');
    }
  }, [hasHydrated, isEditMode, letter, router]);

  const defaultValues: TCoverLetterFormInput = useMemo(
    () => ({
      company: letter?.company || '',
      jobTitle: letter?.jobTitle || '',
      skills: letter?.skills || '',
      additionalDetails: letter?.additionalDetails || '',
      body: letter?.body || ''
    }),
    [letter]
  );

  const { register, handleSubmit, formState, control, setValue, reset } =
    useForm<TCoverLetterFormInput>({
      defaultValues,
      resolver: zodResolver(coverLetterFormSchema),
      mode: 'onSubmit'
    });

  usePreventNavigation({
    shouldPrevent: formState.isDirty && !formState.isSubmitting
  });

  // Update form values after store hydration in edit mode
  useEffect(() => {
    if (hasHydrated && isEditMode && letter) {
      reset({
        company: letter.company,
        jobTitle: letter.jobTitle,
        skills: letter.skills,
        additionalDetails: letter.additionalDetails || '',
        body: letter.body || ''
      });
    }
  }, [hasHydrated, isEditMode, letter, reset]);

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

  const generatedLetter = useWatch({
    control,
    name: 'body'
  });

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
    const payload = {
      company: values.company.trim(),
      jobTitle: values.jobTitle.trim(),
      skills: values.skills.trim(),
      additionalDetails: values.additionalDetails?.trim() || undefined
    };

    const result = await generateCoverLetterAction(payload);

    if (!result.success) {
      console.error('Failed to generate cover letter:', result.error);
      // TODO: Add error display to user
      return;
    }

    const body = result.data;
    setValue('body', body);

    if (isEditMode && letterId) {
      updateLetter(letterId, payload, body);
    } else {
      const newLetter = addLetter(payload, body);
      router.push(`/edit/${newLetter.id}`);
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

  if (hasHydrated && isEditMode && !letter) {
    return null;
  }

  const submitButton = isEditMode ? (
    <Button
      type="submit"
      loading={formState.isSubmitting}
      variant="outline"
      size="lg"
      fullWidth
      icon={<RepeatIcon />}
    >
      Try Again
    </Button>
  ) : (
    <Button type="submit" loading={formState.isSubmitting} variant="primary" size="lg" fullWidth>
      Generate Now
    </Button>
  );

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
      submitButton={submitButton}
    />
  );
};
