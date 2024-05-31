import { lazy } from 'react';

const SampleButtons = lazy(() => import('./buttons/SampleButtons'));

const SampleButtonsConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'sample-buttons',
			element: <SampleButtons />
		}
	]
};

export default SampleButtonsConfig;
