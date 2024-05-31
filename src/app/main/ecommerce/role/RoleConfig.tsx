import { lazy } from 'react';
import AddRole from './AddRole';

const Roles = lazy(() => import('./Roles'));

const RoleConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'roles',
			element: <Roles />
		},
		{
			path: 'add-role',
			element: <AddRole />
		}
	]
};

export default RoleConfig;
