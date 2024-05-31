/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl, allOfferBannersUrl, offerBannersUrl } from '../urls';
import { ListRequestType } from '../../types/ListRequestType';
import { OfferBannerModel } from '../../models/banners/OfferBannerModel';

type OfferBannerResponse = {
	data: Array<OfferBannerModel>;
	total: number;
};

export const fetchOfferBanners = createAsyncThunk<
	OfferBannerResponse,
	{ payload: ListRequestType } & Partial<OfferBannerResponse>
>('offerBanners', async (payload) => {
	const response = await axios.post(`${baseUrl}${allOfferBannersUrl}`, payload.payload);
	return response.data;
});

export const fetchOfferBannerById = createAsyncThunk<
	{ data: OfferBannerModel },
	{ id: string } & Partial<{ data: OfferBannerModel }>
>('OfferBannerById', async (payload) => {
	const response = await axios.get(`${baseUrl}${offerBannersUrl}/${payload.id}`);
	return response.data;
});

export const addOfferBanner = createAsyncThunk<
	{ message: string },
	{
		payload: {
			var_title: string;
			var_image: string;
		};
	} & Partial<{
		message: string;
	}>
>('OfferBannerAdd', async (payload) => {
	try {
		const response = await axios.post(`${baseUrl}${offerBannersUrl}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const updateOfferBannerById = createAsyncThunk<
	{ message: string },
	{
		id: string;
		payload: {
			var_title: string;
			var_image: string;
		};
	} & Partial<{
		message: string;
	}>
>('offerBannerUpdate', async (payload) => {
	try {
		const response = await axios.put(`${baseUrl}${offerBannersUrl}/${payload.id}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const deleteOfferBannerByIds = createAsyncThunk<
	{ message: string },
	{ ids: Array<string> } & Partial<{ message: string }>
>('deleteOfferBanner', async (payload) => {
	let ids: string = '';
	payload.ids.forEach((id) => {
		if (ids === '') {
			ids += id;
		} else {
			ids += `,${id}`;
		}
	});
	const response = await axios.delete(`${baseUrl}${offerBannersUrl}/${ids}`);
	return response.data;
});

export const updatOfferBannerStatusById = createAsyncThunk<
	{ message: string },
	{ uid: string, payload: { chr_publish: string } } & Partial<{ message: string }>
>('updatOfferBannerStatus', async (payload) => {
	const response = await axios.put(`${baseUrl}${offerBannersUrl}/${payload.uid}`, payload.payload);
	return response.data;
});
