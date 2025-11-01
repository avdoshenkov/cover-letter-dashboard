import { type Metadata } from 'next';
import { type PropsWithChildren } from 'react';
import './globals.css';
import { fixel } from './fonts';
import { Header } from '@/components/header/Header';

export const metadata: Metadata = {
  title: 'Cover Letter Dashboard',
  description: 'Generate and manage tailored cover letters right in your browser.'
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="en" className={fixel.variable}>
    <body>
      <Header />
      <main>{children}</main>
    </body>
  </html>
);

export { RootLayout };

export default RootLayout;
