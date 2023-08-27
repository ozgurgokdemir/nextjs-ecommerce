'use client';
import {
  ShoppingCartIcon,
  TrashIcon,
  CreditCardIcon,
} from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui';

type Props = {
  title: string;
  amount: number;
  action: 'add' | 'remove' | 'checkout';
  onAction: () => void;
};

const buttonProps = {
  add: {
    text: 'Add to Cart',
    icon: ShoppingCartIcon,
  },
  remove: {
    text: 'Remove',
    icon: TrashIcon,
  },
  checkout: {
    text: 'Checkout',
    icon: CreditCardIcon,
  },
};

const variants = {
  hidden: {
    opacity: 0,
    transition: { ease: 'easeIn', duration: 0.2 },
  },
  show: {
    opacity: 1,
    transition: { ease: 'easeOut', duration: 0.3 },
  },
};

export default function CartActionBar(props: Props) {
  const { title, amount, action, onAction } = props;

  return (
    <div className="fixed inset-x-0 bottom-[4.5rem] z-40 flex items-center justify-between gap-4 bg-white p-6 shadow-stroke-t sm:hidden">
      <div className="flex w-24 flex-col justify-center">
        <span className="text-label-base-600 uppercase text-slate-400">
          {title}
        </span>
        <span className="font-secondary text-label-xl-600">{`$${amount}`}</span>
      </div>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={action}
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={variants}
          className="flex-1"
        >
          <Button
            className="w-full"
            variant={action === 'remove' ? 'secondary' : 'primary'}
            text={buttonProps[action].text}
            icon={buttonProps[action].icon}
            onClick={onAction}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
