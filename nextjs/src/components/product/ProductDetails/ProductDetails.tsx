'use client';
import type { Product } from '@/lib/types';
import { Fragment } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  HeartIcon,
  ShoppingCartIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { Button, IconButton } from '@/components/ui';
import { useCartStore } from '@/lib/store';

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

type Props = { product: Product };

export default function ProductDetails({ product }: Props) {
  const { id, title, description, price, discount } = product;

  const { cartItems, addToCart, removeFromCart } = useCartStore();

  const productIndex = cartItems.findIndex((item) => item.id === id);
  const isProductAdded = productIndex !== -1;

  const discountAmount = price * (discount / 100);
  const newPrice = Math.trunc(price - discountAmount);
  const oldPrice = Math.trunc(price);

  return (
    <div className="flex flex-1 md:justify-end">
      <div className="flex flex-col gap-4 sm:gap-6 md:max-w-[25rem]">
        <h1 className="font-secondary text-heading-3xl text-slate-900 sm:text-heading-4xl">
          {title}
        </h1>
        <div className="flex flex-col gap-1">
          <span className="text-label-sm-600 text-slate-400">DESCRIPTION</span>
          <p className="text-body-base-400">{description}</p>
        </div>
        <div className="hidden items-center gap-2 font-secondary text-heading-3xl sm:flex">
          <span>{`$${newPrice}`}</span>
          {discount > 0 && (
            <Fragment>
              <span className="text-slate-400">{'·'}</span>
              <span className="text-slate-400 line-through">{`$${oldPrice}`}</span>
            </Fragment>
          )}
        </div>
        <div className="hidden gap-4 sm:flex">
          <IconButton icon={HeartIcon} size="large" />
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={isProductAdded ? 'remove' : 'add'}
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={variants}
              className="flex-1"
            >
              <Button
                className="w-full"
                text={isProductAdded ? 'Remove' : 'Add to Cart'}
                icon={isProductAdded ? TrashIcon : ShoppingCartIcon}
                variant={isProductAdded ? 'secondary' : 'primary'}
                onClick={
                  isProductAdded
                    ? removeFromCart.bind(null, id)
                    : addToCart.bind(null, product, 1)
                }
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
