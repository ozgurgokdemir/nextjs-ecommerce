import { AnimatePresence, motion } from 'framer-motion';
import { CartLayout } from '@/components/layout';
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

export default function Cart() {
  const { cartItems } = useCartStore();

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {cartItems.length > 0 ? (
        <motion.section
          key="cart"
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={variants.cartContent}
        >
          <ul className="flex flex-col">
            <AnimatePresence initial={false}>
              {cartItems.map((item) => (
                <motion.li
                  key={item.id}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={variants.cartItem}
                  className="shadow-stroke-b last:shadow-none overflow-hidden"
                >
                  <CartItem item={item} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.section>
      ) : (
        <motion.section
          key="cart-empty"
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={variants.cartContent}
          className="px-6 flex-1 flex flex-col items-center justify-center gap-4 text-center"
        >
          <div className="w-36 h-36 mb-4 bg-slate-100 rounded-lg"></div>
          <h1 className="font-secondary text-heading-2xl">
            Your Shopping Cart <br /> is Empty
          </h1>
          <p className="text-body-sm-400 text-slate-600">
            Browse our products to find something you need, or check out our
            latest deals and offers.
          </p>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

Cart.PageLayout = CartLayout;
