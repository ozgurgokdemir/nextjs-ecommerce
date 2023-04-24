import type { ReactElement } from 'react';
import type { Product } from '@/lib/types';
import { Fragment, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, HeartIcon } from '@heroicons/react/24/outline';
import { Footer, Header, CartActionBar, StoreNav } from '@/components/common';
import { useCartStore } from '@/lib/store';

type ProductLayoutProps = {
  children: ReactElement<{ product: Product }>;
};

export default function ProductLayout({ children }: ProductLayoutProps) {
  const { product } = children.props;

  const { cartItems, addToCart, removeFromCart } = useCartStore();

  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => setIsHydrated(true), []);
  if (!isHydrated) return null;

  const productIndex = cartItems.findIndex((item) => item.id === product.id);
  const isProductAdded = productIndex !== -1;

  const discountAmount = product.price * (product.discount / 100);
  const price = Math.trunc(product.price - discountAmount);

  return (
    <Fragment>
      <Header
        nav={{ icon: ChevronLeftIcon, navigateBack: true }}
        label="Details"
        cta={{ icon: HeartIcon, onClick: () => undefined }}
      />
      <StoreNav />
      <motion.main
        className="pb-[6rem] sm:min-h-[calc(100vh-12rem)] sm:pb-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
      >
        {children}
      </motion.main>
      <Footer />
      <CartActionBar
        title="price"
        amount={price}
        action={isProductAdded ? 'remove' : 'add'}
        onAction={
          isProductAdded
            ? removeFromCart.bind(null, product.id)
            : addToCart.bind(null, product, 1)
        }
      />
    </Fragment>
  );
}
