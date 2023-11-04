import * as React from 'react';
import { useState, useEffect } from 'react';

import { Box, TextField, Button, Typography } from '@mui/material';
import api from '../../utils/api';
import { useAuth } from '@/context/AuthContext';
import { cookies } from 'next/headers';

class LoginFormData {
	email = '';
	password = '';
}

const LoginPage: React.FC = () => {
	// const [formData, setFormData] = useState<LoginFormData>(new LoginFormData());

	// const { setUser } = useAuth();

	// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setFormData({ ...formData, [e.target.name]: e.target.value });
	// };

	// const login = async (e: React.FormEvent) => {
	// 	e.preventDefault();
	// 	try {
	// 		api.post('/auth/login', formData);
	// 		const response = await api.get('/auth/user');
	// 		setUser(response.body);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			minHeight="100vh"
			maxHeight="100vh"
			padding={2}
		>
			<Typography variant="h4" gutterBottom>
				Login
			</Typography>
			<Box
				component="form"
				display="flex"
				flexDirection="column"
				alignItems="center"
				width="100%"
				maxWidth={400}
				padding={2}
				action={login}
				// onSubmit={login}
			>
				<TextField
					name="email"
					label="Email"
					type="email"
					variant="outlined"
					margin="normal"
					fullWidth
					// value={formData.email}
					// onChange={handleChange}
				/>
				<TextField
					name="password"
					label="Password"
					type="password"
					variant="outlined"
					margin="normal"
					fullWidth
					// value={formData.password}
					// onChange={handleChange}
				/>
				<Button type="submit" variant="contained" color="primary">
					Login
				</Button>
			</Box>
			<Button type="submit" variant="text" color="warning">
				Create Account
			</Button>
		</Box>
	);
};

export default LoginPage;

export async function login(rawFormData: FormData) {
	'use server';
	const formData = {};

	// @ts-ignore
	rawFormData.forEach((value, key) => (formData[key] = value));

	await api.post('/auth/login', formData);
}
