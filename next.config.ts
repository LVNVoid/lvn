import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'elviencode.vercel.app',
          },
        ],
        destination: 'https://elvien.net/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
