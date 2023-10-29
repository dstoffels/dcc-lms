interface Tag {
	id: number;
	name: string;
}

interface Module {
	id: number;
	title: string;
	description: string;
	course_hours: number;
	is_published: boolean;
}

interface CourseModule {
	id: number;
	module: Module;
	order: number;
	follows_drip: boolean;
}

interface Course {
	id: number;
	code: string | null;
	name: string;
	description: string;
	owner: number;
	prerequisites: Course[];
	tags: Tag[];
	is_public: boolean;
	is_template: boolean;
	is_published: boolean;
	is_archived: boolean;
	modules: CourseModule[];
}

interface TrackCourse {
	id: number;
	course: Course;
	order: number;
	follows_drip: boolean;
}

interface Track {
	id: number;
	name: string;
	description: string;
	courses: TrackCourse[];
}
