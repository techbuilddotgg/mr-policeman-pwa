import pwa from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
  experimental: {
    typedRoutes: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/map',
        permanent: true,
      },
    ];
  },
};

const withPWA = pwa({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

export default withPWA(nextConfig);
