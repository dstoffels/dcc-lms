import { Box, Button, Typography } from '@mui/material';
import { Lab, Unit } from '../../lib/types';
import * as React from 'react';
import { useState, useEffect } from 'react';

const Lab = ({ unit }: { unit: Unit<Lab> }) => {
	return (
		<Box>
			<Typography variant="h5">{unit.name}</Typography>
			<Button variant="contained">{'Start Lab!'}</Button>
		</Box>
	);
};

export default Lab;
