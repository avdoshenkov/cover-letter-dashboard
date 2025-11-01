import localFont from 'next/font/local';

export const fixel = localFont({
  src: [
    {
      path: '../../public/fonts/FixelText-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/FixelText-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/fonts/FixelText-SemiBold.woff2',
      weight: '600',
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-fixel'
});
