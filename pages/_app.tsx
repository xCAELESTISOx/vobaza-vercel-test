import NextNProgress from 'nextjs-progressbar';
import type { AppProps } from 'next/app';

import 'react-calendar/dist/Calendar.css';
import 'rc-tooltip/assets/bootstrap.css';
import '../styles/globals.scss';
import '../styles/Lightbox.css';

// Import Swiper styles
import 'swiper/scss';

import Layout from '../components/Layout';

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
