const baseUrl = 'http://127.0.0.1:8000';
import { cookies } from 'next/headers';

const api = {
	get: async (path: string) => {
		const cookieStore = cookies();
		const response = await fetch(baseUrl + path, {
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'Set-Cookie': `access_token=${cookieStore.get('access_token')}`,
			},
		});
		handleErrors(response);
		return response;
	},

	post: async (path: string, body: object) => {
		const cookieStore = cookies();
		const response = await fetch(baseUrl + path, {
			headers: {
				'Content-Type': 'application/json',
				'Set-Cookie': `access_token=${cookieStore.get('access_token')}`,
			},
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(body),
		});
		handleErrors(response);
		handleSetCookies(response);
		return response;
	},

	put: async (path: string, body: object) => {
		const cookieStore = cookies();
		const response = await fetch(baseUrl + path, {
			headers: {
				'Content-Type': 'application/json',
				'Set-Cookie': `access_token=${cookieStore.get('access_token')}`,
			},
			method: 'PUT',
			body: JSON.stringify(body),
		});
		handleErrors(response);
		return response;
	},

	delete: async (path: string) => {
		const cookieStore = cookies();
		const response = await fetch(baseUrl + path, {
			headers: {
				'Content-Type': 'application/json',
				'Set-Cookie': `access_token=${cookieStore.get('access_token')}`,
			},
			method: 'DELETE',
		});
		handleErrors(response);
		return response;
	},
};
export default api;

async function handleErrors(response: Response) {
	// console.log('RESPONSE:', response);
	if (!response.ok) {
		throw new Error(await response.text());
	}
}

function handleSetCookies(response: Response) {
	const cookieStore = cookies();
	response.headers.getSetCookie().forEach((cookieString) => {
		const splitIndex = cookieString.indexOf(';');
		const [name, value] = cookieString.substring(0, splitIndex).split('=');
		const data = cookieString.substring(splitIndex + 1);
		const attributePairs = data.split(';').map((attr) => attr.trim());
		const cookieAttributes = {};
		attributePairs.forEach((pair) => {
			const [attrName, attrValue] = pair.split('=');
			cookieAttributes[attrName] = attrValue || true;
		});
		// delete cookieAttributes.expires;
		cookieStore.set({ name, value, httpOnly: true, maxAge: 3600 });
		// console.log(cookieAttributes);
	});
}
