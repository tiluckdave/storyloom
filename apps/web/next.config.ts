import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [new URL("https://images.unsplash.com/**")],
		unoptimized: true,
	},
};

export default nextConfig;
