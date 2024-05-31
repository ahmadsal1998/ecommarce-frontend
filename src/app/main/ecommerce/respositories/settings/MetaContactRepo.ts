/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { metacontentUrl, baseUrl } from '../urls';
import { MetacontentModel } from '../../models/settings/MetaContactModel';

type ContactUsResponse = {
	data: Array<MetacontentModel>;
	total: number;
};

export const fetchMetaContact = createAsyncThunk<ContactUsResponse, Partial<ContactUsResponse>>(
	'allMetaContact',
	async () => {
		const response = await axios.get(`${baseUrl}${metacontentUrl}`, {});
		return response.data;
	}
);

export const addMetaContact = createAsyncThunk<
	{ message: string },
	{
		payload: {
			title: string;
			desc: string;
		};
	} & Partial<{
		message: string;
	}>
>('metaContactAdd', async (payload) => {
	try {
		const response = await axios.post(`${baseUrl}${metacontentUrl}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const updateMetaContactById = createAsyncThunk<
	{ message: string },
	{
		id: string;
		payload: {
			title: string;
			desc: string;
		};
	} & Partial<{
		message: string;
	}>
>('metaContactUpdate', async (payload) => {
	try {
		const response = await axios.put(`${baseUrl}${metacontentUrl}/${payload.id}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});
