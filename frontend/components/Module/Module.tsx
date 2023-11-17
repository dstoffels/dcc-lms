import Unit from '@components/Unit/Unit';
import { ExpandMore } from '@mui/icons-material';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Collapse,
	Typography,
	Divider,
	Stack,
} from '@mui/material';

import { CohortModule } from '../../lib/types';

const Module = ({ module }: { module: CohortModule }) => {
	const units = module.units.map((unit) => <Unit unit={unit} />);
	const date = new Date(module.date);
	const today = new Date();

	return (
		<Accordion disabled={today < date}>
			<AccordionSummary expandIcon={<ExpandMore />}>
				<Typography sx={{ flexGrow: 1 }} variant="h6">
					{module.name}
				</Typography>
				<Typography sx={{ mr: 2, my: 'auto' }} variant="caption">
					{date.toDateString()}
				</Typography>
			</AccordionSummary>
			<Divider />
			<AccordionDetails>{units}</AccordionDetails>
		</Accordion>
	);
};

export default Module;
