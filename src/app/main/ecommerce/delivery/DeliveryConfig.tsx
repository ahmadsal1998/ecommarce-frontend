import { lazy } from 'react';
import AddDelivery from './AddDelivery';
import DeliveryTimeSlots from './deliverytimeslot/DeliveryTimeSlots';
import AddDeliveryTimeSlot from './deliverytimeslot/AddDeliveryTimeSlot';
import DeliveryCharges from './charges/DeliveryCharges';
import EditDeliveryCharge from './charges/EditDeliveryCharge';

const Deliveries = lazy(() => import('./Deliveries'));

const DeliveriesConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'deliveries',
			element: <Deliveries />
		},
		{
			path: 'timeslots',
			element: <DeliveryTimeSlots />
		},
		{
			path: 'add_delivery',
			element: <AddDelivery />
		},
		{
			path: 'add_timeslot',
			element: <AddDeliveryTimeSlot />
		},
		{
			path: 'delivery_charges',
			element: <DeliveryCharges />
		},
		{
			path: 'edit_charge',
			element: <EditDeliveryCharge />
		}
	]
};

export default DeliveriesConfig;
