import '@/styles/globals.css';
import { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import { Inter, Poppins } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { AnimatePresence } from 'framer-motion';

type PageLayout = ({ children }: { children: ReactNode }) => JSX.Element;

type NextPageWithLayout = NextPage & { PageLayout?: PageLayout };

type AppPropsWithLayout = AppProps<{ session: Session }> & {
  Component: NextPageWithLayout;
};

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

export default function App(props: AppPropsWithLayout) {
  const {
    Component,
    pageProps: { session, ...pageProps },
    router,
  } = props;

  return (
    <SessionProvider session={session}>
      <Fonts />
      <AnimatePresence initial={false} mode="wait">
        <div
          className={`${inter.variable} ${poppins.variable} font-primary`}
          key={router.asPath}
        >
          {getLayout(<Component {...pageProps} />, Component.PageLayout)}
        </div>
      </AnimatePresence>
    </SessionProvider>
  );
}
