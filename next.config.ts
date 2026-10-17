import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the old routes from the first version of the site working.
  async redirects() {
    return [
      { source: "/products", destination: "/menu", permanent: true },
      { source: "/products/:slug", destination: "/menu", permanent: true },
      { source: "/about", destination: "/heritage", permanent: true },
    ];
  },
};

export default nextConfig;
