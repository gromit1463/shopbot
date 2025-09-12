import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
	/* config options here */
	output: 'export', // Enables static export
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
	// Important: Disable server-side features
	generateBuildId: () => 'build',
	turbopack: {
		root: path.join(process.cwd(), '../..'),
	},
	devIndicators: false,
}

export default nextConfig
