/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { allpromocodesUrl, baseUrl, promocodesUrl } from '../urls';
import { ListRequestType } from '../../types/ListRequestType';
import { PromoModel } from '../../models/promo/PromoMode';

type PromocodeResponse = {
	data: Array<PromoModel>;
	total: number;
};

export const fetchPromo = createAsyncThunk<
	PromocodeResponse,
	{ payload: ListRequestType } & Partial<PromocodeResponse>
>('allPromos', async (payload) => {
	const response = await axios.post(`${baseUrl}${allpromocodesUrl}`, payload.payload);
	return response.data;
});

export const fetchPromoById = createAsyncThunk<{ data: PromoModel }, { id: string } & Partial<{ data: PromoModel }>>(
	'findPromoById',
	async (payload) => {
		const response = await axios.get(`${baseUrl}${promocodesUrl}/${payload.id}`);
		return response.data;
	}
);

export const addPromo = createAsyncThunk<
	{ message: string },
	{
		payload: {
			var_promocode: string;
			no_of_time: string;
			expiry_date: string;
			var_percentage: string;
			min_order: string;
			txt_description: string;
			max_discount_price: string;
		};
	} & Partial<{
		message: string;
	}>
>('promoAdd', async (payload) => {
	try {
		const response = await axios.post(`${baseUrl}${promocodesUrl}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		return (e as { response: { data: object } }).response.data;
		
	}
});

export const updatePromoById = createAsyncThunk<
	{ message: string },
	{
		id: string;
		payload: {
			var_promocode: string;
			no_of_time: string;
			expiry_date: string;
			var_percentage: string;
			min_order: string;
			txt_description: string;
			max_discount_price: string;
		};
	} & Partial<{
		message: string;
	}>
>('promoUpdate', async (payload) => {
	try {
		const response = await axios.put(`${baseUrl}${promocodesUrl}/${payload.id}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const deletePromoByIds = createAsyncThunk<
	{ message: string },
	{ ids: Array<string> } & Partial<{ message: string }>
>('deletePromo', async (payload) => {
	let ids: string = '';
	payload.ids.forEach((id) => {
		if (ids === '') {
			ids += id;
		} else {
			ids += `,${id}`;
		}
	});
	const response = await axios.delete(`${baseUrl}${promocodesUrl}/${ids}`);
	return response.data;
});

export const updatPromoStatusById = createAsyncThunk<
	{ message: string },
	{ payload: { chr_publish: boolean; uid: string } } & Partial<{ message: string }>
>('upatePromoSatus', async (payload) => {
	const response = await axios.put(`${baseUrl}${promocodesUrl}/${payload.payload.uid}`, payload.payload);
	return response.data;
});
