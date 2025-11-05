import { CoverLetterFormContainer } from '@/components/forms/containers';
import { ProgressBannerContainer } from '@/components/banner/ProgressBanner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Letter - Cover Letter Dashboard',
  description:
    'Edit and update your cover letter. Modify details and regenerate content with AI assistance.',
  openGraph: {
    title: 'Edit Letter - Cover Letter Dashboard',
    description:
      'Edit and update your cover letter. Modify details and regenerate content with AI assistance.',
    type: 'website',
    url: '/edit',
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
    title: 'Edit Letter - Cover Letter Dashboard',
    description:
      'Edit and update your cover letter. Modify details and regenerate content with AI assistance.',
    images: ['/og-image.svg']
  }
};

type TEditLetterPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const EditLetterPage = async ({ params }: TEditLetterPageProps) => {
  const { id } = await params;

  return (
    <>
      <CoverLetterFormContainer letterId={id} />
      <ProgressBannerContainer />
    </>
  );
};

export default EditLetterPage;
