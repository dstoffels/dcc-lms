import { Box, Typography, Button } from '@mui/material';
import api from 'utils/api';

export default async function Home() {
	const units = await fetchData();

	return (
		<Box>
			<Typography variant="h3">Welcome to devCodeCamp!</Typography>
			{/* <Typography>{units[0].name}</Typography> */}
		</Box>
	);
}

export async function fetchData() {
	'use server';
	try {
		const response = await api.get('/modules/1/units', { cache: 'no-store' });
		return response.json();
	} catch (error) {
		// console.error(error);
	}
}
