import api from '@/apis/api';
import { Box } from '@mui/material';
import * as React from 'react';

const LabTaskPage = async ({ params }: LabTaskPageProps) => {
	const task = await fetchTask(params);
	return <Box></Box>;
};

export default LabTaskPage;

export interface LabTaskPageProps {
	params: {
		lab_id: string;
		task_id: string;
	};
}

async function fetchTask(params: LabTaskPageProps['params']) {
	try {
		const { lab_id, task_id } = params;
		return await api.get(`/labs/${lab_id}/tasks/${task_id}`);
	} catch (error) {}
}
