import '@/styles/globals.css';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Fragment, useEffect } from 'react';
import { Inter, Poppins } from 'next/font/google';
import { AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/store';

type PageLayout = ({ children }: { children: ReactNode }) => JSX.Element;

type NextPageWithLayout = NextPage & { PageLayout?: PageLayout };

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout };

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
const poppins = Poppins({
  weight: ['500', '600'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const Fonts = () => (
  <style jsx global>{`
    :root {
      --font-inter: ${inter.style.fontFamily};
      --font-poppins: ${poppins.style.fontFamily};
      font-family: var(--font-inter), ui-sans-serif;
    }
  `}</style>
);

function getLayout(page: ReactElement, Layout?: PageLayout) {
  return Layout ? <Layout>{page}</Layout> : page;
}

export default function App({
  Component,
  pageProps,
  router,
}: AppPropsWithLayout) {
  const { syncStoredCart } = useCartStore();

  useEffect(syncStoredCart, [syncStoredCart]);

  return (
    <Fragment>
      <Fonts />
      <AnimatePresence initial={false} mode="wait">
        <div
          className={`${inter.variable} ${poppins.variable} font-primary`}
          key={router.asPath}
        >
          {getLayout(<Component {...pageProps} />, Component.PageLayout)}
        </div>
      </AnimatePresence>
    </Fragment>
  );
}
