import { z } from 'zod';

export const MAX_CHARACTERS = 1200;

export const coverLetterInputSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  skills: z.string().min(1, 'Skills are required'),
  additionalDetails: z
    .string()
    .max(MAX_CHARACTERS, 'Additional details must be 1200 characters or less')
    .optional()
    .or(z.literal(''))
});

export const coverLetterFormSchema = coverLetterInputSchema.extend({
  body: z.string().optional()
});

export type TCoverLetterInput = z.infer<typeof coverLetterInputSchema>;
export type TCoverLetterFormData = z.infer<typeof coverLetterFormSchema>;
