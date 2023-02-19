import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { Header, NavBar } from '@/components/common';
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';

type IndexLayoutProps = { children: ReactNode };

export default function IndexLayout({ children }: IndexLayoutProps) {
  return (
    <Fragment>
      <Header
        nav={{ icon: ShoppingBagIcon, link: '/' }}
        cta={{ icon: MagnifyingGlassIcon, onClick: () => undefined }}
      />
      {children}
      <NavBar />
    </Fragment>
  );
}
