import type { Product } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { IconButton } from '@/components/ui';
import { useCartStore } from '@/lib/store';
import { limitImageSize } from '@/lib/utils';

type CartItem = Product & { quantity: number };

type CartItemProps = { item: CartItem };

export default function CartItem({ item }: CartItemProps) {
  const { id, title, quantity, images, category, slug } = item;

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
    <div className="flex h-36 gap-4 p-6 sm:gap-6 sm:px-12">
      <Link href={url}>
        <Image
          className="h-24 w-24 rounded-lg object-cover"
          src={images[0].url}
          alt={images[0].alternativeText}
          {...limitImageSize(images[0], 96)}
          blurDataURL={images[0].blurDataURL}
          placeholder="blur"
        />
      </Link>
      <div className="flex flex-1 flex-col justify-center gap-6 text-label-base-600">
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
            <span className="w-8 text-center font-secondary">{quantity}</span>
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
