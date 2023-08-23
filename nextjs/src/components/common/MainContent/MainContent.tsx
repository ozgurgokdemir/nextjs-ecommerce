'use client';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

type Props = { children: React.ReactNode };

export default function MainContent({ children }: Props) {
  const pathname = usePathname();

  return (
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
  );
}
