import { lazy } from 'react';
import AddTags from './AddTags';

const Tags = lazy(() => import('./Tags'));

const TagsConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'tags',
			element: <Tags />
		},
		{
			path: 'addtag',
			element: <AddTags />
		}
	]
};

export default TagsConfig;
