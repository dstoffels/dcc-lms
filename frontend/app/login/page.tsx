import * as React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import LoginForm from './form';
import { redirect } from 'next/navigation';
import useCookies from 'utils/useCookies';

class LoginFormData {
	email = '';
	password = '';
}

const LoginPage = () => {
	const { access_token } = useCookies();

	if (access_token?.value) {
		redirect('/dashboard');
	}

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			height="100vh"
		>
			<Typography variant="h4" gutterBottom>
				Login
			</Typography>
			<LoginForm />
		</Box>
	);
};

export default LoginPage;
