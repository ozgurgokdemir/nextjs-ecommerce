import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

type ListItemProps = {
  href: string;
  text: string;
  typeahead?: string;
  image?: string;
  imageAlt?: string;
  size?: 'medium' | 'large';
};

export default function ListItem(props: ListItemProps) {
  const { href, text, typeahead, image, imageAlt, size = 'medium' } = props;

  return (
    <li>
      <Link
        className={`flex items-center justify-between px-6 bg-white hover:bg-slate-50 border-b border-b-slate-100 transition-colors ${
          size === 'medium' ? 'h-16' : 'h-24'
        }`}
        href={href}
      >
        <div
          className={clsx(
            'flex items-center',
            size === 'medium'
              ? image
                ? 'text-label-sm-600'
                : 'text-label-sm-500'
              : image
              ? 'text-label-base-600'
              : 'text-label-base-500',
            image && 'gap-6'
          )}
        >
          {image && (
            <Image
              className={`rounded-lg ${
                size === 'medium' ? 'w-9 h-9' : 'w-12 h-12'
              }`}
              src={image}
              alt={imageAlt ?? 'list item'}
              width={size === 'medium' ? 36 : 48}
              height={size === 'medium' ? 36 : 48}
            />
          )}
          {typeahead ? (
            <span>
              {text}
              <b className="font-bold">{typeahead}</b>
            </span>
          ) : (
            text
          )}
        </div>
        <ChevronRightIcon className="h-5 text-slate-400" />
      </Link>
    </li>
  );
}
