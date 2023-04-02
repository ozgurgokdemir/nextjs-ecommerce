import { XMarkIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { WishlistItem } from '@/components/wishlist';
import { usePortal } from '@/lib/hooks';
import { useCartStore } from '@/lib/store';

type WishlistDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  backdrop?: boolean;
};

export default function WishlistDrawer(props: WishlistDrawerProps) {
  const { isOpen, onClose, backdrop = true } = props;

  const Portal = usePortal('__next');

  const { cart, removeFromCart, addToCart } = useCartStore();

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
              initial={{ left: -480 }}
              animate={{ left: 0 }}
              exit={{ left: -484 }}
              className="w-[30rem] h-full relative flex flex-col gap-8 bg-white"
            >
              <div className="p-6 flex justify-end">
                <button type="button" onClick={onClose}>
                  <XMarkIcon className="h-6" />
                </button>
              </div>
              <div className="px-12 flex flex-col gap-4">
                <h5 className="font-secondary text-heading-3xl">
                  Your Favourites
                </h5>
                <p className="text-body-base-400 text-slate-600">
                  {cart && cart.length > 0
                    ? 'Easily keep track of your favourite products'
                    : 'Discover new products to add to your list'}
                </p>
              </div>
              {cart && cart.length > 0 && (
                <ul className="flex flex-col">
                  {cart.map((product) => (
                    <WishlistItem
                      className="px-12"
                      key={product.id}
                      product={product}
                      onDelete={removeFromCart}
                      onAddToCart={addToCart}
                    />
                  ))}
                </ul>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
