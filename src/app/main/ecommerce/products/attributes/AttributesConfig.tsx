import { lazy } from 'react';
import AddAttributes from './AddAttributes';
import AttributeValues from './attributesvalue/AttributeValues';
import AddAttributesValue from './attributesvalue/AddAttributesValue';

const Attributes = lazy(() => import('./Attributes'));

const AttributesConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'attributes',
			element: <Attributes />
		},
		{
			path: 'addattribute',
			element: <AddAttributes />
		},
		{
			path: 'attributesvalues',
			element: <AttributeValues />
		},
		{
			path: 'addattributevalue',
			element: <AddAttributesValue />
		}
	]
};

export default AttributesConfig;
