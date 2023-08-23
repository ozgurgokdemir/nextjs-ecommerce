'use client';
import { CreditCardIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, Modal } from '@/components/ui';
import { CartItem } from '@/components/cart';
import { useCartStore } from '@/lib/store';

const variants = {
  cartContent: {
    hidden: {
      opacity: 0,
      transition: { ease: 'easeIn', duration: 0.2 },
    },
    show: {
      opacity: 1,
      transition: { ease: 'easeOut', duration: 0.3 },
    },
  },
  cartItem: {
    hidden: {
      height: 0,
      opacity: 0,
      transition: { ease: 'easeIn', duration: 0.2 },
    },
    show: {
      height: 'auto',
      opacity: 1,
      transition: { ease: 'easeOut', duration: 0.3 },
    },
  },
};

export default function CartModal() {
  const { isCartOpen, closeCart, cartItems, totalPrice } = useCartStore();

  return (
    <Modal
      isOpen={isCartOpen}
      onClose={closeCart}
      className="flex w-full max-w-[30rem] flex-col"
    >
      <AnimatePresence initial={false} mode="popLayout">
        {cartItems.length > 0 ? (
          <motion.div
            key="cart"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={variants.cartContent}
          >
            <ul className="flex max-h-[28.5rem] flex-col overflow-y-auto overflow-x-hidden pt-6">
              <AnimatePresence initial={false}>
                {cartItems.map((item) => (
                  <motion.li
                    key={item.id}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={variants.cartItem}
                    className="shadow-stroke-b last:shadow-none"
                  >
                    <div className="h-full max-h-fit overflow-hidden">
                      <CartItem item={item} />
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            <div className="flex flex-col gap-6 p-12 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-label-base-600 text-slate-400">
                  TOTAL
                </span>
                <span className="font-secondary text-label-xl-600">
                  ${totalPrice}
                </span>
              </div>
              <div className="flex gap-6">
                <Button
                  className="flex-1"
                  text="Close"
                  variant="secondary"
                  onClick={closeCart}
                />
                <Button
                  className="flex-1"
                  text="Checkout"
                  icon={CreditCardIcon}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="cart-empty"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={variants.cartContent}
            className="relative flex flex-col gap-4 p-12"
          >
            <div className="absolute right-0 top-0 p-6">
              <button type="button" onClick={closeCart}>
                <XMarkIcon className="h-6" />
              </button>
            </div>
            <div className="mx-auto mb-4 h-36 w-36 rounded-lg bg-slate-100"></div>
            <Dialog.Title className="font-secondary text-heading-2xl">
              Your Shopping Cart is Empty
            </Dialog.Title>
            <Dialog.Description className="text-body-base-400">
              Browse our products to find something you need, or check out our
              latest deals and offers.
            </Dialog.Description>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
