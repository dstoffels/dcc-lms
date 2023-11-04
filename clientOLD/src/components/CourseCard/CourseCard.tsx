'use client';

import { Course } from '@/models/course';
import { Box, Typography, Button } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';

const CourseCard = ({ course }: CourseCardProps) => {
	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	return (
		<Box
			onClick={handleClick}
			className="bg-slate-800 hover:bg-slate-700/90 rounded"
			flexBasis="31vw"
			sx={{ cursor: 'pointer' }}
		>
			{course.image && <img src={course.code} alt={course.title} />}
			<Box p={2}>
				<Typography variant="h6">{course.title}</Typography>
				<Typography variant="body1">{course.code}</Typography>
				<Typography variant="body2">{course.description}</Typography>
			</Box>
		</Box>
	);
};

export default CourseCard;

export interface CourseCardProps {
	course: Course;
}
