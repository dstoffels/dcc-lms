import { cookies } from 'next/headers';

import api from 'utils/api';
import { User } from './models';
import { NextResponse } from 'next/server';

export async function refreshAccess() {
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
	} else {
		// const publicRoutes = ['/', '/login', '/register'];
		// if (!publicRoutes.includes(request.nextUrl.pathname)) {
		// 	if (!hasAccess) return NextResponse.rewrite(new URL('/login', request.url));
		// }
	}
}

export async function fetchUser(): Promise<User | undefined> {
	'use server';
	const cookieStore = cookies();
	const access = cookieStore.get('access_token');
	if (access) {
		try {
			const response = await api.get('/auth/user');
			return response.json();
		} catch (error) {
			console.error(error);
		}
	}
}
