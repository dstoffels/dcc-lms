'use client';

import * as React from 'react';
import { Tab, Tabs } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const pages = ['Account', 'Courses', 'Dashboard'];

const Header = ({}) => {
	const router = useRouter();

	const navItems = pages.map((pageName, i) => (
		<Tab
			key={'/' + pageName.toLowerCase()}
			value={i}
			label={pageName}
			onClick={() => router.push('/' + pageName.toLowerCase())}
		/>
	));

	const pathname = usePathname();
	const index = navItems.findIndex((navItem) => navItem.key === pathname);

	return (
		<header className="flex bg-slate-800">
			<Tabs value={index}>{navItems}</Tabs>
		</header>
	);
};

export default Header;
