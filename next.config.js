/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "m.media-amazon.com",
      "images.unsplash.com",
      "yt3.ggpht.com",
      "i.ytimg.com",
    ],
  },
};

module.exports = nextConfig;
