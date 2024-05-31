import { lazy } from 'react';
import OrderInvoicePdf from './orderdetails/invoice/OrderInvoicePdf';
import { authRoles } from 'src/app/auth';



const InvoiceConfig = {
	settings: {
		
	},
	
	routes: [
		{
            path: 'invoice/:id',
            element: <OrderInvoicePdf/>
        },
	]
};

export default InvoiceConfig;
