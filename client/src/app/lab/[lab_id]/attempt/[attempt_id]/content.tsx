'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import api from '@/apis/api';
import IDE from '@/components/IDE/IDE';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { LabTaskAttempt, runCode } from './page';
import axios, { AxiosError } from 'axios';
// @ts-ignore
import termToHtml from 'term-to-html';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const LabAttemptContent = ({ attempt }: LabAttemptContentProps) => {
	const [code, setCode] = useState<string | undefined>(attempt.code);
	const [output, setOutput] = useState('');

	const router = useRouter();

	const handleRun = async (code?: string, language?: string) => {
		const term = await runCode(code, language);
		console.log(term);
		const html: string = termToHtml.strings(term.output, termToHtml.themes.dark.name);
		setOutput(html);
	};

	const handleComplete = async () => {
		try {
			await axios.post('http://localhost:8000/labs/1/attempts/11/complete', { code });
			router.refresh();
		} catch (error: AxiosError | any) {
			console.log(error.response.data);
		}
	};

	const handleAssistant = async () => {
		try {
			await axios.get('http://localhost:8000/labs/1/attempts/11/assistant');
			router.refresh();
		} catch (error: AxiosError | any) {
			console.log(error.response.data);
		}
	};

	return (
		<Box display="flex" height="100vh">
			<Box flex={1} height="100%">
				<Stack height="100%">
					<Stack flex={1} padding={2}>
						<Box display="flex" justifyContent="space-around">
							<IconButton>
								<ChevronLeft />
							</IconButton>
							<Typography align="center" variant="h5" marginBottom={2}>
								Task
							</Typography>
							<IconButton disabled={!attempt.is_complete}>
								<ChevronRight />
							</IconButton>
						</Box>
						<Box flex={1}>{attempt.task.description}</Box>
						<Button
							onClick={handleComplete}
							color={attempt.is_complete ? 'primary' : 'error'}
							disabled={attempt.code === code || !code}
							variant="contained"
						>
							{attempt.is_complete ? 'Task Complete!' : 'Check Task'}
						</Button>
					</Stack>
					<Stack flex={1} padding={2} maxHeight="50%">
						<Typography align="center" variant="h5" marginBottom={1}>
							Assistant
						</Typography>
						<Box flex={1} overflow="auto">
							{attempt.hint}
						</Box>
						<Button
							onClick={handleAssistant}
							color="info"
							disabled={attempt.code !== code || !code}
						>
							Get Help!
						</Button>
					</Stack>
				</Stack>
			</Box>
			<Stack flex={2} height="100%">
				<Box flex={5}>
					<IDE value={code} onChange={setCode} onRun={handleRun} />
				</Box>
				<Stack flex={3} sx={{ background: 'black' }} padding={1}>
					<Typography variant="overline" marginBottom={1} borderBottom="1px gray solid">
						Output
					</Typography>
					<Box flex={1}>
						<iframe width="100%" height="100%" srcDoc={output}></iframe>
					</Box>
				</Stack>
			</Stack>
		</Box>
	);
};

export default LabAttemptContent;

export interface LabAttemptContentProps {
	attempt: LabTaskAttempt;
}
