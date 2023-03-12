import Image from 'next/image';
import { clsx } from 'clsx';
import { TrashIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { IconButton } from '@/components/ui';

type WishlistItemProps = {
  title: string;
  price: string;
  image: string;
  imageAlt: string;
  className?: string;
};

export default function WishlistItem(props: WishlistItemProps) {
  const { title, price, image, imageAlt, className } = props;

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
      <div className="flex-1 flex flex-col justify-around h-full text-label-base-500">
        <span>{title}</span>
        <span className="font-secondary">{'$' + price}</span>
      </div>
      <div className=" flex flex-col justify-around">
        <IconButton icon={TrashIcon} />
        <IconButton icon={ShoppingCartIcon} />
      </div>
    </div>
  );
}
