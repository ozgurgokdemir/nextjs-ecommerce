import type { Product } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { IconButton } from '@/components/ui';
import { useCartStore } from '@/lib/store';

type CartItem = Product & { quantity: number };

type CartItemProps = { item: CartItem };

export default function CartItem({ item }: CartItemProps) {
  const { id, title, quantity, images, imageAlt, category, slug } = item;

  const { incrementQuantity, decrementQuantity, removeFromCart } =
    useCartStore();

  const discountAmount = item.price * (item.discount / 100);
  const price = Math.trunc(item.price - discountAmount);

  const url = `/store/${category}/${slug}`;

  const handleDecrement = () => {
    if (quantity - 1 < 1) removeFromCart(id);
    else decrementQuantity(id);
  };

  return (
    <div className="flex h-36 p-6 gap-4 sm:px-12 sm:gap-6">
      <Link href={url}>
        <Image
          className="w-24 h-24 rounded-lg object-cover"
          src={images[0]}
          alt={imageAlt}
          width={96}
          height={96}
        />
      </Link>
      <div className="flex-1 flex flex-col justify-center gap-6 text-label-base-600">
        <Link className="w-fit" href={url}>
          <h5 className="text-label-lg-500">{title}</h5>
        </Link>
        <div className="flex items-center justify-between">
          <span className="font-secondary">{`$${price}`}</span>
          <div className="flex items-center">
            <IconButton
              className="hover:text-slate-800"
              icon={MinusIcon}
              size="small"
              onClick={handleDecrement}
            />
            <span className="w-8 font-secondary text-center">{quantity}</span>
            <IconButton
              className="hover:text-slate-800"
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
