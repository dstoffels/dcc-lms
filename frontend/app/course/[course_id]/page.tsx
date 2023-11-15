import api from '@utils/api';
import { getAuthConfig } from '@utils/auth';
import { Course } from '@utils/models';

const CoursePage = async ({ params }: CoursePageProps) => {
	const { course_id } = params;
	const config = getAuthConfig();
	const course: Course = await (await api.get(`/courses/${course_id}`, config)).json();

	return <div>{course.name}</div>;
};

export default CoursePage;

export interface CoursePageProps {
	params: { course_id: string };
}
