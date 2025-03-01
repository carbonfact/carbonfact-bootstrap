import { Flex, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from './NavBar';
import Providers from './Providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className='w-full h-full'>
      <body className={`${inter.className} w-full h-full`}>
        <Providers>
          <Theme
            appearance="dark"
            accentColor="blue"
            className='w-full h-full'
          >
            <div className='flex flex-col w-full h-full gap-4 p-6'>
              <NavBar />
              {children}
            </div>
          </Theme>
        </Providers>
      </body>
    </html>
  );
}
