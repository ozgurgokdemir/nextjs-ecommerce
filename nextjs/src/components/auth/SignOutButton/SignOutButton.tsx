'use client';
import type { ComponentProps } from 'react';
import { signOut } from 'next-auth/react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui';

type SignOutButtonProps = ComponentProps<typeof Button> & {
  showIcon?: true;
  icon?: never;
  onClick?: never;
};

export default function SignOutButton(props: SignOutButtonProps) {
  const { showIcon, ...restProps } = props;
  return (
    <Button
      {...restProps}
      icon={showIcon ? ArrowRightOnRectangleIcon : undefined}
      onClick={() => void signOut()}
    />
  );
}
