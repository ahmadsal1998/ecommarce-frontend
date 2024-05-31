import { lazy } from 'react';
import AddUser from './adduser/AddUser';

const Users = lazy(() => import('./Users'));

const UsersConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'users',
			element: <Users />
		},
		{
			path: 'add_user',
			element: <AddUser />
		}
	]
};

export default UsersConfig;
