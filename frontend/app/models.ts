export type Role = {
	id: number;
	name: string;
	can_manage_content: boolean;
	can_manage_cohorts: boolean;
	can_manage_students: boolean;
	can_manage_admissions: boolean;
};

export type User = {
	id: number;
	email: string;
	username: string;
	first_name: string;
	last_name: string;
	role: Role;
};
