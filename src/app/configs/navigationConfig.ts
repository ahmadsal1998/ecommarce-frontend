import i18next from 'i18next';
import { EscNavItemType } from '@esc/core/EscNavigation/types/EscNavItemType';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

/**
 * The navigationConfig object is an array of navigation items for the Esc application.
 */
const navigationConfig: EscNavItemType[] = [
	{
		id: 'dashboard',
		title: 'Dashboard',
		type: 'item',
		icon: 'material-outline:home',
		url: 'dashboard'
	},
	{
		id: 'users',
		title: 'User Manage',
		type: 'item',
		icon: 'material-outline:person',
		url: 'users'
	},
	{
		id: 'categories',
		title: 'Category Manage',
		type: 'collapse',
		icon: 'material-outline:dashboard',
		children: [
			{
				id: 'parentcategories',
				title: 'Categories',
				type: 'item',
				icon: 'feather:layers',
				url: 'categories'
			},
			{
				id: 'subcategories',
				title: 'Sub Categories',
				type: 'item',
				icon: 'material-outline:category',
				url: 'subcategories'
			}
		]
	},
	{
		id: 'brands',
		title: 'Brand Manage',
		type: 'item',
		icon: 'feather:command',
		url: 'brands'
	},
	{
		id: 'tags',
		title: 'Tag Manage',
		type: 'item',
		icon: 'material-outline:scatter_plot',
		url: 'tags'
	},
	{
		id: 'producst',
		title: 'Product Manage',
		type: 'collapse',
		icon: 'feather:codepen',
		children: [
			{
				id: 'attributes',
				title: 'Attributes',
				type: 'item',
				icon: 'feather:layers',
				url: 'attributes'
			},
			{
				id: 'plist',
				title: 'Products',
				type: 'item',
				icon: 'material-outline:filter_none',
				url: 'products'
			}
		]
	},
	{
		id: 'orders',
		title: 'Order Manage',
		type: 'collapse',
		icon: 'feather:box',
		children: [
			{
				id: 'olist',
				title: 'Orders',
				type: 'item',
				icon: 'material-outline:video_stable',
				url: 'orders'
			}
		]
	},
	/*{
		id: 'deviveries',
		title: 'Delivery Manage',
		type: 'collapse',
		icon: 'material-outline:local_shipping',
		children: [
			{
				id: 'dblist',
				title: 'Delivery Boy List',
				type: 'item',
				icon: 'material-outline:delivery_dining',
				url: 'deliveries'
			},
			{
				id: 'dvcharges',
				title: 'Delivery Charge',
				type: 'item',
				icon: 'material-outline:account_balance_wallet',
				url: 'delivery_charges'
			}
		]
	},*/
	{
		id: 'bannsers',
		title: 'Banner Manage',
		type: 'collapse',
		icon: 'material-outline:airplay',
		children: [
			{
				id: 'bannerImages',
				title: 'Banner Images',
				type: 'item',
				icon: 'feather:image',
				url: 'banners'
			},
			{
				id: 'offerbanner',
				title: 'Offer Banners',
				type: 'item',
				icon: 'material-outline:local_offer',
				url: 'offer_banners'
			}
		]
	},
	{
		id: 'rols',
		title: 'Dashboard Users',
		type: 'collapse',
		icon: 'material-outline:lock',
		children: [
			{
				id: 'rollldist',
				title: 'Users',
				type: 'item',
				icon: 'material-outline:people_alt',
				url: 'dashboard-users'
			},
			{
				id: 'rolllist',
				title: 'Roles',
				type: 'item',
				icon: 'material-outline:admin_panel_settings',
				url: 'roles'
			}
		]
	},
	{
		id: 'offers',
		title: 'Offer Manage',
		type: 'collapse',
		icon: 'material-outline:card_giftcard',
		children: [
			{
				id: 'promocode',
				title: 'Promo Codes',
				type: 'item',
				icon: 'material-outline:style',
				url: 'promocode'
			}
		]
	},
	{
		id: 'others',
		title: 'Others Manage',
		type: 'collapse',
		icon: 'material-outline:list',
		children: [
			{
				id: 'newsletter',
				title: 'Newsletters',
				type: 'item',
				icon: 'material-outline:article',
				url: 'newsletters'
			},
			{
				id: 'contactus',
				title: 'Contacts',
				type: 'item',
				icon: 'material-outline:contacts',
				url: 'contacts'
			}
		]
	},
	{
		id: 'setting',
		title: 'Settings',
		type: 'item',
		icon: 'material-outline:settings',
		url: 'setting-froms'
	}
];

export default navigationConfig;
