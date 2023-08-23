'use client';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useCartStore } from '@/lib/store';

type Props = {
  className?: string;
};

const variants = {
  hidden: {
    scale: 0.9,
    opacity: 0,
    transition: { ease: 'easeIn', duration: 0.2 },
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: { ease: 'easeOut', duration: 0.3 },
  },
};

export default function CartButton({ className }: Props) {
  const { totalQuantity } = useCartStore();

  return (
    <AnimatePresence>
      {totalQuantity > 0 && (
        <motion.span
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={variants}
          className={clsx(
            'pointer-events-none absolute h-4 w-4 select-none',
            className
          )}
        >
          <span className="absolute inline-flex h-full w-full animate-subtle-ping rounded-full bg-red-400 opacity-80" />
          <span className="relative flex h-full w-full flex-col justify-center rounded-full bg-red-400 text-center text-[0.625rem] text-label-sm-500 text-slate-50">
            {totalQuantity}
          </span>
        </motion.span>
      )}
    </AnimatePresence>
  );
}
