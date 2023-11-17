export type Role = {
	id: number;
	name: string;
	can_manage_content: boolean;
	can_manage_cohorts: boolean;
	can_manage_admissions: boolean;
	can_manage_students: boolean;
};

export type User = {
	id: number;
	email: string;
	username: string;
	first_name: string;
	last_name: string;
	role: Role;
};

export type Pace = {
	id: number;
	name: string;
	hours_per_week: number;
	flex_factor: number;
	days_per_week: number;
};

export type Task = {
	id: number;
	lab_id: number;
	description: string;
	language: string;
	order: number;
};

export type Lab = {
	due_date: string;
	points: number;
	tasks: Task[];
};

export type ExternalUrl = {
	url: string;
	load_in_new_tab: boolean;
};

export type Unit<Tdata extends Lab | ExternalUrl> = {
	id: number;
	module_id: number;
	name: string;
	order: number;
	type: string;
	data: Tdata;
};

export type Module = {
	id: number;
	name: string;
	description: string;
	course_hours: number;
	is_published: boolean;
	units: Unit<Lab | ExternalUrl>[];
};

export type CourseModule = {
	id: number;
	module: Module;
	order: number;
	follows_drip: boolean;
};

export type Course = {
	id: number;
	code: string;
	name: string;
	description: string;
	owner: number | null;
	prerequisites: any[]; // Replace 'any' with the appropriate type if available
	tags: any[]; // Replace 'any' with the appropriate type if available
	is_public: boolean;
	is_template: boolean;
	is_published: boolean;
	is_archived: boolean;
	modules: CourseModule[];
};

export type ProgramCourse = {
	id: number;
	order: number;
	follows_drip: boolean;
	course: Course;
};

export type Program = {
	id: number;
	name: string;
	description: string;
	courses: ProgramCourse[];
};

export type Cohort = {
	id: number;
	name: string;
	start_date: string;
	end_date: string | null;
	course_gap_days: number;
	pace: Pace;
	students: User[];
	program: Program;
	courses: CohortCourseBase[];
};

export type CohortCourseBase = {
	id: number;
	date: string;
	override: boolean;
	cohort_id: number;
	order: number;
	follows_drip: boolean;
	course_id: number;
	name: string;
	code: string;
	description: string;
	is_public: boolean;
	is_published: boolean;
};

export type CohortCourse = CohortCourseBase & {
	modules: CohortModule[];
	students: User[];
};

export type CohortModule = {
	id: number;
	date: string;
	override: boolean;
	order: number;
	follows_drip: boolean;
	module_id: number;
	name: string;
	description: string;
	course_hours: number;
	is_published: boolean;
	units: Unit<Lab | ExternalUrl>[];
	// "units": [
	//     {
	//         "id": 1,
	//         "module_id": 1,
	//         "name": "Variables, Data Types & Operators",
	//         "order": 1,
	//         "type": "lab",
	//         "data": {
	//             "due_date": "2023-10-31",
	//             "points": 50,
	//             "tasks": [
	//                 {
	//                     "id": 1,
	//                     "lab_id": 1,
	//                     "description": "Declare a let variable and assign it your name.",
	//                     "language": "javascript",
	//                     "order": 1
	//                 }
	//             ]
	//         }
	//     }
	// ]
};
