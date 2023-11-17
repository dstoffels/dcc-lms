import api from '@utils/api';
import { getAuthConfig } from '@utils/auth';
import { CohortCourse } from '../../../../lib/types';

export async function fetchCourse(course_id: string): Promise<CohortCourse | null> {
	try {
		const config = getAuthConfig();
		const response = await api.get(`/cohorts/3/courses/${course_id}`, config);
		return response.json();
	} catch (error) {
		console.log(error);
		return null;
	}
}
