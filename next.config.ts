import type { NextConfig } from "next";
import "@/lib/env";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    typedRoutes: true,
    cacheComponents: true,
    serverExternalPackages: ["pg"],
    experimental: {
        optimizePackageImports: ["lucide-react"],
    },
};

export default nextConfig;
