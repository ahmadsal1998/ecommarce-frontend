/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl, allBrandUrl, brandsUrl } from '../urls';
import { ListRequestType } from '../../types/ListRequestType';
import { BrandModel } from '../../models/brands/BrandModel';

type BrandResponse = {
	data: Array<BrandModel>;
	total: number;
};

export const fetchBrands = createAsyncThunk<BrandResponse, { payload: ListRequestType } & Partial<BrandResponse>>(
	'brand',
	async (payload) => {
		const response = await axios.post(`${baseUrl}${allBrandUrl}`, payload.payload);
		return response.data;
	}
);

export const fetchBrandById = createAsyncThunk<{ data: BrandModel }, { id: string } & Partial<{ data: BrandModel }>>(
	'brandById',
	async (payload) => {
		const response = await axios.get(`${baseUrl}${brandsUrl}/${payload.id}`);
		return response.data;
	}
);

export const addBrand = createAsyncThunk<
	{ message: string },
	{
		payload: {
			title: string;
			file: string | File;
		};
	} & Partial<{
		message: string;
	}>
>('brandAdd', async (payload) => {
	try {
		const formData = new FormData();
		if (payload.payload.file !== '') {
			formData.append('image', payload.payload.file);
		}
		formData.append('var_title', payload.payload.title);
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};
		const response = await axios.post(`${baseUrl}${brandsUrl}`, formData, config);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const updateBrandById = createAsyncThunk<
	{ message: string },
	{
		id: string;
		payload: {
			title: string;
			file: string | File;
		};
	} & Partial<{
		message: string;
	}>
>('brandUpdate', async (payload) => {
	try {
		const formData = new FormData();
		if (payload.payload.file !== '') {
			formData.append('image', payload.payload.file);
		}
		formData.append('var_title', payload.payload.title);
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};
		const response = await axios.put(`${baseUrl}${brandsUrl}/${payload.id}`, formData, config);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const deleteBrandByIds = createAsyncThunk<
	{ message: string },
	{ ids: Array<string> } & Partial<{ message: string }>
>('deleteBrands', async (payload) => {
	let ids: string = '';
	payload.ids.forEach((id) => {
		if (ids === '') {
			ids += id;
		} else {
			ids += `,${id}`;
		}
	});
	const response = await axios.delete(`${baseUrl}${brandsUrl}/${ids}`);
	return response.data;
});

export const updatBrandStatusById = createAsyncThunk<
	{ message: string },
	{ payload: { is_active: boolean;  uid: string } } & Partial<{ message: string }>
>('updatBrandsStatus', async (payload) => {
	const response = await axios.put(`${baseUrl}${brandsUrl}/${payload.payload.uid}`, payload.payload);
	return response.data;
});
