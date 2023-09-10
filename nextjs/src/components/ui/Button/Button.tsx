import type { OverrideProps, Icon } from '@/lib/types';
import { forwardRef, type ComponentProps } from 'react';
import { buttonStyles } from './Button.styles';
import Spinner from '../Spinner';

type ButtonProps = OverrideProps<
  Omit<ComponentProps<'button'>, 'children'>,
  {
    text: string;
    variant?: 'primary' | 'secondary';
    size?: 'medium' | 'large';
    isLoading?: boolean;
    loadingText?: string;
    icon?: Icon;
  }
>;

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    text,
    variant = 'primary',
    size = 'large',
    isLoading,
    loadingText,
    icon: Icon,
    type = 'button',
    disabled,
    className,
    ...restProps
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={buttonStyles({ variant, size, className })}
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
});
