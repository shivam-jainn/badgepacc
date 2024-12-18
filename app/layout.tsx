import '@mantine/core/styles.css';
import React from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import {SessionProvider} from 'next-auth/react'
import './globals.css';
import Navbar from '@/components/Home/Navbar';
import AtomsProvider from '@/atoms/AtomsProvider';

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <SessionProvider>
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
    <AtomsProvider>
        <MantineProvider theme={theme}>
          <Navbar />
          {children}
        </MantineProvider>
    </AtomsProvider>
      </body>
    </html>
    </SessionProvider>
  );
}
