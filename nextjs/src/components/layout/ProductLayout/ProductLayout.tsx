import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Footer, Header, NavBar, StoreNav } from '@/components/common';

type ProductLayoutProps = { children: ReactNode };

export default function ProductLayout({ children }: ProductLayoutProps) {
  return (
    <Fragment>
      <Header
        nav={{ icon: ShoppingBagIcon, navigateBack: true }}
        label="Details"
        cta={{ icon: HeartIcon, onClick: () => undefined }}
      />
      <StoreNav />
      <motion.main
        className="pb-[4.5rem] sm:min-h-[calc(100vh-12rem)] sm:pb-0"
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
