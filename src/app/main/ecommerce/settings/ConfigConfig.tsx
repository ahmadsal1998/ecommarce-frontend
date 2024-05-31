import { lazy } from 'react';

const SettingForms = lazy(() => import('./settingforms/SettingFroms'));

const SettingFormsConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'setting-froms',
			element: <SettingForms />
		}
	]
};

export default SettingFormsConfig;
