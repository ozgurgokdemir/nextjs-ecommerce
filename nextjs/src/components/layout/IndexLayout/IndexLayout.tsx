import type { ReactNode } from 'react';
import { Fragment } from 'react';
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import { Footer, Header, NavBar, StoreNav } from '@/components/common';

type IndexLayoutProps = { children: ReactNode };

export default function IndexLayout({ children }: IndexLayoutProps) {
  return (
    <Fragment>
      <Header
        nav={{ icon: ShoppingBagIcon, link: '/' }}
        cta={{ icon: MagnifyingGlassIcon, onClick: () => undefined }}
      />
      <StoreNav />
      {children}
      <Footer />
      <NavBar />
    </Fragment>
  );
}
