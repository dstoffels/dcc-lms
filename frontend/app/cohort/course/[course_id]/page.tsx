import { Box, Typography } from '@mui/material';
import { fetchCourse as fetchCohortCourse } from './actions';
import Module from '@components/Module/Module';

const CoursePage = async ({ params }: CoursePageProps) => {
	const { course_id } = params;
	const course = await fetchCohortCourse(course_id);

	const modules = course?.modules.map((module) => <Module module={module} />);

	return (
		<Box>
			<Typography variant="h4">{course?.name}</Typography>
			<p>{course?.code}</p>
			{modules}
		</Box>
	);
};

export default CoursePage;

export interface CoursePageProps {
	params: { course_id: string };
}
