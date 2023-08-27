'use client';
import type { Product } from '@/lib/types';
import { CartActionBar } from '@/components/common';
import { useCartStore } from '@/lib/store';

type Props = { product: Product };

export default function ProductActionBar({ product }: Props) {
  const { cartItems, addToCart, removeFromCart } = useCartStore();

  const productIndex = cartItems.findIndex((item) => item.id === product.id);
  const isProductAdded = productIndex !== -1;

  const discountAmount = product.price * (product.discount / 100);
  const price = Math.trunc(product.price - discountAmount);

  return (
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
  );
}
