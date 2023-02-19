import '@/styles/globals.css';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Inter, Poppins } from '@next/font/google';
import { Fragment } from 'react';

type PageLayout = ({ children }: { children: ReactNode }) => JSX.Element;

type NextPageWithLayout = NextPage & { PageLayout?: PageLayout };

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout };

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ weight: ['500', '600'], subsets: ['latin'] });

function getLayout(page: ReactElement, Layout?: PageLayout) {
  return Layout ? <Layout>{page}</Layout> : page;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <Fragment>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
          --font-poppins: ${poppins.style.fontFamily};
        }
      `}</style>
      {getLayout(<Component {...pageProps} />, Component.PageLayout)}
    </Fragment>
  );
}
