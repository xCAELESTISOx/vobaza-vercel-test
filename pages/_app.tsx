import NextNProgress from 'nextjs-progressbar';
import type { AppProps } from 'next/app';

import 'app/styles/normalize.scss';
import 'react-calendar/dist/Calendar.css';
import 'rc-tooltip/assets/bootstrap.css';
import 'app/styles/globals.scss';
import 'app/styles/Lightbox.css';
import 'app/styles/Inter.font.scss';
import 'swiper/scss';

import Layout from '../app/ui/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="var(--primary-color)" options={{ showSpinner: false }} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
