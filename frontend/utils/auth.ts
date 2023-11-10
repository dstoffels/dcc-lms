import { redirect } from 'next/navigation';
import api from './api';
import { cookies } from 'next/headers';
import useCookies from './useCookies';

export const redirectLogin = () => {
	const { access_token } = useCookies();
	if (!access_token?.value) {
		redirect('/login');
	}
};

export const attachAPIcookies = (response: Response) => {
	const { cookieStore } = useCookies();
	const setCookies = response.headers.getSetCookie();

	// @ts-ignore
	setCookies.forEach((cookie) => cookieStore.set(new ResponseCookie(cookie)));

	return response;
};

/**
 * Generates a request config object with the client cookies attached to any requests made from the next server that require the cookies.
 * @returns Partial Nexios Config object
 */
export const getAuthConfig = () => {
	const { cookieStore } = useCookies();

	const config = api.getConfig();
	let reqCookies = cookieStore.getAll();

	const Cookie = reqCookies.map(({ name, value }) => `${name}=${value}`).join('; ');
	config.headers = { ...config.headers, Cookie };

	return config;
};

export class ResponseCookie {
	name: string;
	value: string;
	httpOnly: boolean = false;
	maxAge: number = 0;
	expires: string = '';
	secure: boolean = false;
	sameSite: boolean = false;

	constructor(rawCookie: string) {
		const cookieAttributes = rawCookie.split(';').map((attr) => attr.trim());

		const [name, value] = cookieAttributes[0].split('=');
		this.name = name;
		this.value = value;

		cookieAttributes.forEach((prop) => {
			const [key, val] = prop.trim().split('=');
			switch (key) {
				case 'HttpOnly':
					this.httpOnly = Boolean(key);
					break;
				case 'Max-Age':
					this.maxAge = parseInt(val);
					break;
				case 'expires':
					this.expires = val;
					break;
				case 'Secure':
					this.secure = Boolean(key);
					break;
				case 'SameSite':
					this.sameSite = Boolean(key);
					break;
			}
		});
	}
}
