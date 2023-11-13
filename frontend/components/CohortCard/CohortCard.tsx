'use client';

import { Cohort } from '@utils/models';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';

const CohortCard = ({ cohort }: { cohort: Cohort }) => {
	return (
		<Card sx={{ flexBasis: '300px' }}>
			<CardActionArea>
				<CardContent>
					<Typography variant="h6">{cohort.name}</Typography>
					<Typography>{cohort.start_date}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default CohortCard;
