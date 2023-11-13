import { cookies } from 'next/headers';

import api from 'utils/api';
import { User } from './models';
import { NextResponse } from 'next/server';
import { getAuthConfig } from 'utils/auth';
import useCookies from 'utils/useCookies';

export async function refreshAccess() {
	'use server';

	const { cookieStore, access_token, refresh_token } = useCookies();

	if (refresh_token) {
		if (!access_token) {
			try {
				const response = await api.post('/auth/refresh');
			} catch (error) {
				console.log(error);
			}
		}
	} else {
		// const publicRoutes = ['/', '/login', '/register'];
		// if (!publicRoutes.includes(request.nextUrl.pathname)) {
		// 	if (!hasAccess) return NextResponse.rewrite(new URL('/login', request.url));
		// }
	}
}

export async function fetchUser(): Promise<User | null> {
	'use server';
	try {
		const { access_token } = useCookies();
		if (access_token) {
			const config = getAuthConfig();
			const response = await api.get('/auth/user', config);
			return response.json();
		} else return null;
	} catch (error) {
		console.error(error);
		return null;
	}
}
