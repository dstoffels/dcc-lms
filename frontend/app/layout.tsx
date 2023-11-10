import * as React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import ThemeRegistry from 'components/ThemeRegistry/ThemeRegistry';
import Header from 'components/Header/Header';
import { Box } from '@mui/material';
import { fetchUser } from './actions';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Student Portal',
	description: '',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const user = await fetchUser();

	return (
		<ThemeRegistry options={{ key: 'mui' }}>
			<html lang="en">
				<body className={inter.className}>
					<Header user={user} />
					{children}
				</body>
			</html>
		</ThemeRegistry>
	);
}
