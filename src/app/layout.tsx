'use client';

import { type PropsWithChildren } from 'react';
import './globals.css';
import { fixel } from './fonts';
import { Header } from '@/components/header/Header';

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
