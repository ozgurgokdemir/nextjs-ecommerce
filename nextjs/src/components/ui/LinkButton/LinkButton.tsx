import type { ComponentType, SVGProps } from 'react';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import { clsx } from 'clsx';

type LinkButtonProps = LinkProps & {
  text: string;
  size?: 'medium' | 'large';
  variant?: 'primary' | 'secondary';
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
};

export default function LinkButton(props: LinkButtonProps) {
  const {
    text,
    size = 'large',
    variant = 'primary',
    icon: Icon,
    className,
    ...restProps
  } = props;

  return (
    <Link
      className={clsx(
        'flex items-center justify-center px-6 rounded-lg font-primary whitespace-nowrap transition',
        size === 'medium'
          ? 'h-9 gap-2 text-label-sm-500'
          : 'h-12 gap-3 text-label-base-500',
        variant === 'primary'
          ? 'text-slate-50 bg-slate-800 hover:bg-slate-700'
          : 'text-slate-800 bg-slate-100 hover:bg-slate-50',
        className
      )}
      {...restProps}
    >
      {text}
      {Icon && <Icon className={size === 'medium' ? 'h-4' : 'h-5'} />}
    </Link>
  );
}
