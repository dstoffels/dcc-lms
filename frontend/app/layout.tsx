import * as React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import ThemeRegistry from 'components/ThemeRegistry/ThemeRegistry';
import { refreshAccess } from './actions';
import { cookies } from 'next/headers';
import api from 'utils/api';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Student Portal',
	description: '',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	// await refreshAccess();

	return (
		<ThemeRegistry options={{ key: 'mui' }}>
			<html lang="en">
				<body className={inter.className}>{children}</body>
			</html>
		</ThemeRegistry>
	);
}
