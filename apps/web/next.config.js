/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tina outputs the CMS to public/admin/index.html; Next does not serve
  // directory indexes at /admin, so redirect to the static entry.
  async redirects() {
    return [
      {
        source: "/adminPanel",
        destination: "/adminPanel/index.html",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
