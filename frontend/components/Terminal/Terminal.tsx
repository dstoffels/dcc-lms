import * as React from 'react';

const Terminal = ({ results }: TerminalProps) => {
	return (
		results && (
			<div className="flex gap-5">
				<div className="flex-1 h-64 overflow-y-auto">
					<h4>Output</h4>
					<pre>{results.output}</pre>
				</div>
				<div className="flex-1">{results.explanation}</div>
			</div>
		)
	);
};

export default Terminal;

export interface TerminalProps {
	results: ResultObj;
}

export interface ResultObj {
	task_complete: boolean;
	output: string;
	explanation: string;
}
