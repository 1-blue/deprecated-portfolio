/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "user-images.githubusercontent.com",
      "bleshop.s3.ap-northeast-2.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
