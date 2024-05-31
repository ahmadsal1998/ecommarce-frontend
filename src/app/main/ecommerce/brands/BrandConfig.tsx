import { lazy } from 'react';
import AddBrand from './AddBrand';

const Brands = lazy(() => import('./Brands'));

const BrandsConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'brands',
			element: <Brands />
		},
		{
			path: 'addbrand',
			element: <AddBrand />
		}
	]
};

export default BrandsConfig;
