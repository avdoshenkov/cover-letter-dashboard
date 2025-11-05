'use server';

import { z } from 'zod';
import { generateCoverLetter } from '@/services/generateCoverLetter';
import { coverLetterInputSchema, type TCoverLetterInput } from '@/schemas/coverLetter';

type TGenerateCoverLetterResult =
  | { success: true; data: string }
  | { success: false; error: string };

// TODO: Switch to LLM generation
export const generateCoverLetterAction = async (
  input: TCoverLetterInput
): Promise<TGenerateCoverLetterResult> => {
  try {
    const validatedData = coverLetterInputSchema.parse(input);

    const body = await generateCoverLetter({
      company: validatedData.company.trim(),
      jobTitle: validatedData.jobTitle.trim(),
      skills: validatedData.skills.trim(),
      additionalDetails: validatedData.additionalDetails?.trim() || undefined
    });

    return { success: true, data: body };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map((issue) => issue.message).join(', ')
      };
    }

    return {
      success: false,
      error: 'Failed to generate cover letter. Please try again.'
    };
  }
};
