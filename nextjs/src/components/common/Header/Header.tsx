'use client';
import type { ComponentType, SVGProps, ComponentProps } from 'react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { usePathname, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import { UserMenu } from '@/components/ui';
import { SearchButton, SearchModal } from '@/components/search';
import { CartButton, CartModal } from '@/components/cart';
import { AuthModal } from '@/components/auth';

type CallToAction = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  href?: ComponentProps<typeof Link>['href'];
  onClick?: () => void;
};

type Params = {
  category?: string;
  product?: string;
};

type GetHeader = (
  pathname: string,
  params: Params,
  router: AppRouterInstance
) => {
  title: string;
  left: CallToAction;
  right: CallToAction;
};

const getHeader: GetHeader = (pathname, params, router) => {
  const navigateHome = {
    icon: ShoppingBagIcon,
    href: '/',
  };

  const navigateBack = {
    icon: ChevronLeftIcon,
    onClick: () => router.back(),
  };

  const openSearch = {
    icon: MagnifyingGlassIcon,
    href: { query: { search: '' } },
  };

  const addToWishlist = {
    icon: HeartIcon,
    onClick: () => undefined,
  };

  const defaultHeader = {
    title: '',
    left: navigateHome,
    right: openSearch,
  };

  if (params.product) {
    return {
      title: 'Details',
      left: navigateBack,
      right: addToWishlist,
    };
  }

  if (params.category) {
    return {
      title: params.category.charAt(0).toUpperCase() + params.category.slice(1),
      left: navigateBack,
      right: openSearch,
    };
  }

  if (pathname === '/store') {
    return { ...defaultHeader, title: 'Store' };
  }

  if (pathname === '/cart') {
    return { ...defaultHeader, title: 'Cart' };
  }

  if (pathname === '/wishlist') {
    return { ...defaultHeader, title: 'Wishlist' };
  }

  if (pathname === '/account') {
    return { ...defaultHeader, title: 'Account' };
  }

  return defaultHeader;
};

function HeaderCTA({ icon: Icon, href, onClick }: CallToAction) {
  if (href) {
    return (
      <Link href={href} onClick={onClick} className="p-6">
        <Icon className="h-6" />
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className="p-6">
      <Icon className="h-6" />
    </button>
  );
}

export default function Header() {
  const pathname = usePathname();

  const params = useParams() as Params;

  const router = useRouter();

  const { title, left, right } = getHeader(pathname, params, router);

  return (
    <header className="sticky inset-x-0 top-0 z-40 bg-white shadow-stroke-b">
      <div className="flex items-center justify-between sm:hidden">
        <HeaderCTA {...left} />
        <span className="text-label-base-600">{title}</span>
        <HeaderCTA {...right} />
      </div>
      <div className="container hidden h-24 items-center justify-between sm:flex">
        <Link className="flex gap-3" href="/">
          <ShoppingBagIcon className="h-7" />
          <span className="font-secondary text-heading-2xl">eCommerce</span>
        </Link>
        <nav className="flex gap-4" role="navigation" aria-label="Primary">
          <SearchButton />
          <SearchModal />
          <CartButton />
          <CartModal />
          <UserMenu />
          <AuthModal />
        </nav>
      </div>
    </header>
  );
}
