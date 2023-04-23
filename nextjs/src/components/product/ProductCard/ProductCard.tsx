import type { MouseEvent } from 'react';
import type { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { clsx } from 'clsx';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { IconButton } from '@/components/ui';
import { useCartStore } from '@/lib/store';

type ProductCardProps = {
  product: Product;
  className?: string;
};

export default function ProductCard({ product, className }: ProductCardProps) {
  const { title, price, discount, images, category, slug } = product;

  const { addToCart } = useCartStore();

  const discountAmount = price * (discount / 100);
  const newPrice = Math.trunc(price - discountAmount);
  const oldPrice = Math.trunc(price);

  const url = `/store/${category}/${slug}`;

  const preventRouting = (event: MouseEvent, callback: () => void) => {
    event.preventDefault();
    event.stopPropagation();
    callback();
  };

  return (
    <Link
      className={clsx(
        'flex gap-4 p-6 sm:p-0 sm:flex-col sm:gap-0 sm:rounded-lg sm:overflow-hidden sm:border sm:border-slate-100',
        className
      )}
      href={url}
    >
      <Image
        className="w-24 h-24 rounded-lg object-cover sm:w-full sm:h-auto sm:rounded-none sm:aspect-4/3"
        src={images[0].url}
        alt={images[0].alternativeText}
        width={290}
        height={290}
      />
      <div className="flex-1 flex flex-col justify-between sm:flex-none sm:gap-3 sm:p-6 sm:justify-start">
        <h5 className="text-label-lg-500 sm:text-label-xl-500">{title}</h5>
        <div className="flex items-center gap-1 font-secondary text-label-sm-600">
          <span>{`$${newPrice}`}</span>
          {discount > 0 && (
            <Fragment>
              <span className="text-slate-400">{'·'}</span>
              <span className="text-slate-400">{`$${oldPrice}`}</span>
            </Fragment>
          )}
        </div>
        <div className="flex gap-3 sm:hidden">
          <IconButton className="flex-1" icon={HeartIcon} />
          <IconButton
            className="flex-1"
            icon={ShoppingCartIcon}
            onClick={(e) => preventRouting(e, addToCart.bind(null, product, 1))}
          />
        </div>
      </div>
    </Link>
  );
}
