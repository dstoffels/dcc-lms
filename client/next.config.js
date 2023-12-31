/** @type {import('next').NextConfig} */
const fs = require('fs');
const path = require('path');

const envFile = path.join(__dirname, '../.env');
const env = fs
	.readFileSync(envFile, 'utf8')
	.split('\n')
	.reduce((acc, line) => {
		const [key, value] = line.split('=');
		if (key) {
			acc[key] = value;
		}
		return acc;
	}, {});

const nextConfig = {
	env,
};

module.exports = nextConfig;
