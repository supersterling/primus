import type { NextConfig } from "next";
import "@/lib/env";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    reactCompiler: true,
    typedRoutes: true,
    serverExternalPackages: ["pg"],
    experimental: {
        optimizePackageImports: ["lucide-react"],
        viewTransition: true,
    },
};

export default nextConfig;
