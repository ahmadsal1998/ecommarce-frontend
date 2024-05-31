/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { aboutUrl, baseUrl } from '../urls';
import { AboutUsModel } from '../../models/settings/AboutUsModel';

type AboutUsResponse = {
	data: Array<AboutUsModel>;
	total: number;
};

export const fetchAboutUs = createAsyncThunk<AboutUsResponse, Partial<AboutUsResponse>>('allAboutUs', async () => {
	const response = await axios.get(`${baseUrl}${aboutUrl}`, {});
	return response.data;
});

export const addAboutUs = createAsyncThunk<
	{ message: string },
	{
		payload: {
			content: string;
			banner: string;
		};
	} & Partial<{
		message: string;
	}>
>('aboutUsAdd', async (payload) => {
	try {
		const response = await axios.post(`${baseUrl}${aboutUrl}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const updateAboutUsById = createAsyncThunk<
	{ message: string },
	{
		id: string;
		payload: {
			content: string;
			banner: string;
		};
	} & Partial<{
		message: string;
	}>
>('aboutUsUpdate', async (payload) => {
	try {
		const response = await axios.put(`${baseUrl}${aboutUrl}/${payload.id}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});
