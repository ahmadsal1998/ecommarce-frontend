import { lazy } from 'react';
import AddPromoCodeTags from './AddPromoCode';

const PromoCodes = lazy(() => import('./PromoCodes'));

const PromoCodeConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'promocode',
			element: <PromoCodes />
		},
		{
			path: 'add-promo',
			element: <AddPromoCodeTags />
		}
	]
};

export default PromoCodeConfig;
