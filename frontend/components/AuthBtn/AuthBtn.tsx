'use client';

import { Button } from '@mui/material';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { useRouter } from 'next/navigation';
import api from 'utils/api';
import { logout } from '../../app/login/actions';

const AuthBtn = ({ accessToken }: { accessToken?: RequestCookie }) => {
	const router = useRouter();

	const handleLogin = () => router.push('/login');
	const handleLogout = async () => {
		const response = await api.post('/auth/logout');
		router.push('/login');
	};

	return accessToken ? (
		<Button onClick={handleLogout}>Log Out</Button>
	) : (
		<Button onClick={handleLogin}>Log In</Button>
	);
};

export default AuthBtn;
