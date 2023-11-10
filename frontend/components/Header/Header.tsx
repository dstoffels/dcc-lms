import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { User } from '../../app/models';
import AuthBtn from 'components/AuthBtn/AuthBtn';
import useCookies from 'utils/useCookies';

const Header = ({ user }: HeaderProps) => {
	const { cookieStore } = useCookies();

	return (
		<AppBar>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Box>
					<Typography variant="h6">Student Portal</Typography>
					<Typography variant="caption">devCodeCamp</Typography>
				</Box>
				<Box component="nav" display="flex"></Box>
				<Box display="flex" gap={2} alignItems="center">
					<Typography variant="caption">Hello {user?.username || 'guest'}!</Typography>
					<AuthBtn accessToken={cookieStore.get('access_token')} />
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;

export interface HeaderProps {
	user?: User;
}
