import { Box } from '@mui/material';
import { fetchUnit, fetchUnitTypes } from './actions';
import Lab from '@components/Lab/Lab';
import { redirectLogin } from '@utils/auth';

const UnitPage = async ({ params }: { params: { unit_id: string } }) => {
	redirectLogin();
	const unit = await fetchUnit(params.unit_id);
	const types = await fetchUnitTypes();

	switch (unit?.type) {
		case 'external_url':
			return <Box></Box>;
		case 'lab':
			return <Lab unit={unit} />;
		case 'assignment':
			return <Box></Box>;
		default:
			return null;
	}
};

export default UnitPage;
