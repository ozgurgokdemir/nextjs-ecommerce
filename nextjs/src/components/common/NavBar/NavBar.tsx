import Link from 'next/link';
import { useRouter } from 'next/router';
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
  const { pathname } = useRouter();

  return (
    <nav className="fixed z-40 bottom-0 inset-x-0 h-[4.5rem] flex shadow-stroke-t bg-white sm:hidden">
      <Link className="h-full flex-1 flex items-center justify-center" href="/">
        {pathname === '/' ? (
          <HomeIconSolid className="h-6" />
        ) : (
          <HomeIconOutline className="h-6" />
        )}
      </Link>
      <Link
        className="h-full flex-1 flex items-center justify-center"
        href="/store"
      >
        {pathname.startsWith('/store') ? (
          <Squares2X2IconSolid className="h-6" />
        ) : (
          <Squares2X2IconOutline className="h-6" />
        )}
      </Link>
      <Link
        className="h-full relative flex-1 flex items-center justify-center"
        href="/cart"
      >
        {pathname.startsWith('/cart') ? (
          <ShoppingCartIconSolid className="h-6" />
        ) : (
          <ShoppingCartIconOutline className="h-6" />
        )}
        <CartCounter className="top-3 right-[calc(50%_-_1.5rem)]" />
      </Link>
      <Link
        className="h-full flex-1 flex items-center justify-center"
        href="/wishlist"
      >
        {pathname.startsWith('/wishlist') ? (
          <HeartIconSolid className="h-6" />
        ) : (
          <HeartIconOutline className="h-6" />
        )}
      </Link>
      <Link
        className="h-full flex-1 flex items-center justify-center"
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
