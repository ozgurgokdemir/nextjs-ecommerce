import type { ReactNode } from 'react';
import { Fragment } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/lib/hooks';
import { useRouter } from 'next/router';

type AuthLayoutProps = { children: ReactNode };

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { status } = useAuth();

  const router = useRouter();

  if (status === 'loading') return null;

  if (status === 'authenticated') {
    void router.replace('/');
    return null;
  }

  return (
    <Fragment>
      <header className="sticky inset-x-0 top-0 z-40 flex items-center justify-between">
        <Link className="p-6" href="/">
          <XMarkIcon className="h-6" />
        </Link>
      </header>
      <motion.main
        className="flex min-h-[calc(100vh-4.5rem)] flex-col"
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
