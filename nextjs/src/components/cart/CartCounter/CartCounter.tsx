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
            'w-4 h-4 absolute pointer-events-none select-none',
            className
          )}
        >
          <span className="w-full h-full inline-flex absolute rounded-full opacity-80 bg-red-400 animate-subtle-ping" />
          <span className="w-full h-full flex flex-col justify-center relative rounded-full text-center text-label-sm-500 text-[0.625rem] text-slate-50 bg-red-400">
            {totalQuantity}
          </span>
        </motion.span>
      )}
    </AnimatePresence>
  );
}
