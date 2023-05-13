import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useCartStore } from '@/lib/store';
import { IconButton } from '@/components/ui';
import { CartCounter } from '@/components/cart';

export default function CartButton() {
  const { openCart } = useCartStore();

  return (
    <div className="relative">
      <IconButton icon={ShoppingCartIcon} size="large" onClick={openCart} />
      <CartCounter className="-top-2 -right-2" />
    </div>
  );
}
