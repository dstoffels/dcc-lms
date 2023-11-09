import { Box } from '@mui/material';
import { fetchUser } from '../actions';
import Header from 'components/Header/Header';

const DashboardPage = async () => {
	// const user = await fetchUser();

	return (
		<Box>
			<Header />
			{/* <Box>Welcome, {user?.username}!</Box> */}
		</Box>
	);
};

export default DashboardPage;
