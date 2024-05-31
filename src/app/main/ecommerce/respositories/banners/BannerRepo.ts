/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl, allBannerUrl, bannersUrl } from '../urls';
import { ListRequestType } from '../../types/ListRequestType';
import { BannerModel } from '../../models/banners/BannerModel';

type BannerResponse = {
	data: Array<BannerModel>;
	total: number;
};

export const fetchBanners = createAsyncThunk<BannerResponse, { payload: ListRequestType } & Partial<BannerResponse>>(
	'banners',
	async (payload) => {
		const response = await axios.post(`${baseUrl}${allBannerUrl}`, payload.payload);
		return response.data;
	}
);

export const fetchBannerById = createAsyncThunk<{ data: BannerModel }, { id: string } & Partial<{ data: BannerModel }>>(
	'bannerById',
	async (payload) => {
		const response = await axios.get(`${baseUrl}${bannersUrl}/${payload.id}`);
		return response.data;
	}
);

export const addBanner = createAsyncThunk<
	{ message: string },
	{
		payload: {
			var_title: string;
			txt_description: string;
			var_image: string;
		};
	} & Partial<{
		message: string;
	}>
>('bannerAdd', async (payload) => {
	try {
		const response = await axios.post(`${baseUrl}${bannersUrl}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const updateBannerById = createAsyncThunk<
	{ message: string },
	{
		id: string;
		payload: {
			var_title: string;
			txt_description: string;
			var_image: string;
		};
	} & Partial<{
		message: string;
	}>
>('bannerUpdate', async (payload) => {
	try {
		const response = await axios.put(`${baseUrl}${bannersUrl}/${payload.id}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const deleteBannerByIds = createAsyncThunk<
	{ message: string },
	{ ids: Array<string> } & Partial<{ message: string }>
>('deleteBanner', async (payload) => {
	let ids: string = '';
	payload.ids.forEach((id) => {
		if (ids === '') {
			ids += id;
		} else {
			ids += `,${id}`;
		}
	});
	const response = await axios.delete(`${baseUrl}${bannersUrl}/${ids}`);
	return response.data;
});

export const updatBannerStatusById = createAsyncThunk<
	{ message: string },
	{ uid: string, payload: { chr_publish: string } } & Partial<{ message: string }>
>('updatBannerStatus', async (payload) => {
	const response = await axios.put(`${baseUrl}${bannersUrl}/${payload.uid}`, payload.payload);
	return response.data;
});
