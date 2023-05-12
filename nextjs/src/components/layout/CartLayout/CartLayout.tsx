import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import {
  Footer,
  Header,
  CartActionBar,
  StoreNav,
  NavBar,
} from '@/components/common';
import { useCartStore } from '@/lib/store';

type CartLayoutProps = { children: ReactNode };

export default function ProductLayout({ children }: CartLayoutProps) {
  const { totalPrice } = useCartStore();

  function handleCheckout() {
    // Checkout Action
  }

  return (
    <Fragment>
      <Header
        nav={
          totalPrice === 0
            ? { icon: ShoppingBagIcon, url: '/' }
            : { icon: ChevronLeftIcon, navigateBack: true }
        }
        label="Cart"
        cta={{ icon: MagnifyingGlassIcon, onClick: () => undefined }}
      />
      <StoreNav />
      <motion.main
        className="min-h-[calc(100vh-4.5rem)] pb-[6rem] flex flex-col sm:min-h-[calc(100vh-12rem)] sm:pb-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
      >
        {children}
      </motion.main>
      <Footer />
      {totalPrice === 0 ? (
        <NavBar />
      ) : (
        <CartActionBar
          title="total"
          amount={totalPrice}
          action="checkout"
          onAction={handleCheckout}
        />
      )}
    </Fragment>
  );
}
