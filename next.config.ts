import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Short version code shown in the footer: Netlify provides COMMIT_REF at build time (Vercel its own variable).
  env: {
    NEXT_PUBLIC_COMMIT_SHA: process.env.COMMIT_REF || process.env.VERCEL_GIT_COMMIT_SHA || "",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
