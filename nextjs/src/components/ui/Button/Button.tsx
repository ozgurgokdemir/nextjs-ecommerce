import type { ComponentProps, ComponentType, SVGProps } from 'react';
import type { OverrideProps, AllOrNothing } from '@/lib/types/helpers';
import { buttonVariants } from './variants';
import Spinner from '../Spinner';

type ButtonProps = OverrideProps<
  Omit<ComponentProps<'button'>, 'children'>,
  {
    text: string;
    variant?: 'primary' | 'secondary';
    size?: 'medium' | 'large';
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
  } & AllOrNothing<{
    isLoading: boolean;
    loadingText?: string;
  }>
>;

export default function Button(props: ButtonProps) {
  const {
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
  } = props;

  return (
    <button
      className={buttonVariants({ variant, size, className })}
      type={type}
      disabled={disabled || isLoading}
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
