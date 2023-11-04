import { cookies } from 'next/headers';
import nexios from '../nexios/nexios';
import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';

const api = nexios.create({ baseURL: 'http://localhost:8000' });

// auto pass cookies to client responses
api.addMiddleware((reqConfig, response) => {
	if (response) {
		const setCookie = response?.headers.getSetCookie();
		const cookieStore = cookies();
		// @ts-ignore
		setCookie.forEach((cookie) => cookieStore.set(new ResponseCookie(cookie)));

		console.log(cookieStore.getAll());

		return response;
	}

	return reqConfig;
});
export default api;

class ResponseCookie {
	name: string;
	value: string;
	httpOnly: boolean = false;
	maxAge: number = 0;
	expires: string = '';
	secure: boolean = false;
	sameSite: boolean = false;

	constructor(rawCookie: string) {
		const [name, value] = rawCookie.split('=');
		const cookie = rawCookie.split(';');
		this.name = name;
		this.value = value;
		cookie.forEach((prop) => {
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
