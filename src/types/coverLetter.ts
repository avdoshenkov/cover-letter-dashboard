export type TCoverLetter = {
  id: string;
  company: string;
  jobTitle: string;
  skills: string;
  additionalDetails?: string;
  body: string;
  createdAt: string;
};

export type TCoverLetterFormInput = Pick<
  TCoverLetter,
  'company' | 'jobTitle' | 'skills' | 'additionalDetails'
> & {
  body?: string;
};
