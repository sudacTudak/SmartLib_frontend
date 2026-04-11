import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@smartlib/ui', '@smartlib/api-client'],
};

export default nextConfig;
