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
                  className="overflow-hidden shadow-stroke-b last:shadow-none"
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
          className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center"
        >
          <div className="mb-4 h-36 w-36 rounded-lg bg-slate-100"></div>
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
