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

export default function NavBar() {
  const { pathname } = useRouter();

  return (
    <nav className="fixed bottom-0 inset-x-0 h-[4.5rem] flex shadow-stroke-t bg-white sm:hidden">
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
        {pathname === '/store' ? (
          <Squares2X2IconSolid className="h-6" />
        ) : (
          <Squares2X2IconOutline className="h-6" />
        )}
      </Link>
      <Link
        className="h-full flex-1 flex items-center justify-center"
        href="/cart"
      >
        {pathname === '/cart' ? (
          <ShoppingCartIconSolid className="h-6" />
        ) : (
          <ShoppingCartIconOutline className="h-6" />
        )}
      </Link>
      <Link
        className="h-full flex-1 flex items-center justify-center"
        href="/wishlist"
      >
        {pathname === '/wishlist' ? (
          <HeartIconSolid className="h-6" />
        ) : (
          <HeartIconOutline className="h-6" />
        )}
      </Link>
      <Link
        className="h-full flex-1 flex items-center justify-center"
        href="/account"
      >
        {pathname === '/account' ? (
          <UserIconSolid className="h-6" />
        ) : (
          <UserIconOutline className="h-6" />
        )}
      </Link>
    </nav>
  );
}
