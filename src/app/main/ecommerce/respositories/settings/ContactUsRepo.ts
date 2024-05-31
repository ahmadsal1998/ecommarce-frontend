/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { contactUrl, baseUrl } from '../urls';
import { ContactUsModel } from '../../models/settings/ContactUsModel';

type ContactUsResponse = {
	data: Array<ContactUsModel>;
	total: number;
};

export const fetchContact = createAsyncThunk<ContactUsResponse, Partial<ContactUsResponse>>('allContact', async () => {
	const response = await axios.get(`${baseUrl}${contactUrl}`, {});
	return response.data;
});

export const addContactUs = createAsyncThunk<
	{ message: string },
	{
		payload: {
			email: string;
			phone: string;
			facebook: string;
			insta: string;
			google: string;
			twitter: string;
			youtube: string;
		};
	} & Partial<{
		message: string;
	}>
>('contactAdd', async (payload) => {
	try {
		const response = await axios.post(`${baseUrl}${contactUrl}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const updateContactById = createAsyncThunk<
	{ message: string },
	{
		id: string;
		payload: {
			email: string;
			phone: string;
			facebook: string;
			insta: string;
			google: string;
			twitter: string;
			youtube: string;
		};
	} & Partial<{
		message: string;
	}>
>('contactUpdate', async (payload) => {
	try {
		const response = await axios.put(`${baseUrl}${contactUrl}/${payload.id}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});
