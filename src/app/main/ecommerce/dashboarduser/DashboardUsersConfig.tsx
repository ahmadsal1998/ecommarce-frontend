import { lazy } from 'react';
import AddDashboardUser from './AddDashboardUser';

const DashboardUsers = lazy(() => import('./DashboardUsers'));

const DashboardUsersConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'dashboard-users',
			element: <DashboardUsers />
		},
		{
			path: 'add-dashboard-user',
			element: <AddDashboardUser />
		}
	]
};

export default DashboardUsersConfig;
