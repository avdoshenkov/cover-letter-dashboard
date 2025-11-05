import { CoverLetterFormContainer } from '@/components/forms/containers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create New Letter - Cover Letter Dashboard',
  description:
    'Generate a new AI-powered cover letter. Provide company details, job title, and your skills to create a personalized application letter.',
  openGraph: {
    title: 'Create New Letter - Cover Letter Dashboard',
    description:
      'Generate a new AI-powered cover letter. Provide company details, job title, and your skills to create a personalized application letter.',
    type: 'website',
    url: '/new',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Alt-Shift Cover Letter Dashboard'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create New Letter - Cover Letter Dashboard',
    description:
      'Generate a new AI-powered cover letter. Provide company details, job title, and your skills to create a personalized application letter.',
    images: ['/og-image.svg']
  }
};

const NewLetterPage = () => <CoverLetterFormContainer />;

export default NewLetterPage;
