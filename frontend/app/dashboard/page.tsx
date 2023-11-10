import { Box } from '@mui/material';
import { fetchUser } from '../actions';
import Header from 'components/Header/Header';
import { redirectLogin } from 'utils/auth';

const DashboardPage = async () => {
	redirectLogin();
	const user = await fetchUser();

	return (
		<Box>
			<Header user={user} />
			<Box>Welcome, {user?.username}!</Box>
		</Box>
	);
};

export default DashboardPage;
