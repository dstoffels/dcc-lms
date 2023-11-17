'use client';

import { CohortCourseBase } from '../../lib/types';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const CourseCard = ({ course }: { course: CohortCourseBase }) => {
	const router = useRouter();
	return (
		<Card sx={{ flexBasis: '300px' }}>
			<CardActionArea onClick={() => router.push(`/cohort/course/${course.id}`)}>
				<CardContent>
					<Typography variant="h6">{course.name}</Typography>
					<Typography>{new Date(course.date).toDateString()}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default CourseCard;
