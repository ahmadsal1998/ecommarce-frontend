import EscUtils from '@esc/utils';
import EscLoading from '@esc/core/EscLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import { EscRouteConfigsType, EscRoutesType } from '@esc/utils/EscUtils';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import ExampleConfig from '../main/example/ExampleConfig';
import UsersConfig from '../main/ecommerce/users/UsersConfig';
import CategoryConfig from '../main/ecommerce/categories/CategoryConfig';
import BrandConfig from '../main/ecommerce/brands/BrandConfig';
import TagsConfig from '../main/ecommerce/tags/TagsConfig';
import AttributesConfig from '../main/ecommerce/products/attributes/AttributesConfig';
import ProductsConfig from '../main/ecommerce/products/product/ProductConfig';
import OrdersConfig from '../main/ecommerce/orders/OrdersConfig';
import DeliveriesConfig from '../main/ecommerce/delivery/DeliveryConfig';
import BannerConfig from '../main/ecommerce/banner/BannerConfig';
import RoleConfig from '../main/ecommerce/role/RoleConfig';
import DashboardUsersConfig from '../main/ecommerce/dashboarduser/DashboardUsersConfig';
import PromoCodeConfig from '../main/ecommerce/promo/PromotCodeConfig';
import NewsLettersConfig from '../main/ecommerce/others/OthersConfig';
import SettingFormsConfig from '../main/ecommerce/settings/ConfigConfig';
import ChartsConfig from '../main/ecommerce/dashboard/charts/ChartConfig';
import DashboardConfig from '../main/ecommerce/dashboard/DashboardConfig';
import SampleButtonsConfig from '../main/sample-components/SampleComponentsConfig';
import InvoiceConfig from '../main/ecommerce/orders/InvoiceConfig';


const routeConfigs: EscRouteConfigsType = [
	ExampleConfig,
	UsersConfig,
	CategoryConfig,
	SignOutConfig,
	SignInConfig,
	BrandConfig,
	TagsConfig,
	AttributesConfig,
	ProductsConfig,
	OrdersConfig,
	DeliveriesConfig,
	BannerConfig,
	RoleConfig,
	DashboardUsersConfig,
	PromoCodeConfig,
	NewsLettersConfig,
	SettingFormsConfig,
	ChartsConfig,
	DashboardConfig,
	InvoiceConfig,
	SampleButtonsConfig
];

/**
 * The routes of the application.
 */
const routes: EscRoutesType = [
	...EscUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
	{
		path: '/',
		element: <Navigate to={`dashboard`} />,
		auth: settingsConfig.defaultAuth
	},
	
	{
		path: 'loading',
		element: <EscLoading />
	},
	{
		path: '404',
		element: <Error404Page />
	},
	{
		path: '*',
		element: <Navigate to={`dashboard`} />
	}
];

export default routes;
