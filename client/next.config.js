/** @type {import('next').NextConfig} */
const fs = require('fs');
const path = require('path');

const envFile = path.join(__dirname, '../.env');
const env = fs
	.readFileSync(envFile, 'utf8')
	.split('\n')
	.reduce((acc, line) => {
		const [key, value] = line.split('=');
		if (key && !key.startsWith('#')) {
			acc[key] = value;
		}
		return acc;
	}, {});

const nextConfig = {
	env,
	experimental: {
		serverActions: true,
	},
};

module.exports = nextConfig;
