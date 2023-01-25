// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  compress: true,
  images: {
    domains: [
      'cdn.dev.immelman.ru',
      'vobaza-dev-public.s3.us-west-000.backblazeb2.com',
      'vobaza-vobaza-demo-public.s3.us-west-000.backblazeb2.com',
      'cdn.vobaza.ru:9000',
      'cdn.vobaza.ru',
      'contenttest.vobaza.ru',
    ],
  },
};

module.exports = withBundleAnalyzer(config);
