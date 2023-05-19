import type { ButtonHTMLAttributes, ComponentType, SVGProps } from 'react';
import { clsx } from 'clsx';
import { Spinner } from '@/components/ui';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
};

export default function IconButton(props: IconButtonProps) {
  const {
    icon: Icon,
    size = 'medium',
    variant = 'secondary',
    type = 'button',
    disabled,
    isLoading,
    className,
    ...restProps
  } = props;

  return (
    <button
      className={clsx(
        'flex items-center justify-center transition',
        size === 'small'
          ? 'h-6 w-6 rounded-md'
          : size === 'medium'
          ? 'h-9 w-9 rounded-lg'
          : 'h-12 w-12 rounded-lg',
        variant === 'primary'
          ? 'bg-slate-800 text-slate-100 hover:bg-slate-700'
          : 'bg-slate-100 text-slate-400 hover:bg-slate-50',
        (disabled || isLoading) && 'cursor-not-allowed',
        className
      )}
      type={type}
      {...restProps}
    >
      {isLoading ? (
        <Spinner
          size={size === 'large' ? 'large' : 'medium'}
          variant={variant}
        />
      ) : (
        <Icon
          className={
            size === 'small' ? 'h-4' : size === 'medium' ? 'h-5' : 'h-6'
          }
        />
      )}
    </button>
  );
}
