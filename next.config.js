/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com', 'picsum.photos'],
  },
}

module.exports = withPWA(nextConfig)
