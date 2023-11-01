'use server';

import api from '@/apis/api';
import LabAttemptContent from './content';
import axios from 'axios';

const LabAttemptPage = async ({ params }: LabTaskPageProps) => {
	const attempt = await fetchTaskAttempt(params);

	return <LabAttemptContent attempt={attempt} />;
};

export default LabAttemptPage;

export interface LabTaskPageProps {
	params: {
		lab_id: string;
		attempt_id: string;
	};
}

export async function fetchTaskAttempt(params: LabTaskPageProps['params']) {
	try {
		const { lab_id, attempt_id } = params;
		const response = await api.get(`/labs/${lab_id}/attempts/${attempt_id}`);
		return response.json();
	} catch (error) {
		console.error(error);
	}
}

export interface LabTaskAttempt {
	task: LabTask;
	hint: string;
	messages: object[];
	code: string;
	is_complete: boolean;
}

export interface LabTask {
	order: number;
	description: string;
	resources: string;
	language: string;
}

export async function runCode(code?: string, language?: string) {
	'use server';
	const response = await axios.post('http://localhost:4200/run', { code, language });

	return response.data;
}
