import type { OverrideProps, Icon } from '@/lib/types';
import { forwardRef, type ComponentProps } from 'react';
import Link from 'next/link';
import { buttonStyles } from '../Button';

type LinkButtonProps = OverrideProps<
  ComponentProps<typeof Link>,
  {
    text: string;
    size?: 'medium' | 'large';
    variant?: 'primary' | 'secondary';
    icon?: Icon;
  }
>;

export default forwardRef<HTMLAnchorElement, LinkButtonProps>(
  function LinkButton(
    {
      text,
      size = 'large',
      variant = 'primary',
      icon: Icon,
      className,
      ...restProps
    },
    ref
  ) {
    return (
      <Link
        ref={ref}
        className={buttonStyles({ variant, size, className })}
        {...restProps}
      >
        {text}
        {Icon && <Icon className={size === 'medium' ? 'h-4' : 'h-5'} />}
      </Link>
    );
  }
);
