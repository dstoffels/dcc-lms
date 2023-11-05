import { cookies } from 'next/headers';
import nexios from '../nexios/nexios';

const api = nexios.create({ baseURL: 'http://localhost:8000' });

// auto pass cookies to client responses
api.addMiddleware((reqConfig, response) => {
	const cookieStore = cookies();

	// attach client cookies to outgoing request headers
	let reqCookies = cookieStore.getAll();

	const Cookie = reqCookies.map(({ name, value }) => `${name}=${value}`).join('; ');
	reqConfig.headers = { ...reqConfig.headers, Cookie };

	// Pass cookies from response to client response
	if (response) {
		const setCookie = response?.headers.getSetCookie();
		// @ts-ignore
		setCookie.forEach((cookie) => cookieStore.set(new ResponseCookie(cookie)));

		return response;
	}

	return reqConfig;
});

export default api;

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
