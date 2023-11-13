'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import api from '@utils/api';
import { attachAPIcookies, getAuthConfig } from '@utils/auth';

export async function login(rawFormData: FormData) {
	const formData = {};

	// @ts-ignore
	rawFormData.forEach((value, key) => (formData[key] = value));

	let response = await api.post('/auth/login', formData, { cache: 'no-store' });

	response = attachAPIcookies(response);

	if (response.ok) {
		revalidateTag('user');
		redirect('/dashboard');
	}
}

export const logout = async () => {
	const config = getAuthConfig();
	let response = await api.post('/auth/logout', {}, config);
	response = attachAPIcookies(response);
	revalidateTag('user');
	redirect('/login');
};
