import NavItem from '../NavItem/NavItem';

const Sidebar = ({}) => {
	return (
		<div className="h-screen bg-slate-800">
			<NavItem title="Courses" />
			<NavItem title="Dashboard" />
			<NavItem title="Calendar" />
			<NavItem title="Admin" />
		</div>
	);
};

export default Sidebar;
