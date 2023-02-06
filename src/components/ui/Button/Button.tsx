import type { ButtonHTMLAttributes, ComponentType, SVGProps } from 'react';
import { clsx } from 'clsx';

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
        'flex items-center justify-center px-6 rounded-lg font-medium whitespace-nowrap transition',
        size === 'medium' ? 'h-9 gap-2 text-sm' : 'h-12 gap-3 text-base',
        variant === 'primary'
          ? 'text-slate-50 bg-slate-800 hover:bg-slate-700'
          : 'text-slate-800 bg-slate-100 hover:bg-slate-50',
        (disabled || isLoading) && 'cursor-not-allowed',
        className
      )}
      type={type}
      {...restProps}
    >
      {isLoading && loadingText ? loadingText : text}
      {isLoading ? (
        <svg
          className="h-5 w-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="text-slate-600"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="text-slate-50"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        Icon && <Icon className={size === 'medium' ? 'h-4' : 'h-5'} />
      )}
    </button>
  );
}
