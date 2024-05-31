import { lazy } from 'react';
import AddCategories from './parentcategories/AddCategories';
import SubCategory from './subcategories/SubCategory';
import AddSubCategories from './subcategories/AddSubCategories';

const Category = lazy(() => import('./parentcategories/Category'));

const CategoryConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'categories',
			element: <Category />
		},
		{
			path: 'addcategory',
			element: <AddCategories />
		},
		{
			path: 'subcategories',
			element: <SubCategory />
		},
		{
			path: 'addsubcategories',
			element: <AddSubCategories />
		}
	]
};

export default CategoryConfig;
