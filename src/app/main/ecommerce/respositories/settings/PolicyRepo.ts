/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { policyUrl, baseUrl } from '../urls';
import { PolicyModel } from '../../models/settings/PolicyModel';

type PolicyResponse = {
	data: Array<PolicyModel>;
	total: number;
};

export const fetchPolicy = createAsyncThunk<PolicyResponse, Partial<PolicyResponse>>('policyAll', async () => {
	const response = await axios.get(`${baseUrl}${policyUrl}`, {});
	return response.data;
});

export const addPolicy = createAsyncThunk<
	{ message: string },
	{
		payload: {
			tern_and_condition: string;
			shiping_policy: string;
			privacy_policy: string;
			return_policy: string;
		};
	} & Partial<{
		message: string;
	}>
>('policyAdd', async (payload) => {
	try {
		const response = await axios.post(`${baseUrl}${policyUrl}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const updatePolicyById = createAsyncThunk<
	{ message: string },
	{
		id: string;
		payload: {
			tern_and_condition: string;
			shiping_policy: string;
			privacy_policy: string;
			return_policy: string;
		};
	} & Partial<{
		message: string;
	}>
>('policyUpdate', async (payload) => {
	try {
		const response = await axios.put(`${baseUrl}${policyUrl}/${payload.id}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});
