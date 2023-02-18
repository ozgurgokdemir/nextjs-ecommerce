import type { ReactNode, ComponentType, SVGProps } from 'react';
import Link from 'next/link';
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import { IconButton } from '@/components/ui';

type Navigation = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  link: string;
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

function CTA({ cta }: { cta: CallToAction | undefined }) {
  if (!cta)
    return (
      <div className="p-6">
        <div className="w-6 h-6"></div>
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
  const { icon: NavIcon, link } = nav;

  return (
    <header className="bg-white shadow-stroke-b">
      <div className="flex items-center justify-between sm:hidden">
        <Link className="p-6" href={link}>
          {<NavIcon className="h-6" />}
        </Link>
        {children}
        {!children && <span className="text-label-base-600">{label}</span>}
        {!children && <CTA cta={cta} />}
      </div>
      <div className="h-24 container hidden sm:flex items-center justify-between">
        <Link className="flex gap-3" href="/">
          <ShoppingBagIcon className="h-7" />
          <span className="font-secondary text-heading-2xl">eCommerce</span>
        </Link>
        <nav className="flex gap-4">
          <button
            type="button"
            className="w-60 h-12 rounded-lg flex items-center justify-between px-3 text-slate-400 bg-slate-100 hover:bg-slate-50 transition-colors"
          >
            <p className="text-label-base-600">Search</p>
            <MagnifyingGlassIcon className="h-6" />
          </button>
          <IconButton icon={ShoppingCartIcon} size="large" />
          <IconButton icon={UserIcon} size="large" />
        </nav>
      </div>
    </header>
  );
}
