import { EscRouteConfigType } from '@esc/utils/EscUtils';
import SignInPage from './SignInPage';
import authRoles from '../../auth/authRoles';
import OrderInvoicePdf from '../ecommerce/orders/orderdetails/invoice/OrderInvoicePdf';

const SignInConfig: EscRouteConfigType = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/sign-in',
			element: <SignInPage />
		},
		
	]
};

export default SignInConfig;
