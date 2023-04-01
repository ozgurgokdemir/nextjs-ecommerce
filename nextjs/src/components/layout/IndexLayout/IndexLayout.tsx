import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import { Footer, Header, NavBar, StoreNav } from '@/components/common';

type IndexLayoutProps = { children: ReactNode };

export default function IndexLayout({ children }: IndexLayoutProps) {
  return (
    <Fragment>
      <Header
        nav={{ icon: ShoppingBagIcon, url: '/' }}
        cta={{ icon: MagnifyingGlassIcon, onClick: () => undefined }}
      />
      <StoreNav />
      <motion.main
        className="min-h-[calc(100vh-4.5rem)] pb-[4.5rem] flex flex-col sm:min-h-[calc(100vh-12rem)] sm:pb-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
      >
        {children}
      </motion.main>
      <Footer />
      <NavBar />
    </Fragment>
  );
}
