import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { clsx } from 'clsx';

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  backdrop?: boolean;
  className?: string;
};

export default function Modal(props: ModalProps) {
  const { isOpen, children, onClose, backdrop = true, className } = props;

  const variants = {
    backdrop: {
      hidden: {
        opacity: 0,
        transition: { ease: 'easeIn', duration: 0.2 },
      },
      show: {
        opacity: 1,
        transition: { ease: 'easeOut', duration: 0.3 },
      },
    },
    panel: {
      hidden: {
        opacity: 0,
        scale: 0.95,
        transition: { ease: 'easeIn', duration: 0.2 },
      },
      show: {
        opacity: 1,
        scale: 1,
        transition: { ease: 'easeOut', duration: 0.3 },
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          className="relative z-50"
          static
          as={motion.div}
          open={isOpen}
          onClose={onClose}
        >
          {backdrop && (
            <motion.div
              className="fixed inset-0 bg-black/30"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={variants.backdrop}
              aria-hidden="true"
            />
          )}
          <div className="fixed inset-0 grid place-items-center p-6">
            <Dialog.Panel
              className={clsx('rounded-lg bg-white', className)}
              as={motion.div}
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={variants.panel}
            >
              {children}
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
