import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  serverExternalPackages: ["drizzle-orm", "pg"],
};

export default nextConfig;
