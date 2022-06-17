import type { AppProps } from 'next/app';
import 'react-calendar/dist/Calendar.css';
import '../styles/globals.css';
import '../styles/Lightbox.css';

// Import Swiper styles
import 'swiper/scss';

import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
