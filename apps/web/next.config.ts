import type { NextConfig } from 'next';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sharedPackagesSrc = path.join(__dirname, '../../shared-packages/src');
const srcRoot = path.join(__dirname, 'src');

const nextConfig: NextConfig = {
  transpilePackages: ['@smartlib/shared-packages'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      src: srcRoot,
      '@shared-packages': sharedPackagesSrc,
    };
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
    remotePatterns: [{
      protocol: 'https',
      hostname: 'placehold.co',
    }],
  }
};

export default nextConfig;
