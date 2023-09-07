import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { SessionProvider } from '@/components/providers';
import {
  Header,
  StoreNav,
  MainContent,
  Footer,
  NavBar,
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

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-primary`}>
        <SessionProvider session={session}>
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
