'use client';
import { WishlistItem } from '@/components/wishlist';
import { useCartStore } from '@/lib/store';

export default function Wishlist() {
  const { cartItems, removeFromCart, addToCart } = useCartStore();

  if (cartItems.length === 0) {
    return (
      <section className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="mb-4 h-36 w-36 rounded-lg bg-slate-100"></div>
        <h1 className="font-secondary text-heading-2xl">
          Your Wishlist is Empty
        </h1>
        <p className="text-body-sm-400 text-slate-600">
          Discover new products to add to your list
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col">
      <ul className="grid grid-cols-1">
        {cartItems.map((product) => (
          <WishlistItem
            key={product.id}
            product={product}
            onDelete={removeFromCart}
            onAddToCart={addToCart}
          />
        ))}
      </ul>
    </section>
  );
}
