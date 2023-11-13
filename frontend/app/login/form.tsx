'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import api from '@utils/api';
import { useRouter } from 'next/navigation';
import { NexiosError } from '../../nexios/nexios';

const LoginForm = ({}) => {
	const [credentials, setCredentials] = useState({ email: '', password: '' });
	const [error, setError] = useState<any | null>(null);
	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await api.post('/auth/login', credentials);

			if (response.ok) {
				router.push('/dashboard');
				router.refresh();
			}
		} catch (error: NexiosError | any) {
			console.log(error.body);
			setError(error.body);
		}
	};

	return (
		<>
			<Stack
				component="form"
				alignItems="center"
				width="100%"
				maxWidth={400}
				padding={2}
				spacing={2}
				onSubmit={handleSubmit}
			>
				<TextField
					name="email"
					label="Email"
					type="email"
					variant="outlined"
					margin="normal"
					required
					fullWidth
					value={credentials.email}
					onChange={handleChange}
				/>
				<TextField
					name="password"
					label="Password"
					type="password"
					variant="outlined"
					margin="normal"
					required
					fullWidth
					value={credentials.password}
					onChange={handleChange}
				/>
				<Button type="submit" variant="contained" color="primary">
					Login
				</Button>
				<Button type="submit" variant="text" color="warning">
					Create Account
				</Button>
			</Stack>
			{error && <Typography color="error">{error.detail}</Typography>}
		</>
	);
};

export default LoginForm;
