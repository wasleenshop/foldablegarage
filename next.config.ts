import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },
  experimental: {
    optimizePackageImports: ['framer-motion', '@supabase/supabase-js'],
  },
};

export default nextConfig;
