import { lazy } from 'react';
import OrderDetail from './orderdetails/OrderDetail';
import OrderInvoicePdf from './orderdetails/invoice/OrderInvoicePdf';
import OrderRejection from './rejectionreason/RejectionReason';
import AddRejectReason from './rejectionreason/AddRejectReason';
import RefundDetails from './orderdetails/refunds/RefundDetails';

const Orders = lazy(() => import('./Orders'));

const OrdersConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'orders',
			element: <Orders />
		},
		{
			path: 'orderdetail/:id',
			element: <OrderDetail />
		},
		
		{
			path: 'refund-details/:id/:index',
			element: <RefundDetails />
		},
		{
			path: 'rejection-reason',
			element: <OrderRejection />
		},
		{
			path: 'add-rejection-reason',
			element: <AddRejectReason />
		}
	]
};

export default OrdersConfig;
