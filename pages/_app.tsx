import NextNProgress from 'nextjs-progressbar';
import type { AppProps } from 'next/app';
import Script from 'next/script';

import 'app/styles/normalize.scss';
import 'react-calendar/dist/Calendar.css';
import 'rc-tooltip/assets/bootstrap.css';
import 'app/styles/globals.scss';
import 'swiper/scss';
import 'app/styles/callibri.scss';

import Layout from '../app/ui/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="var(--primary-color)" options={{ showSpinner: false }} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Script src="//cdn.callibri.ru/callibri.js" type="text/javascript" charSet="utf-8" />
    </>
  );
}

export default MyApp;
