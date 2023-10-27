'use client';
import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import useEmmet from '../../hooks/useEmmet';
import judgeAPI from '../../utils/judgeAPI';
// import { ValidLanguages } from 'hooks/useLanguages';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
// import Button from 'components/core/Button/Button';
import Shortcuts from '../Shortcuts/Shortcuts';
import Terminal, { ResultObj } from '../Terminal/Terminal';
import axios from 'axios';
import { Button } from '@mui/material';

const IDE = ({
	defaultValue = '',
	initLanguage = 'javascript',
	showLanguageSelect = true,
}: IDE_Props) => {
	const [source_code, setSourceCode] = useState<string | undefined>(defaultValue);
	const [results, setResults] = useState<ResultObj | any>(null);
	const [language, setLanguage] = useState(initLanguage);

	useEffect(() => {
		useEmmet();
	}, []);

	const runCode = async () => {
		try {
			const response = await axios.post('http://127.0.0.1:8000/units/labs/1/tasks/2/submit', {
				code: source_code,
			});
			setResults(response.data);
		} catch (error) {
			console.warn(error);
		}
	};

	return (
		<div>
			<Shortcuts onEnter={runCode} onSave={() => console.log('File Saved ;)')} />
			<div className="flex items-center justify-between gap-5 p-2">
				<div>
					{showLanguageSelect && <LanguageSelector value={language} onChange={setLanguage} />}
				</div>
				<Button onClick={runCode} disabled={!source_code}>
					Run Code
				</Button>
			</div>
			<Editor
				height="50vh"
				value={source_code}
				onChange={(value) => setSourceCode(value)}
				theme="vs-dark"
				language={language}
			/>
			<Terminal results={results} />
		</div>
	);
};

export default IDE;

interface IDE_Props {
	defaultValue?: string;
	initLanguage?: ValidLanguages[number];
	expected_output?: string;
}
