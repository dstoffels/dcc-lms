import { Box, Typography } from '@mui/material';
import { redirectLogin } from '@utils/auth';
import { fetchCohorts } from './actions';
import CourseCard from '@components/CourseCard/CourseCard';

const DashboardPage = async ({}) => {
	redirectLogin();
	const cohorts = await fetchCohorts();
	const cohortCards = cohorts.map((cohort) => <CourseCard cohort={cohort} />);

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
