import type { MouseEvent } from 'react';
import type { Product } from '@/lib/types';
import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { clsx } from 'clsx';
import { TrashIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { IconButton } from '@/components/ui';
import { limitImageSize } from '@/lib/utils';

type WishlistItemProps = {
  product: Product;
  onDelete: (id: number) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  className?: string;
};

export default function WishlistItem(props: WishlistItemProps) {
  const { product, onDelete, onAddToCart, className } = props;
  const { id, title, price, discount, images, category, slug } = product;

  const preventRouting = (event: MouseEvent, callback: () => void) => {
    event.preventDefault();
    event.stopPropagation();
    callback();
  };

  const discountAmount = price * (discount / 100);
  const newPrice = Math.trunc(price - discountAmount);
  const oldPrice = Math.trunc(price);

  return (
    <li>
      <Link
        href={`store/${category}/${slug}`}
        className={clsx(
          'flex h-36 gap-4 border-b border-b-slate-100 p-6',
          className
        )}
      >
        <Image
          className="h-24 w-24 rounded-lg object-cover"
          src={images[0].url}
          alt={images[0].alternativeText}
          {...limitImageSize(images[0], 96)}
          blurDataURL={images[0].blurDataURL}
          placeholder="blur"
        />
        <div className="flex h-full flex-1 flex-col justify-around text-label-base-500">
          <span>{title}</span>
          <div className="flex items-center gap-1 font-secondary text-label-sm-600">
            <span>{`$${newPrice}`}</span>
            {discount > 0 && (
              <Fragment>
                <span className="text-slate-400">{'·'}</span>
                <span className="text-slate-400 line-through">{`$${oldPrice}`}</span>
              </Fragment>
            )}
          </div>
        </div>
        <div className=" flex flex-col justify-around">
          <IconButton
            icon={TrashIcon}
            onClick={(e) => preventRouting(e, onDelete.bind(null, id))}
          />
          <IconButton
            icon={ShoppingCartIcon}
            onClick={(e) =>
              preventRouting(e, onAddToCart.bind(null, product, 1))
            }
          />
        </div>
      </Link>
    </li>
  );
}
