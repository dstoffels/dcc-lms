'use client';

import { Unit as UnitType } from '../../lib/types';
import { Box, ListItemButton } from '@mui/material';
import { useRouter } from 'next/navigation';

const Unit = ({ unit }: { unit: UnitType }) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/unit/${unit.id}`);
	};

	return <ListItemButton onClick={handleClick}>{unit.name}</ListItemButton>;
};

export default Unit;
