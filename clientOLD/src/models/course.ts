export interface Course {
	id: string;
	title: string;
	code: string;
	description: string;
	image: string;
	is_public: boolean;
	is_template: boolean;
}

export const courses: Course[] = [
	{
		id: 'fake-uuid-1',
		title: 'Python Modules',
		code: 'PY000',
		description: 'Template course for Python Modules',
		image: '',
		is_public: false,
		is_template: false,
	},
	{
		id: 'fake-uuid-2',
		title: 'JavaScript Basics',
		code: 'JS101',
		description: 'Introduction to JavaScript programming',
		image: '',
		is_public: true,
		is_template: false,
	},
	{
		id: 'fake-uuid-3',
		title: 'React Fundamentals',
		code: 'RE201',
		description: 'Learn the fundamentals of React.js',
		image: '',
		is_public: true,
		is_template: true,
	},
	{
		id: 'fake-uuid-4',
		title: 'SQL for Beginners',
		code: 'SQL100',
		description: 'Learn SQL basics and database management',
		image: '',
		is_public: false,
		is_template: true,
	},
];
