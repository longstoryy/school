/** @type {import('next').NextConfig} */
const nextConfig = {
  // Environment variables for runtime
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'your-secret-key',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    NEXTAUTH_URL_INTERNAL: process.env.NEXTAUTH_URL_INTERNAL || 'http://localhost:3000',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
  // For Docker support
  output: 'standalone',
  // Enable strict mode for better performance
  reactStrictMode: true,
  // Enable SWC minification for better performance
  swcMinify: true,
  // Optimize images
  images: {
    domains: ['localhost', '127.0.0.1'],
    unoptimized: true
  },
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@headlessui/react'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    // Enable faster navigation
    appDir: true,
    serverComponentsExternalPackages: [],
  },
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Reduce bundle size in production
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': require('path').resolve(__dirname),
      };
    }
    return config;
  },
};

module.exports = nextConfig;
