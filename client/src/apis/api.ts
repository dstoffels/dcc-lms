const baseUrl = process.env.DJANGO_BASE_URL;

const api = {
	get: async (path: string) => {
		const response = await fetch(baseUrl + path);
		handleErrors(response);
		return await response.json();
	},

	post: async (path: string, body: object) => {
		const response = await fetch(baseUrl + path, {
			method: 'POST',
			body: JSON.stringify(body),
		});
		handleErrors(response);
		return await response.json();
	},

	put: async (path: string, body: object) => {
		const response = await fetch(baseUrl + path, {
			method: 'PUT',
			body: JSON.stringify(body),
		});
		handleErrors(response);
		return await response.json();
	},

	delete: async (path: string) => {
		const response = await fetch(baseUrl + path, {
			method: 'DELETE',
		});
		handleErrors(response);
		return await response.json();
	},
};
export default api;

async function handleErrors(response: Response) {
	console.log('RESPONSE:', response);
	if (!response.ok) {
		throw new Error(await response.text());
	}
}
