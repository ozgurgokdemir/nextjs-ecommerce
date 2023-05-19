import Link from 'next/link';
import { clsx } from 'clsx';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

type ListItemProps = {
  href: string;
  text: string;
  typeahead?: string;
  size?: 'medium' | 'large';
  className?: string;
};

function ListItemContent(props: ListItemProps) {
  const { href, text, typeahead, size = 'medium', className } = props;

  return (
    <Link
      className={clsx(
        'flex items-center justify-between px-6',
        size === 'medium' ? 'h-16' : 'h-20',
        className
      )}
      href={href}
    >
      <div
        className={clsx(
          'flex items-center',
          size === 'medium' ? 'text-label-sm-500' : 'text-label-base-600'
        )}
      >
        <span>{text}</span>
        {typeahead && <b className="font-bold">{typeahead}</b>}
      </div>
      <ChevronRightIcon className="h-5 text-slate-400" />
    </Link>
  );
}

export default function ListItem(props: ListItemProps) {
  return (
    <li className="bg-white shadow-stroke-b transition-colors hover:bg-slate-50">
      <ListItemContent {...props} />
    </li>
  );
}

ListItem.Content = ListItemContent;
