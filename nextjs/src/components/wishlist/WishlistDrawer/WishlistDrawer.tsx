import { XMarkIcon } from '@heroicons/react/24/outline';
import { Drawer } from '@/components/ui';
import { WishlistItem } from '@/components/wishlist';
import { useCartStore } from '@/lib/store';

type WishlistDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WishlistDrawer(props: WishlistDrawerProps) {
  const { isOpen, onClose } = props;

  const { cart, removeFromCart, addToCart } = useCartStore();

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="p-6 flex justify-end">
        <button type="button" onClick={onClose}>
          <XMarkIcon className="h-6" />
        </button>
      </div>
      <div className="px-12 flex flex-col gap-4">
        <h5 className="font-secondary text-heading-3xl">Your Favourites</h5>
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
    </Drawer>
  );
}
