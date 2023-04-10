import type { Category } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

type CategoryItemProps = {
  category: Category;
};

export default function CategoryItem({ category }: CategoryItemProps) {
  const { title, image, slug } = category;

  return (
    <Link
      className="h-24 flex items-center justify-between px-6"
      href={`/store/${slug}`}
    >
      <div className="flex items-center gap-6">
        <Image
          className="w-12 h-12 rounded-lg object-cover"
          src={image.url}
          alt={image.alternativeText}
          width={48}
          height={48}
        />
        <span className="text-label-base-600">{title}</span>
      </div>
      <ChevronRightIcon className="h-5 text-slate-400" />
    </Link>
  );
}
