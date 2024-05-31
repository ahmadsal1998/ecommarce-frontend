/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl, alldeliverychargesUrl, deliveryChargesUrl } from '../urls';
import { ListRequestType } from '../../types/ListRequestType';
import { DeliveryChargeModel } from '../../models/delivery/DeliveryChargeModel';

type DeliveryChargeResponse = {
	data: Array<DeliveryChargeModel>;
	total: number;
};

export const fetchDeliveryCharge = createAsyncThunk<
	DeliveryChargeResponse,
	{ payload: ListRequestType } & Partial<DeliveryChargeResponse>
>('deliveryCharge', async (payload) => {
	const response = await axios.post(`${baseUrl}${alldeliverychargesUrl}`, payload.payload);
	return response.data;
});

export const addDeliveryCharge = createAsyncThunk<
	{ message: string },
	{
		payload: {
			chr_type: string;
			var_charges: string;
		};
	} & Partial<{
		message: string;
	}>
>('DeliveryCharge', async (payload) => {
	try {
		const response = await axios.post(`${baseUrl}${deliveryChargesUrl}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const updateDeliveryChargeById = createAsyncThunk<
	{ message: string },
	{
		id: string;
		payload: {
			chr_type: string;
			var_charges: string;
		};
	} & Partial<{
		message: string;
	}>
>('deliveryCharge', async (payload) => {
	try {
		const response = await axios.put(`${baseUrl}${deliveryChargesUrl}/${payload.id}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});
