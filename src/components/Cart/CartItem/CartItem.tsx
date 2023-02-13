import Image from 'next/image';
import { clsx } from 'clsx';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { IconButton } from '@/components/ui';

type CartItemProps = {
  title: string;
  price: string;
  amount: number;
  image: string;
  imageAlt: string;
  className?: string;
};

export default function CartItem(props: CartItemProps) {
  const { title, price, amount, image, imageAlt, className } = props;

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
            <IconButton icon={PlusIcon} size="small" />
            <span className="w-8 font-secondary text-label-base-600 text-center">
              {amount}
            </span>
            <IconButton icon={MinusIcon} size="small" />
          </div>
        </div>
      </div>
    </div>
  );
}
