import { Box, Button, Typography } from '@mui/material';
import { Lab, Unit } from '../../lib/types';
import * as React from 'react';
import { fetchAttempts } from './actions';
import FlexBox from '@components/lib/FlexBox/FlexBox';
import LabTask from '@components/LabTask/LabTask';

const Lab = async ({ unit }: { unit: Unit<Lab> }) => {
	const attempts = await fetchAttempts(unit.id);

	return (
		<Box p={1}>
			<FlexBox justifyContent="space-between" alignItems="center">
				<Typography variant="h5" mb={2}>
					{unit.name}
				</Typography>
				<Typography>Due: {new Date(unit.data.due_date).toDateString()}</Typography>
			</FlexBox>
			<LabTask attempts={attempts} unit={unit} />
		</Box>
	);
};

export default Lab;
