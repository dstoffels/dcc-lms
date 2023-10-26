import * as React from 'react';

const ClickableDiv = ({ children, className, onClick }: ClickableDivProps) => {
	return (
		<div onClick={onClick} className={`cursor-pointer hover:bg-white/10 ${className}`}>
			{children}
		</div>
	);
};

export default ClickableDiv;

export interface ClickableDivProps {
	children?: React.ReactNode;
	className?: string;
	onClick?: React.MouseEventHandler;
}
