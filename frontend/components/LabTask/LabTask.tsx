'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { LabTaskAttempt, Lab, Unit } from '../../lib/types';
import { Box, Button } from '@mui/material';
import { getAuthConfig } from '@utils/auth';
import api from '@utils/api';
import LabAttempt from '@components/LabAttempt/LabAttempt';

const LabTask = ({ attempts, unit }: LabTaskProps) => {
	const [activeAttempt, setActiveAttempt] = useState<LabTaskAttempt | null>(null);

	const handleClick = async () => {
		try {
			const taskId = unit.data.tasks[attempts.length - 1].id;

			const response = await api.get(`/labs/${unit.id}/tasks/${taskId}/attempt`);
			setActiveAttempt(await response.json());
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Box>
			{!activeAttempt ? (
				<Button onClick={handleClick} variant="contained">
					{attempts.length ? 'Continue Lab' : 'Start Lab!'}
				</Button>
			) : (
				<LabAttempt attempt={activeAttempt} />
			)}
		</Box>
	);
};

export default LabTask;

export type LabTaskProps = {
	attempts: LabTaskAttempt[];
	unit: Unit<Lab>;
};
