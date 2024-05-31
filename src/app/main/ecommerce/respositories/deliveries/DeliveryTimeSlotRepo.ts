/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl, alldeliverytimesUrl, deliverytimesUrl } from '../urls';
import { ListRequestType } from '../../types/ListRequestType';
import { DeliveryTimeSlotModel } from '../../models/delivery/DeliveryTimeSlotModel';

type DeliveryTimeSlotResponse = {
	data: Array<DeliveryTimeSlotModel>;
	total: number;
};

export const fetchDeliveryTimeSlot = createAsyncThunk<
	DeliveryTimeSlotResponse,
	{ payload: ListRequestType } & Partial<DeliveryTimeSlotResponse>
>('deliveryTimeSlot', async (payload) => {
	const response = await axios.post(`${baseUrl}${alldeliverytimesUrl}`, payload.payload);
	return response.data;
});

export const fetchDeliveryTimeSlotById = createAsyncThunk<
	{ data: DeliveryTimeSlotModel },
	{ id: string } & Partial<{ data: DeliveryTimeSlotModel }>
>('deliveryTimeSlotById', async (payload) => {
	const response = await axios.get(`${baseUrl}${deliverytimesUrl}/${payload.id}`);
	return response.data;
});

export const addDeliveryTimeSlot = createAsyncThunk<
	{ message: string },
	{
		payload: {
			dt_start_time: string;
			dt_end_time: string;
			dt_slot_end_time: string;
			chr_type: string;
		};
	} & Partial<{
		message: string;
	}>
>('DeliveryTimeSlotAdd', async (payload) => {
	try {
		const response = await axios.post(`${baseUrl}${deliverytimesUrl}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const updateDeliveryTimeSlotById = createAsyncThunk<
	{ message: string },
	{
		id: string;
		payload: {
			dt_start_time: string;
			dt_end_time: string;
			dt_slot_end_time: string;
			chr_type: string;
		};
	} & Partial<{
		message: string;
	}>
>('deliveryTimeSlotUpdate', async (payload) => {
	try {
		const response = await axios.put(`${baseUrl}${deliverytimesUrl}/${payload.id}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const deleteDeliveryTimeSlotIds = createAsyncThunk<
	{ message: string },
	{ ids: Array<string> } & Partial<{ message: string }>
>('deleteDeliveryTimeSlot', async (payload) => {
	let ids: string = '';
	payload.ids.forEach((id) => {
		if (ids === '') {
			ids += id;
		} else {
			ids += `,${id}`;
		}
	});
	const response = await axios.delete(`${baseUrl}${deliverytimesUrl}/${ids}`);
	return response.data;
});

export const updatDeliveryTimeSlotStatusById = createAsyncThunk<
	{ message: string },
	{ payload: { is_active: boolean; uid: string } } & Partial<{ message: string }>
>('updatDeliveryTimeSlotStatus', async (payload) => {
	const response = await axios.put(`${baseUrl}${deliverytimesUrl}/${payload.payload.uid}`, payload.payload);
	return response.data;
});
