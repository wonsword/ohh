import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'build-cache',
  outputFileTracingRoot: appRoot,
  turbopack: {
    root: appRoot
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;
