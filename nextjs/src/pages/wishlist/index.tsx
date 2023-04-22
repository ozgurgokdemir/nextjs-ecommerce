import { IndexLayout } from '@/components/layout';
import { WishlistItem } from '@/components/wishlist';
import { useCartStore } from '@/lib/store';

export default function Wishlist() {
  const { cartItems, removeFromCart, addToCart } = useCartStore();

  if (cartItems.length === 0) {
    return (
      <section className="px-6 flex-1 flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-36 h-36 mb-4 bg-slate-100 rounded-lg"></div>
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

Wishlist.PageLayout = IndexLayout;
