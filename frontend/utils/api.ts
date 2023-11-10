// import { cookies } from 'next/headers';
import nexios from '../nexios/nexios';

const api = nexios.create({ baseURL: 'http://localhost:8000' });
// const cookieStore = cookies();

// auto pass cookies to client responses
// api.addMiddleware((reqConfig, response) => {
// 	// attach client cookies to outgoing request headers
// 	// let reqCookies = cookieStore.getAll();

// 	// const Cookie = reqCookies.map(({ name, value }) => `${name}=${value}`).join('; ');
// 	// reqConfig.headers = { ...reqConfig.headers, Cookie };

// 	// Pass cookies from response to client response
// 	if (response) {
// 		const setCookie = response?.headers.getSetCookie();
// 		// @ts-ignore
// 		setCookie.forEach((cookie) => cookieStore.set(new ResponseCookie(cookie)));

// 		return response;
// 	}

// 	return reqConfig;
// });

export default api;
