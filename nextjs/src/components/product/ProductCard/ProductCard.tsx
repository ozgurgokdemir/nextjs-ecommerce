import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { clsx } from 'clsx';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { IconButton } from '@/components/ui';

type ProductCardProps = {
  title: string;
  price: number;
  discount: number;
  image: string;
  imageAlt: string;
  slug: string;
  className?: string;
};

export default function ProductCard(props: ProductCardProps) {
  const { title, price, discount, image, imageAlt, slug, className } = props;

  const discountAmount = price * (discount / 100);
  const newPrice = Math.trunc(price - discountAmount);
  const oldPrice = Math.trunc(price);

  return (
    <Link
      className={clsx(
        'flex gap-4 p-6 bg-white border-b border-slate-100',
        'sm:flex-col sm:gap-0 sm:p-0 sm:border sm:rounded-lg sm:overflow-hidden',
        className
      )}
      href={`/store/${slug}`}
    >
      <Image
        className="w-24 h-24 rounded-lg object-cover sm:w-full sm:h-auto sm:rounded-none sm:aspect-4/3"
        src={image}
        alt={imageAlt}
        width={290}
        height={290}
      />
      <div className="flex-1 flex flex-col justify-between sm:flex-none sm:gap-3 sm:p-6 sm:justify-start">
        <h5 className="text-label-base-500 sm:text-label-xl-500">{title}</h5>
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
          <IconButton className="flex-1" icon={ShoppingCartIcon} />
        </div>
      </div>
    </Link>
  );
}
