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
        'flex items-center justify-center whitespace-nowrap rounded-lg px-6 font-primary transition',
        size === 'medium'
          ? 'h-9 gap-2 text-label-sm-500'
          : 'h-12 gap-3 text-label-base-500',
        variant === 'primary'
          ? 'bg-slate-800 text-slate-50 hover:bg-slate-700'
          : 'bg-slate-100 text-slate-800 hover:bg-slate-50',
        className
      )}
      {...restProps}
    >
      {text}
      {Icon && <Icon className={size === 'medium' ? 'h-4' : 'h-5'} />}
    </Link>
  );
}
