import type { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

type MenuItemProps = {
  text: string;
  size?: 'medium' | 'large';
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export default function MenuItem(props: MenuItemProps) {
  const { text, size = 'medium', className, disabled, ...restProps } = props;

  return (
    <button
      className={clsx(
        'flex w-full items-center justify-between px-6',
        size === 'medium' ? 'h-16' : 'h-20',
        disabled && 'opacity-50',
        className
      )}
      disabled={disabled}
      {...restProps}
    >
      <div
        className={clsx(
          'flex items-center',
          size === 'medium' ? 'text-label-base-500' : 'text-label-base-600'
        )}
      >
        {text}
      </div>
      <ChevronRightIcon className="h-5 text-slate-400" />
    </button>
  );
}
