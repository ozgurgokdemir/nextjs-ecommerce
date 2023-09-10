'use client';
import type { ComponentProps } from 'react';
import type { OverrideProps } from '@/lib/types';
import { signOut } from 'next-auth/react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui';

type SignOutButtonProps = OverrideProps<
  Omit<ComponentProps<typeof Button>, 'icon' | 'onClick'>,
  { showIcon?: true }
>;

export default function SignOutButton({
  showIcon,
  ...restProps
}: SignOutButtonProps) {
  return (
    <Button
      icon={showIcon ? ArrowRightOnRectangleIcon : undefined}
      onClick={() => void signOut()}
      {...restProps}
    />
  );
}
