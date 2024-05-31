import { lazy } from 'react';
import AddProduct from './addproduct/AddProduct';

const Products = lazy(() => import('./Products'));

const ProductsConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'products',
			element: <Products />
		},
		{
			path: 'addproduct',
			element: <AddProduct />
		}
	]
};

export default ProductsConfig;
