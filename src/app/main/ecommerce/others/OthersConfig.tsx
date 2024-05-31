import { lazy } from 'react';
import Contacts from './contacts/Contacts';

const NewsLetters = lazy(() => import('./newsletter/NewsLetters'));

const NewsLettersConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'newsletters',
			element: <NewsLetters />
		},
		{
			path: 'contacts',
			element: <Contacts />
		}
	]
};

export default NewsLettersConfig;
