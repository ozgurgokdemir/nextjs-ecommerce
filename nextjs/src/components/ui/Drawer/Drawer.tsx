import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { clsx } from 'clsx';
import { usePortal } from '@/lib/hooks';

type DrawerProps = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  backdrop?: boolean;
  placement?: 'left' | 'right';
  className?: string;
};

export default function Drawer(props: DrawerProps) {
  const {
    isOpen,
    children,
    onClose,
    backdrop = true,
    placement = 'left',
    className,
  } = props;

  const Portal = usePortal('__next');

  const variants = {
    left: {
      hidden: { left: -484 },
      show: { left: 0 },
    },
    right: {
      hidden: { right: -484 },
      show: { right: 0 },
    },
  };

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50">
            {backdrop && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.25 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black"
                onClick={onClose}
              />
            )}
            <motion.div
              variants={variants[placement]}
              initial="hidden"
              animate="show"
              exit="hidden"
              className={clsx(
                'relative flex h-full w-[30rem] flex-col gap-8 bg-white',
                placement === 'left' ? 'mr-auto' : 'ml-auto',
                className
              )}
            >
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
