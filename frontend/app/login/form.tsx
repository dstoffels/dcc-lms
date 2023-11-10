'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';

import api from 'utils/api';
import { useRouter } from 'next/navigation';

const LoginForm = ({}) => {
	const [credentials, setCredentials] = useState({ email: '', password: '' });
	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const response = await api.post('/auth/login', credentials);

		if (response.ok) {
			router.push('/dashboard');
			router.refresh();
		}
	};

	return (
		<>
			<Box
				component="form"
				display="flex"
				flexDirection="column"
				alignItems="center"
				width="100%"
				maxWidth={400}
				padding={2}
				onSubmit={handleSubmit}
			>
				<TextField
					name="email"
					label="Email"
					type="email"
					variant="outlined"
					margin="normal"
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
					fullWidth
					value={credentials.password}
					onChange={handleChange}
				/>
				<Button type="submit" variant="contained" color="primary">
					Login
				</Button>
			</Box>
			<Button type="submit" variant="text" color="warning">
				Create Account
			</Button>
		</>
	);
};

export default LoginForm;
