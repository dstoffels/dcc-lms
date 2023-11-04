'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextProps {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
};

export interface Role {
	id: number;
	name: string;
	can_manage_content: boolean;
	can_manage_cohorts: boolean;
	can_manage_students: boolean;
	can_manage_admissions: boolean;
}

export interface User {
	email: string;
	username: string;
	first_name: string | null;
	last_name: string | null;
	role: Role;
}
