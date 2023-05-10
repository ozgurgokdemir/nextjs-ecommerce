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
      className="w-full max-w-[30rem] flex flex-col"
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
            <ul className="pt-6 flex flex-col max-h-[28.5rem] overflow-x-hidden overflow-y-auto">
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
            <div className="p-12 pt-6 flex flex-col gap-6">
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
            className="p-12 relative flex flex-col gap-4"
          >
            <div className="p-6 absolute top-0 right-0">
              <button type="button" onClick={closeCart}>
                <XMarkIcon className="h-6" />
              </button>
            </div>
            <div className="w-36 h-36 mx-auto mb-4 bg-slate-100 rounded-lg"></div>
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
