'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const LoginForm = ({}) => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	const router = useRouter();

	return (
		<Box display="flex" justifyContent="center">
			<Stack width={400} component="form" gap={2} onSubmit={handleSubmit}>
				<Typography>Welcome to devCodeCamp!</Typography>
				<TextField label="Email" type="email" />
				<TextField label="Password" type="password" />
				<Stack direction="row" gap={2} justifyContent="right">
					<Button color="secondary" variant="contained" type="submit">
						Login
					</Button>
					<Button color="secondary" variant="contained" onClick={() => router.push('/signup')}>
						Sign Up
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
};

export default LoginForm;
