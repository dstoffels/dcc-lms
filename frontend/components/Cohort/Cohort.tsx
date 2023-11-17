import CourseCard from '@components/CourseCard/CourseCard';
import { Box, Typography } from '@mui/material';
import { Cohort } from '../../lib/types';

const Cohort = ({ cohort }: { cohort: Cohort }) => {
	const courses = cohort.courses.map((course) => <CourseCard course={course} />);

	return (
		<Box>
			<Typography variant="h5">{cohort.name}</Typography>
			<Typography>Start Date: {cohort.start_date}</Typography>
			{cohort.end_date && <Typography>End Date: {cohort.end_date}</Typography>}
			<Box display="flex">{courses}</Box>
		</Box>
	);
};

export default Cohort;
