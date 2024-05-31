/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl, allAttributeValueUrl, attributeValuesUrl } from '../urls';
import { AttributeValueModel } from '../../models/products/attributes/AttributeValueModel';

type AttributeValueResponse = {
	data: Array<AttributeValueModel>;
	total: number;
};

export const fetchAttributeValues = createAsyncThunk<
	AttributeValueResponse,
	{
		payload: {
			limit: number;
			page: number;
			sort: unknown;
			search: string;
			attribute_id: string;
		};
	} & Partial<AttributeValueResponse>
>('AttributeValues', async (payload) => {
	const response = await axios.post(`${baseUrl}${allAttributeValueUrl}`, payload.payload);
	return response.data;
});

export const fetchAttributeValueById = createAsyncThunk<
	{ data: AttributeValueModel },
	{ id: string } & Partial<{ data: AttributeValueModel }>
>('attributeValueById', async (payload) => {
	
	const response = await axios.get(`${baseUrl}${attributeValuesUrl}/${payload.id}`);
	console.log(response.data)
	return response.data;
});

export const addAttributesValue = createAsyncThunk<
	{ message: string },
	{
		payload: {
			var_title: string;
			colorCode: string;
			attribute_id: string;
		};
	} & Partial<{
		message: string;
	}>
>('attributeValueAdd', async (payload) => {
	try {
		const response = await axios.post(`${baseUrl}${attributeValuesUrl}`,payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const updateAttributeValueById = createAsyncThunk<
	{ message: string },
	{
		id: string;
		payload: {
			var_title: string;
			attribute_id: string;
			colorCode: string;
		};
	} & Partial<{
		message: string;
	}>
>('attributeValueUpdate', async (payload) => {
	try {
		const response = await axios.put(`${baseUrl}${attributeValuesUrl}/${payload.id}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const deleteAttributesByIds = createAsyncThunk<
	{ message: string },
	{ ids: Array<string> } & Partial<{ message: string }>
>('deleteValueAttributes', async (payload) => {
	let ids: string = '';
	payload.ids.forEach((id) => {
		if (ids === '') {
			ids += id;
		} else {
			ids += `,${id}`;
		}
	});
	const response = await axios.delete(`${baseUrl}${attributeValuesUrl}/${ids}`);
	return response.data;
});

export const updatAttributeValueStatusById = createAsyncThunk<
	{ message: string },
	{ payload: { is_active: boolean; uid: string } } & Partial<{ message: string }>
>('updatAttributesValueStatus', async (payload) => {
	const response = await axios.put(`${baseUrl}${attributeValuesUrl}/${payload.payload.uid}`, payload.payload);
	return response.data;
});
