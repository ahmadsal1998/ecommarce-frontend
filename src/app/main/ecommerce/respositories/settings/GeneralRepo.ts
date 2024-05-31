/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { generalUrl, baseUrl } from '../urls';
import { GeneralModel } from '../../models/settings/GeneralModel';

type GeneralResponse = {
	data: Array<GeneralModel>;
	total: number;
};

export const fetchGeneral = createAsyncThunk<GeneralResponse, Partial<GeneralResponse>>('allGeneral', async () => {
	const response = await axios.get(`${baseUrl}${generalUrl}`, {});
	return response.data;
});

export const addGeneral = createAsyncThunk<
	{ message: string },
	{
		payload: {
			site_name: string;
			footer_copyright: string;
			currency: string;
			site_logo: string;
			fav_icon: string;
		};
	} & Partial<{
		message: string;
	}>
>('generalAdd', async (payload) => {
	try {
		const response = await axios.post(`${baseUrl}${generalUrl}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const updateGeneralById = createAsyncThunk<
	{ message: string },
	{
		id: string;
		payload: {
			site_name: string;
			footer_copyright: string;
			currency: string;
			site_logo: string;
			fav_icon: string;
		};
	} & Partial<{
		message: string;
	}>
>('generalUpdate', async (payload) => {
	try {
		const response = await axios.put(`${baseUrl}${generalUrl}/${payload.id}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});
