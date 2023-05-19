import type { ButtonHTMLAttributes, ComponentType, SVGProps } from 'react';
import { clsx } from 'clsx';
import { Spinner } from '@/components/ui';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  text: string;
  size?: 'medium' | 'large';
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  loadingText?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

export default function Button(props: ButtonProps) {
  const {
    text,
    size = 'large',
    variant = 'primary',
    icon: Icon,
    type = 'button',
    disabled,
    isLoading,
    loadingText,
    className,
    ...restProps
  } = props;

  return (
    <button
      className={clsx(
        'flex items-center justify-center whitespace-nowrap rounded-lg px-6 font-primary transition',
        size === 'medium'
          ? 'h-9 gap-2 text-label-sm-500'
          : 'h-12 gap-3 text-label-base-500',
        variant === 'primary'
          ? 'bg-slate-800 text-slate-50 hover:bg-slate-700'
          : 'bg-slate-100 text-slate-800 hover:bg-slate-50',
        (disabled || isLoading) && 'cursor-not-allowed',
        className
      )}
      type={type}
      {...restProps}
    >
      {isLoading && loadingText ? loadingText : text}
      {isLoading ? (
        <Spinner size={size} variant={variant} />
      ) : (
        Icon && <Icon className={size === 'medium' ? 'h-4' : 'h-5'} />
      )}
    </button>
  );
}
