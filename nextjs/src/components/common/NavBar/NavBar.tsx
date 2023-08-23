'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon as HomeIconOutline,
  Squares2X2Icon as Squares2X2IconOutline,
  ShoppingCartIcon as ShoppingCartIconOutline,
  HeartIcon as HeartIconOutline,
  UserIcon as UserIconOutline,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  Squares2X2Icon as Squares2X2IconSolid,
  ShoppingCartIcon as ShoppingCartIconSolid,
  HeartIcon as HeartIconSolid,
  UserIcon as UserIconSolid,
} from '@heroicons/react/24/solid';
import { CartCounter } from '@/components/cart';

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex h-[4.5rem] bg-white shadow-stroke-t sm:hidden">
      <Link className="flex h-full flex-1 items-center justify-center" href="/">
        {pathname === '/' ? (
          <HomeIconSolid className="h-6" />
        ) : (
          <HomeIconOutline className="h-6" />
        )}
      </Link>
      <Link
        className="flex h-full flex-1 items-center justify-center"
        href="/store"
      >
        {pathname.startsWith('/store') ? (
          <Squares2X2IconSolid className="h-6" />
        ) : (
          <Squares2X2IconOutline className="h-6" />
        )}
      </Link>
      <Link
        className="relative flex h-full flex-1 items-center justify-center"
        href="/cart"
      >
        {pathname.startsWith('/cart') ? (
          <ShoppingCartIconSolid className="h-6" />
        ) : (
          <ShoppingCartIconOutline className="h-6" />
        )}
        <CartCounter className="right-[calc(50%_-_1.5rem)] top-3" />
      </Link>
      <Link
        className="flex h-full flex-1 items-center justify-center"
        href="/wishlist"
      >
        {pathname.startsWith('/wishlist') ? (
          <HeartIconSolid className="h-6" />
        ) : (
          <HeartIconOutline className="h-6" />
        )}
      </Link>
      <Link
        className="flex h-full flex-1 items-center justify-center"
        href="/account"
      >
        {pathname.startsWith('/account') ? (
          <UserIconSolid className="h-6" />
        ) : (
          <UserIconOutline className="h-6" />
        )}
      </Link>
    </nav>
  );
}
