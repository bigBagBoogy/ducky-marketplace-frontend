/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Link",
            value: '/favicon.ico; rel="icon"',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
