import type { Product } from '@/lib/types';
import Image from 'next/image';
import { clsx } from 'clsx';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { IconButton } from '@/components/ui';
import { useCartStore } from '@/lib/store';

type CartItemProps = Omit<
  Product,
  'description' | 'discount' | 'images' | 'category' | 'slug'
> & {
  quantity: number;
  image: Product['images'][0];
  className?: string;
};

export default function CartItem(props: CartItemProps) {
  const { id, title, price, quantity, image, imageAlt, className } = props;

  const { incrementQuantity, decrementQuantity, removeFromCart } =
    useCartStore();

  const handleDecrement = () => {
    if (quantity - 1 < 1) removeFromCart(id);
    else decrementQuantity(id);
  };

  return (
    <div
      className={clsx(
        'flex h-36 p-6 gap-4 border-b border-b-slate-100',
        className
      )}
    >
      <Image
        className="w-24 h-24 rounded-lg"
        src={image}
        alt={imageAlt}
        width={96}
        height={96}
      />
      <div className="flex-1 flex flex-col justify-around text-label-base-500">
        <h5 className="text-label-base-600">{title}</h5>
        <div className="flex items-center justify-between">
          <span className="font-secondary">{`$${price}`}</span>
          <div className="flex items-center">
            <IconButton
              icon={MinusIcon}
              size="small"
              onClick={handleDecrement}
            />
            <span className="w-8 font-secondary text-label-base-600 text-center">
              {quantity}
            </span>
            <IconButton
              icon={PlusIcon}
              size="small"
              onClick={incrementQuantity.bind(null, id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
