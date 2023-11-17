'use server';
import axios from 'axios';

export async function runCode(code?: string, language?: string) {
	const response = await axios.post('http://localhost:4200/run', { code, language });

	return response.data;
}
