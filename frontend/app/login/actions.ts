'use server';

import { redirect } from 'next/navigation';
import api from 'utils/api';
import { attachAPIcookies, cookieStore, getAuthConfig } from 'utils/auth';

export async function login(rawFormData: FormData) {
	const formData = {};

	// @ts-ignore
	rawFormData.forEach((value, key) => (formData[key] = value));

	let response = await api.post('/auth/login', formData, { cache: 'no-store' });

	response = attachAPIcookies(response);

	if (response.ok) {
		redirect('/dashboard');
	}
}

export const logout = async () => {
	const config = getAuthConfig();
	let response = await api.post('/auth/logout', {}, config);
	cookieStore.delete('refresh_token');
	cookieStore.delete('access_token');
	response = attachAPIcookies(response);
	console.log();
	redirect('/login');
};
