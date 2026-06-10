import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.56.1'],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.56.1',
        port: '9000',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;