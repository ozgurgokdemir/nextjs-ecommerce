import Link from 'next/link';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';

export default function Footer() {
  return (
    <footer className="hidden bg-slate-900 py-16 sm:block">
      <nav
        className="container flex justify-between text-slate-400"
        role="navigation"
        aria-label="Secondary"
      >
        <div className="flex flex-col gap-4">
          <Link className="flex gap-3 text-slate-100" href="/">
            <ShoppingBagIcon className="h-7" />
            <span className="font-secondary text-heading-2xl font-medium">
              eCommerce
            </span>
          </Link>
          <ul className="ml-0.5 flex flex-1 flex-col gap-2">
            <li>
              <Link
                className="text-label-sm-500 transition-colors hover:text-slate-100"
                href=""
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                className="text-label-sm-500 transition-colors hover:text-slate-100"
                href=""
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                className="text-label-sm-500 transition-colors hover:text-slate-100"
                href=""
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h6 className="text-label-xl-600 text-slate-100">Shop</h6>
          <ul className="ml-0.5 flex flex-col gap-2">
            <li>
              <Link
                className="text-label-sm-500 transition-colors hover:text-slate-100"
                href="/store/laptop"
              >
                Laptop
              </Link>
            </li>
            <li>
              <Link
                className="text-label-sm-500 transition-colors hover:text-slate-100"
                href="/store/smartphone"
              >
                Smartphone
              </Link>
            </li>
            <li>
              <Link
                className="text-label-sm-500 transition-colors hover:text-slate-100"
                href="/store/smartwatch"
              >
                Smartwatch
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h6 className="text-label-xl-600 text-slate-100">Socials</h6>
          <ul className="ml-0.5 flex flex-col gap-2">
            <li>
              <a
                className="text-label-sm-500 transition-colors hover:text-slate-100"
                href="https://www.facebook.com/"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                className="text-label-sm-500 transition-colors hover:text-slate-100"
                href="https://www.instagram.com/"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                className="text-label-sm-500 transition-colors hover:text-slate-100"
                href="https://twitter.com/"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
}
