import type { OverrideProps, Icon } from '@/lib/types';
import { forwardRef, type ComponentProps } from 'react';
import { iconButtonStyles } from './IconButton.styles';
import Spinner from '../Spinner';

type IconButtonProps = OverrideProps<
  Omit<ComponentProps<'button'>, 'children'>,
  {
    icon: Icon;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    isLoading?: boolean;
  }
>;

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon: Icon,
      variant = 'secondary',
      size = 'medium',
      isLoading = false,
      type = 'button',
      disabled,
      className,
      ...restProps
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={iconButtonStyles({ variant, size, className })}
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
);

IconButton.displayName = 'IconButton';

export default IconButton;
