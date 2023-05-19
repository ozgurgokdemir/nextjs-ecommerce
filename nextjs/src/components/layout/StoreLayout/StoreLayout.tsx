import type { ReactElement } from 'react';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { Footer, Header, NavBar, StoreNav } from '@/components/common';

type StoreLayoutProps = {
  children: ReactElement<{ title?: string }>;
};

export default function StoreLayout({ children }: StoreLayoutProps) {
  const { title } = children.props;

  return (
    <Fragment>
      <Header
        nav={
          title
            ? { icon: ChevronLeftIcon, navigateBack: true }
            : { icon: ShoppingBagIcon, url: '/' }
        }
        label={title ? title.charAt(0).toUpperCase() + title.slice(1) : 'Store'}
        cta={{ icon: MagnifyingGlassIcon, onClick: () => undefined }}
      />
      <StoreNav />
      <motion.main
        className="flex min-h-[calc(100vh-4.5rem)] flex-col pb-[4.5rem] sm:min-h-[calc(100vh-12rem)] sm:pb-0"
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
