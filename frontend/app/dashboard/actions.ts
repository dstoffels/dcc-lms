import api from '@utils/api';
import { getAuthConfig } from '@utils/auth';
import { Cohort } from '../../lib/types';

export async function fetchCohorts(): Promise<Cohort[]> {
	try {
		const config = getAuthConfig();
		const response = await api.get('/cohorts', config);
		return response.json();
	} catch (error) {
		// handle error
		return [];
	}
}
