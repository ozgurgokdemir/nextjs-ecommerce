import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter, Poppins } from '@next/font/google';
import { Fragment } from 'react';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ weight: ['500', '600'], subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
          --font-poppins: ${poppins.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </Fragment>
  );
}
