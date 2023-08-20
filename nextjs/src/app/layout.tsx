'use client';
import './globals.css';
import type { Metadata } from 'next';
import { usePathname } from 'next/navigation';
import { Inter, Poppins } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import { Footer, Header, NavBar, StoreNav } from '@/components/common';

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

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-primary`}>
        <SessionProvider>
          <Header
            nav={{ icon: ShoppingBagIcon, url: '/' }}
            cta={{
              icon: MagnifyingGlassIcon,
              onClick: () => {
                return;
              },
            }}
          />
          <StoreNav />
          <AnimatePresence initial={false} mode="wait">
            <div key={pathname}>
              <motion.main
                className="flex min-h-[calc(100vh-4.5rem)] flex-col pb-[4.5rem] sm:min-h-[calc(100vh-12rem)] sm:pb-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: 'easeInOut' }}
              >
                {children}
              </motion.main>
            </div>
          </AnimatePresence>
          <Footer />
          <NavBar />
        </SessionProvider>
      </body>
    </html>
  );
}
