/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { companyDetailsUrl, baseUrl } from '../urls';

type CompanyDetailsResponse = {
	data: Array<CompanyDetailModel>;
	total: number;
};

export const fetchCompanyDetails = createAsyncThunk<CompanyDetailsResponse, Partial<CompanyDetailsResponse>>(
	'allCompany',
	async () => {
		const response = await axios.get(`${baseUrl}${companyDetailsUrl}`, {});
		return response.data;
	}
);

export const addCompanyDetails = createAsyncThunk<
	{ message: string },
	{
		payload: {
			companyName: string;
            mobile:  string;
            email:  string;
            gst:  string;
            address:  string;
		};
	} & Partial<{
		message: string;
	}>
>('companyAdd', async (payload) => {
	try {
		const response = await axios.post(`${baseUrl}${companyDetailsUrl}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const updateCompanyDetailById = createAsyncThunk<
	{ message: string },
	{
		id: string;
		payload: {
			companyName: string;
            mobile:  string;
            email:  string;
            gst:  string;
            address:  string;
		};
	} & Partial<{
		message: string;
	}>
>('companyDetails', async (payload) => {
	try {
		const response = await axios.put(`${baseUrl}${companyDetailsUrl}/${payload.id}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});
