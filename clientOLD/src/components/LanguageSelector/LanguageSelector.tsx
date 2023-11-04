import React from 'react';
import useLanguages from '../../hooks/useLanguages';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const LanguageSelector = ({ value, onChange, disabled }: LanguageSelectorProps) => {
	const languages = useLanguages();
	const languageOptions = languages.map((l: any) => (
		<MenuItem key={l.id} value={l.monacoName}>
			{l.name}
		</MenuItem>
	));

	return (
		<FormControl>
			<InputLabel>Language</InputLabel>
			<Select
				label="Language"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				disabled={disabled}
			>
				{languageOptions}
			</Select>
		</FormControl>
	);
};

export default LanguageSelector;

export interface LanguageSelectorProps {
	value: any;
	onChange: Function;
	disabled?: boolean;
}
