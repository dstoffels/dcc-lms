import { Box, Typography } from '@mui/material';
import { fetchUser } from '../actions';
import Header from '@components/Header/Header';
import { redirectLogin } from '@utils/auth';
import { revalidatePath } from 'next/cache';
import { fetchCohorts } from './actions';
import CohortCard from '@components/CohortCard/CohortCard';

const DashboardPage = async ({}) => {
	redirectLogin();
	const cohorts = await fetchCohorts();
	const cohortCards = cohorts.map((cohort) => <CohortCard cohort={cohort} />);

	return (
		<>
			<Box p={1}>
				<Typography variant="h4">Dashboard</Typography>
				<Box display="flex">{cohortCards}</Box>
			</Box>
		</>
	);
};

export default DashboardPage;
