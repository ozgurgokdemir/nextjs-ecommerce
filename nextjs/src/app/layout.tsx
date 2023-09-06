import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { SessionProvider } from '@/components/providers';
import {
  Footer,
  Header,
  MainContent,
  NavBar,
  StoreNav,
} from '@/components/common';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Next.js E-Commerce',
  description:
    'A modern e-commerce example built with Next.js, TypeScript, Tailwind CSS, Zustand.',
};

type RootLayoutProps = { children: React.ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-primary`}>
        <SessionProvider>
          <Header />
          <StoreNav />
          <MainContent>{children}</MainContent>
          <Footer />
          <NavBar />
        </SessionProvider>
      </body>
    </html>
  );
}
