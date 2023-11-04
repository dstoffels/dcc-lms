import CourseCard from '@/components/CourseCard/CourseCard';
import IDE from '@/components/IDE/IDE';
import { courses } from '@/models/course';
import { Box, Typography } from '@mui/material';
import * as React from 'react';

const App = ({}) => {
	const courseCards = courses.map((course) => <CourseCard key={course.id} course={course} />);
	return (
		<Box>
			{/* <IDE /> */}
			{/* <Box marginBottom={4}>
				<Typography variant="h4">Public Courses</Typography>
				<Typography>Public courses are free for the taking! </Typography>
			</Box>
			<Box display="flex" gap={2} justifyContent="flex-start" flexWrap="wrap">
				{courseCards}
			</Box> */}
		</Box>
	);
};

export default App;
