import api from '@utils/api';
import { LabTaskAttempt } from '../../lib/types';
import { getAuthConfig } from '@utils/auth';

export async function fetchAttempts(lab_id: number): Promise<LabTaskAttempt[]> {
	try {
		const config = getAuthConfig();
		const response = await api.get(`/labs/${lab_id}/attempts`, config);
		return response.json();
	} catch (error) {
		console.log(error);
		return [];
	}
}
