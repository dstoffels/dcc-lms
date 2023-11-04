import * as React from 'react';
import { useState, useEffect } from 'react';

import { Box, TextField, Button, Typography } from '@mui/material';
// import api from '../../utils/api';
// import { useAuth } from '@/context/AuthContext';
import { cookies } from 'next/headers';
import api from 'utils/api';
import { redirect } from 'next/navigation';

class LoginFormData {
	email = '';
	password = '';
}

const LoginPage = () => {
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
			>
				<TextField
					name="email"
					label="Email"
					type="email"
					variant="outlined"
					margin="normal"
					fullWidth
				/>
				<TextField
					name="password"
					label="Password"
					type="password"
					variant="outlined"
					margin="normal"
					fullWidth
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

	const response = await api.post('/auth/login', formData, { cache: 'no-store' });

	if (response.ok) {
		redirect('/');
	}
}
