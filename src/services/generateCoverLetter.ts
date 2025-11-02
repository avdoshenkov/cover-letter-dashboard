import { type TCoverLetterFormInput } from '@/types/coverLetter';

type TGenerateCoverLetterInput = TCoverLetterFormInput;

type TGenerateCoverLetter = (input: TGenerateCoverLetterInput) => Promise<string>;

const TEMPLATE = `Dear [Company] Team,\n\nI am writing to express my interest in the [JobTitle] position.\n\nMy experience in the realm combined with my skills in [SkillsList] make me a strong candidate for this role.\n\n[AdditionalDetails]\n\nI am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.\n\nThank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.\n`;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateCoverLetter: TGenerateCoverLetter = async ({
  company,
  jobTitle,
  skills,
  additionalDetails
}) => {
  await delay(2200);

  const letter = TEMPLATE.replace('[Company]', company)
    .replace('[JobTitle]', jobTitle)
    .replace('[SkillsList]', skills)
    .replace('[AdditionalDetails]', additionalDetails?.trim() ? additionalDetails : '');

  return letter.trim();
};
