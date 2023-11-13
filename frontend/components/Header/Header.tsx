import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { User } from '../../app/models';
import AuthBtn from 'components/AuthBtn/AuthBtn';

const Header = ({ user }: HeaderProps) => {
	return (
		<AppBar>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Box>
					<Typography variant="h6">Student Portal</Typography>
					<Typography variant="caption">devCodeCamp</Typography>
				</Box>
				<Box component="nav" display="flex"></Box>
				<Stack>
					<AuthBtn user={user} />
					{user && <Typography variant="caption">Hello {user?.username}!</Typography>}
				</Stack>
			</Toolbar>
		</AppBar>
	);
};

export default Header;

export interface HeaderProps {
	user?: User;
}
