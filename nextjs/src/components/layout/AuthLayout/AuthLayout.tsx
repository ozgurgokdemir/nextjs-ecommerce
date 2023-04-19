import type { ReactNode } from 'react';
import { Fragment } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

type AuthLayoutProps = { children: ReactNode };

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Fragment>
      <header className="sticky z-40 top-0 inset-x-0 flex items-center justify-between">
        <Link className="p-6" href="/">
          <XMarkIcon className="h-6" />
        </Link>
      </header>
      <motion.main
        className="min-h-[calc(100vh-4.5rem)] flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
      >
        {children}
      </motion.main>
    </Fragment>
  );
}
