import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/gtfsrealtime',
        destination: `https://gtfsapi.translink.ca/v3/gtfsrealtime?apikey=${process.env.NEXT_PUBLIC_TRANSLINK_API_KEY}`,
      },
      {
        source: '/gtfsposition',
        destination: `https://gtfsapi.translink.ca/v3/gtfsposition?apikey=${process.env.NEXT_PUBLIC_TRANSLINK_API_KEY}`,
      },
      {
        source: '/gtfsalerts',
        destination: `https://gtfsapi.translink.ca/v3/gtfsalerts?apikey=${process.env.NEXT_PUBLIC_TRANSLINK_API_KEY}`,
      },
    ]
  },
};

export default nextConfig;
