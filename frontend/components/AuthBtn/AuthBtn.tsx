'use client';

import { Button } from '@mui/material';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { useRouter, usePathname } from 'next/navigation';
import api from '@utils/api';
import { logout } from '../../app/login/actions';
import { User } from '../../app/models';

const AuthBtn = ({ user }: { user?: User }) => {
	const router = useRouter();
	const pathname = usePathname();

	const handleLogin = async () => {
		router.push('/login');
		router.refresh();
	};
	const handleLogout = async () => {
		const response = await api.post('/auth/logout');
		router.push('/login');
		router.refresh();
	};

	return user ? (
		<Button onClick={handleLogout}>Log Out</Button>
	) : (
		pathname !== '/login' && <Button onClick={handleLogin}>Log In</Button>
	);
};

export default AuthBtn;
