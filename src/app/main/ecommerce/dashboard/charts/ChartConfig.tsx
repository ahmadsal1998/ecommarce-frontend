import { lazy } from 'react';


const Charts = lazy(() => import('./Charts'));

const ChartsConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'chart',
			element: <Charts />
		}
	]
};

export default ChartsConfig;
