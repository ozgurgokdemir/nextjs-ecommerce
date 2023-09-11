import type { OverrideProps, Icon } from '@/lib/types';
import { forwardRef, type ComponentProps } from 'react';
import Link from 'next/link';
import { buttonStyles } from '../Button';

type LinkButtonProps = OverrideProps<
  ComponentProps<typeof Link>,
  {
    text: string;
    variant?: 'primary' | 'secondary';
    size?: 'medium' | 'large';
    icon?: Icon;
  }
>;

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      text,
      variant = 'primary',
      size = 'large',
      icon: Icon,
      className,
      ...restProps
    },
    ref
  ) => {
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

LinkButton.displayName = 'LinkButton';

export default LinkButton;
