'use client';

import { Cohort } from '@utils/models';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const CourseCard = ({ cohort }: { cohort: Cohort }) => {
	const router = useRouter();
	return (
		<Card sx={{ flexBasis: '300px' }}>
			<CardActionArea onClick={() => router.push(`/cohort/${cohort.id}`)}>
				<CardContent>
					<Typography variant="h6">{cohort.name}</Typography>
					<Typography>{new Date(cohort.start_date).toDateString()}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default CourseCard;
