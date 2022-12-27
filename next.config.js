// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const moduleExports = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
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
  sentry: {
    hideSourceMaps: true,
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
