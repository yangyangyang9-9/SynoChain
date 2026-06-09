import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.paypal.com https://*.paypalobjects.com https://www.paypalobjects.com",
              "style-src 'self' 'unsafe-inline' https://*.paypal.com https://*.paypalobjects.com",
              "frame-src https://*.paypal.com https://*.paypalobjects.com https://www.paypal.com",
              "img-src 'self' data: https://*.paypal.com https://*.paypalobjects.com https://www.paypalobjects.com",
              "connect-src 'self' https://*.paypal.com https://*.paypalobjects.com https://api-m.paypal.com https://api-m.sandbox.paypal.com",
              "font-src 'self' data:",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;