'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import Editor from '@monaco-editor/react';
import useEmmet from '../../hooks/useEmmet';
import judgeAPI from '../../utils/judgeAPI';
// import { ValidLanguages } from 'hooks/useLanguages';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
// import Button from 'components/core/Button/Button';
import Shortcuts from '../Shortcuts/Shortcuts';
import Terminal, { ResultObj } from '../Terminal/Terminal';
import axios from 'axios';
import { Box, Button } from '@mui/material';

const IDE = ({
	value = '',
	onChange,
	initLanguage = 'javascript',
	showLanguageSelect,
	onRun,
}: IDE_Props) => {
	const [results, setResults] = useState<ResultObj | any>(null);
	const [language, setLanguage] = useState(initLanguage);

	useEffect(() => {
		useEmmet();
	}, []);

	const handleRun = () => {
		onRun(value, language);
	};

	return (
		<Box display="flex" flexDirection="column" height="100%" overflow="auto">
			<Shortcuts onEnter={handleRun} onSave={() => console.log('File Saved ;)')} />
			<div className="flex items-center justify-between gap-5 p-1">
				<div>
					{showLanguageSelect && <LanguageSelector value={language} onChange={setLanguage} />}
				</div>
				<Button onClick={handleRun} disabled={!value}>
					Run Code
				</Button>
			</div>
			<Box flex={1}>
				<Editor
					height="100%"
					value={value}
					onChange={onChange}
					theme="vs-dark"
					language={language}
				/>
			</Box>
			{/* <Terminal results={results} /> */}
		</Box>
	);
};

export default IDE;

interface IDE_Props {
	value: string | undefined;
	onChange: (code: string | undefined) => void;
	initLanguage?: string;
	expected_output?: string;
	showLanguageSelect?: boolean;
	onRun: (code: string | undefined, language: string) => any;
}
