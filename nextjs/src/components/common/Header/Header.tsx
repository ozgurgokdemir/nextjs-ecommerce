import type { ReactNode, ComponentType, SVGProps } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { UserMenu } from '@/components/ui';
import { SearchButton, SearchModal } from '@/components/search';
import { CartButton, CartModal } from '@/components/cart';
import { AuthModal } from '@/components/auth';

type Navigation = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  url?: string;
  navigateBack?: boolean;
};

type CallToAction = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  onClick: () => void;
};

type HeaderProps = {
  nav: Navigation;
  cta?: CallToAction;
  label?: string;
  children?: ReactNode;
};

function CTA({ cta }: { cta?: CallToAction }) {
  if (!cta)
    return (
      <div className="p-6">
        <div className="h-6 w-6"></div>
      </div>
    );

  const { icon: Icon, onClick } = cta;

  return (
    <button className="p-6" type="button" onClick={onClick}>
      <Icon className="h-6" />
    </button>
  );
}

export default function Header(props: HeaderProps) {
  const { nav, cta, label, children } = props;
  const { icon: NavIcon, url, navigateBack } = nav;

  const router = useRouter();

  const handleNavigation = () => {
    if (navigateBack) router.back();
    else if (url) void router.push(url);
  };

  return (
    <header className="sticky inset-x-0 top-0 z-40 bg-white shadow-stroke-b">
      <div className="flex items-center justify-between sm:hidden">
        <button className="p-6" type="button" onClick={handleNavigation}>
          {<NavIcon className="h-6" />}
        </button>
        {children}
        {!children && <span className="text-label-base-600">{label}</span>}
        {!children && <CTA cta={cta} />}
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
