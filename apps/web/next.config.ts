import type { NextConfig } from 'next';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sharedPackagesSrc = path.join(__dirname, '../../shared-packages/src');
const srcRoot = path.join(__dirname, 'src');

const nextConfig: NextConfig = {
  transpilePackages: ['@smartlib/shared-packages'],
  webpack: (config, { dev, isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      src: srcRoot,
      '@shared-packages': sharedPackagesSrc,
    };

    // pdfjs-dist + eval-* devtool → Object.defineProperty called on non-object
    if (dev && !isServer) {
      config.devtool = 'source-map';
    }

    return config;
  },
  experimental: {
    turbo: {
      resolveAlias: {
        src: srcRoot,
        '@shared-packages': sharedPackagesSrc,
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
      },
    ],
  },
};

export default nextConfig;
