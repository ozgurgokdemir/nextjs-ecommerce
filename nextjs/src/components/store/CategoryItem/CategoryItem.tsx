import type { Category } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { limitImageSize } from '@/lib/utils';

type CategoryItemProps = {
  category: Category;
};

export default function CategoryItem({ category }: CategoryItemProps) {
  const { title, image, slug } = category;

  return (
    <Link
      className="flex h-24 items-center justify-between px-6"
      href={`/store/${slug}`}
    >
      <div className="flex items-center gap-6">
        <div className="relative h-12 w-12 overflow-hidden rounded-lg">
          <Image
            className="h-full w-full object-cover"
            src={image.url}
            alt={image.alternativeText}
            {...limitImageSize(image, 96)}
            blurDataURL={image.blurDataURL}
            placeholder="blur"
          />
        </div>
        <span className="text-label-base-600">{title}</span>
      </div>
      <ChevronRightIcon className="h-5 text-slate-400" />
    </Link>
  );
}
