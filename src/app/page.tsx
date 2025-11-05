import { DashboardContainer } from '@/components/dashboard/containers';
import { ProgressBannerContainer } from '@/components/banner/ProgressBanner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cover Letter Dashboard - Manage Your Applications',
  description:
    'Create and manage AI-powered cover letters. Generate personalized letters tailored to each job application quickly and efficiently.',
  openGraph: {
    title: 'Cover Letter Dashboard - Manage Your Applications',
    description:
      'Create and manage AI-powered cover letters. Generate personalized letters tailored to each job application quickly and efficiently.',
    type: 'website',
    url: '/',
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
    title: 'Cover Letter Dashboard - Manage Your Applications',
    description:
      'Create and manage AI-powered cover letters. Generate personalized letters tailored to each job application quickly and efficiently.',
    images: ['/og-image.svg']
  }
};

const DashboardPage = () => (
  <>
    <DashboardContainer />
    <ProgressBannerContainer />
  </>
);

export default DashboardPage;
