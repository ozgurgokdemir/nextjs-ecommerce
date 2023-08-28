'use client';
import { Fragment } from 'react';
import { CartActionBar } from '@/components/common';
import { useCartStore } from '@/lib/store';

type CartLayoutProps = { children: React.ReactNode };

export default function CartLayout({ children }: CartLayoutProps) {
  const { totalPrice } = useCartStore();

  const handleCheckout = () => undefined;

  return (
    <Fragment>
      {children}
      {totalPrice > 0 && (
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
