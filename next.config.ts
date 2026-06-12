import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Runs as a Node server on Railway (`next start`). No `output: "export"` —
  // that produced a static `out/` for Cloudflare and is incompatible with `next start`.
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
