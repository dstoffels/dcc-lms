import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import api from 'utils/api';

export default async function Home() {
	const units = await fetchData();

	console.log(units);
	return (
		<Box>
			<Typography variant="h1">Welcome!</Typography>
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
		console.error(error);
	}
}
