import { Box, BoxProps } from '@mui/material';
import * as React from 'react';

const FlexBox = (props: FlexBoxProps) => {
	return (
		<Box display="flex" {...props}>
			{props.children}
		</Box>
	);
};

export default FlexBox;

export type FlexBoxProps = React.PropsWithChildren & BoxProps;
