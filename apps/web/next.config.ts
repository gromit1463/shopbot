import type { NextConfig } from 'next'
const path = require('path')

const nextConfig: NextConfig = {
	/* config options here */
	output: 'export', // Enables static export
	turbopack: {
		root: path.join(__dirname, '../..'),
	},
}

export default nextConfig
