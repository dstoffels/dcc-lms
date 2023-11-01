const baseUrl = process.env.DJANGO_BASE_URL;
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
