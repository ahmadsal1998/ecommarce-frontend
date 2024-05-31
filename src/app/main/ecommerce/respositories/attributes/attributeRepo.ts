/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl, allAttributeUrl, attributesUrl } from '../urls';
import { ListRequestType } from '../../types/ListRequestType';
import { AttributeModel } from '../../models/products/attributes/AttributeModel';

type AttributeResponse = {
	data: Array<AttributeModel>;
	total: number;
};

export const fetchAttributs = createAsyncThunk<
	AttributeResponse,
	{ payload: ListRequestType } & Partial<AttributeResponse>
>('attributes', async (payload) => {
	const response = await axios.post(`${baseUrl}${allAttributeUrl}`, payload.payload);
	return response.data;
});

export const fetchAttributsWithValues = createAsyncThunk<AttributeResponse & Partial<AttributeResponse>>(
	'attributeswithvalues',
	async (payload) => {
		const response = await axios.get(`${baseUrl}${allAttributeUrl}`);
		return response.data;
	}
);

export const fetchAttributeById = createAsyncThunk<
	{ data: AttributeModel },
	{ id: string } & Partial<{ data: AttributeModel }>
>('attributeById', async (payload) => {
	const response = await axios.get(`${baseUrl}${attributesUrl}/${payload.id}`);
	return response.data;
});

export const addAttribute = createAsyncThunk<
	{ message: string },
	{
		payload: {
			var_title: string;
		};
	} & Partial<{
		message: string;
	}>
>('attributeAdd', async (payload) => {
	try {
		const response = await axios.post(`${baseUrl}${attributesUrl}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const updateAttributeById = createAsyncThunk<
	{ message: string },
	{
		id: string;
		payload: {
			var_title: string;
		};
	} & Partial<{
		message: string;
	}>
>('attributeUpdate', async (payload) => {
	try {
		const response = await axios.put(`${baseUrl}${attributesUrl}/${payload.id}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const deleteAttributesByIds = createAsyncThunk<
	{ message: string },
	{ ids: Array<string> } & Partial<{ message: string }>
>('deleteAttributes', async (payload) => {
	let ids: string = '';
	payload.ids.forEach((id) => {
		if (ids === '') {
			ids += id;
		} else {
			ids += `,${id}`;
		}
	});
	const response = await axios.delete(`${baseUrl}${attributesUrl}/${ids}`);
	return response.data;
});

export const updatAttributesStatusById = createAsyncThunk<
	{ message: string },
	{ payload: { is_active: boolean; uid: string } } & Partial<{ message: string }>
>('updatAttributesStatus', async (payload) => {
	const response = await axios.put(`${baseUrl}${attributesUrl}/${payload.payload.uid}`, payload.payload);
	return response.data;
});
