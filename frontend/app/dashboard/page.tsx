import { Box } from '@mui/material';
import { fetchUser } from '../actions';
import Header from 'components/Header/Header';
import { redirectLogin } from 'utils/auth';
import { revalidatePath } from 'next/cache';

const DashboardPage = async () => {
	redirectLogin();
	const user = await fetchUser();

	return (
		<>
			<Box>Welcome, {user?.username}!</Box>
		</>
	);
};

export default DashboardPage;
