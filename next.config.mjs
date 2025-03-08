/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
    images: {
      remotePatterns:[
      {
        hostname:"images.pexels.com",
      }
    ],
    domains: [
      "img.daisyui.com",
      "assets.vogue.com",
      "m.media-amazon.com",
      "upload.wikimedia.org",
    ],
  },
};

export default nextConfig;
