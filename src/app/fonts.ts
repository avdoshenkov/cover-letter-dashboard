import localFont from 'next/font/local';

export const fixel = localFont({
  src: [
    {
      path: '../../public/fonts/FixelDisplay-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/FixelDisplay-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/fonts/FixelDisplay-SemiBold.woff2',
      weight: '600',
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-fixel'
});
