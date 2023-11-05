import * as React from 'react';
import { useState, useEffect } from 'react';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeRegistry from 'components/ThemeRegistry/ThemeRegistry';
import './globals.css';
import api from 'utils/api';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Student Portal',
	description: '',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	await refreshAccess();
	const user = await fetchUser();

	return (
		<ThemeRegistry options={{ key: 'mui' }}>
			<html lang="en">
				<body className={inter.className}>{children}</body>
			</html>
		</ThemeRegistry>
	);
}

export async function fetchUser() {
	'use server';
	try {
		const response = await api.get('/auth/user');
		return response.json();
	} catch (error) {
		console.error(error);
	}
}

async function refreshAccess() {
	'use server';
	const cookieStore = cookies();

	const refresh = cookieStore.get('refresh_token');

	if (refresh) {
		const access = cookieStore.get('access_token');
		if (!access) {
			try {
				const response = await api.post('/auth/refresh');
			} catch (error) {
				console.log(error);
			}
		}
	}
}
