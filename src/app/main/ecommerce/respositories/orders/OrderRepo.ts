/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl, allordersUrl, ordersUrl, commentsUrl } from '../urls';

import { OrderModel } from '../../models/orders/OrderModel';

type OrderResponse = {
	data: Array<OrderModel>;
	total: number;
};

export const fetchOrders = createAsyncThunk<OrderResponse, { payload: {limit: number,page: number, sort: unknown, search: string, toDate:string,fromDate: string} } & Partial<OrderResponse>>(
	'oders',
	async (payload) => {
		const response = await axios.post(`${baseUrl}${allordersUrl}`, payload.payload);
		return response.data;
	}
);

export const getOrderById = createAsyncThunk<{ data: OrderModel }, { id: string } & Partial<{ data: OrderModel }>>(
	'getOrders',
	async (payload) => {
		console.log(payload.id)
		const response = await axios.get(`${baseUrl}${ordersUrl}/${payload.id}`);
		console.log("order", response.data)
		return response.data;
	}
);
export const addOrderComment = createAsyncThunk<
	{ message: string },
	{
		order_id: string;
		message: string;
		status: string;
	} & Partial<{ message: string }>
>('addComments', async (payload) => {
	const response = await axios.post(`${baseUrl}${commentsUrl}`, payload);
	return response.data;
});
