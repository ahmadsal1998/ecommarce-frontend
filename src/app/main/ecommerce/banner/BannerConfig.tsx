import { lazy } from 'react';
import AddBanner from './AddBanner';
import OfferBanners from './offerbanner/OfferBanners';
import AddOfferBanner from './offerbanner/AddOfferBanner';

const Banners = lazy(() => import('./Banners'));

const BannerConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'banners',
			element: <Banners />
		},
		{
			path: 'add_banner',
			element: <AddBanner />
		},
		{
			path: 'offer_banners',
			element: <OfferBanners />
		},
		{
			path: 'add_offer_banner',
			element: <AddOfferBanner />
		}
	]
};

export default BannerConfig;
