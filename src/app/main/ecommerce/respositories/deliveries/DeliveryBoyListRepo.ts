/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl, alldeliveryboysUrl, deliveryBoysUrl } from '../urls';
import { ListRequestType } from '../../types/ListRequestType';
import { DeliveryBoyModel } from '../../models/delivery/DeliveryBoyModel';

type DeliveryBoysResponse = {
	data: Array<DeliveryBoyModel>;
	total: number;
};

export const fetchDeliveryBoys = createAsyncThunk<
	DeliveryBoysResponse,
	{ payload: ListRequestType } & Partial<DeliveryBoysResponse>
>('deliveryBoys', async (payload) => {
	const response = await axios.post(`${baseUrl}${alldeliveryboysUrl}`, payload.payload);
	return response.data;
});

export const fetchDeliveryBoyById = createAsyncThunk<
	{ data: DeliveryBoyModel },
	{ id: string } & Partial<{ data: DeliveryBoyModel }>
>('deliveryBoyById', async (payload) => {
	const response = await axios.get(`${baseUrl}${deliveryBoysUrl}/${payload.id}`);
	return response.data;
});

export const addDeliveryBoy = createAsyncThunk<
	{ message: string },
	{
		payload: {
			var_name: string;
			var_email: string;
			var_mobile_no: string;
			var_password: string;
			var_profile: string;
			nation_id: string;
			var_aadharcard: string;
			vehicle_image: string;
			var_pancard: string;
		};
	} & Partial<{
		message: string;
	}>
>('DeliveryBoyAdd', async (payload) => {
	try {
		const response = await axios.post(`${baseUrl}${deliveryBoysUrl}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const updateDeliveryById = createAsyncThunk<
	{ message: string },
	{
		id: string;
		payload: {
			var_name: string;
			var_email: string;
			var_mobile_no: string;
			var_password: string;
			var_profile: string;
			nation_id: string;
			var_aadharcard: string;
			vehicle_image: string;
			var_pancard: string;
		};
	} & Partial<{
		message: string;
	}>
>('deliveryUpdate', async (payload) => {
	try {
		const response = await axios.put(`${baseUrl}${deliveryBoysUrl}/${payload.id}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const deleteDeliveryByIds = createAsyncThunk<
	{ message: string },
	{ ids: Array<string> } & Partial<{ message: string }>
>('deleteDeliveries', async (payload) => {
	let ids: string = '';
	payload.ids.forEach((id) => {
		if (ids === '') {
			ids += id;
		} else {
			ids += `,${id}`;
		}
	});
	const response = await axios.delete(`${baseUrl}${deliveryBoysUrl}/${ids}`);
	return response.data;
});

export const updatDeliveryBoyStatusById = createAsyncThunk<
	{ message: string },
	{ payload: object; uid: string } & Partial<{ message: string }>
>('updatDeliveryBoyStatus', async (payload) => {
	const response = await axios.put(`${baseUrl}${deliveryBoysUrl}/${payload.uid}`, payload.payload);
	return response.data;
});
