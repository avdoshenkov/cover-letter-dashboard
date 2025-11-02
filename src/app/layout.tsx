'use client';

import { PropsWithChildren } from 'react';
import './globals.css';
import { fixel } from './fonts';
import { Header } from '@/components/header/Header';

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="en" className={fixel.variable}>
    <head>
      <link rel="icon" href="/favicon.ico" sizes="32x32" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.webmanifest" />
      <meta name="theme-color" content="#099250" />
    </head>
    <body>
      <Header />
      <main>{children}</main>
    </body>
  </html>
);

export { RootLayout };

export default RootLayout;
