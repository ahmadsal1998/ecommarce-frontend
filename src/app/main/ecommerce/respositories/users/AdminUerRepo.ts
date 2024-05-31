/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl, alladminsUrl, adminsUrl } from '../urls';
import { UserModel } from '../../models/users/UsersModel';
import { ListRequestType } from '../../types/ListRequestType';

type UserResponse = {
	data: Array<UserModel>;
	total: number;
};

export const fetchAdminUsers = createAsyncThunk<UserResponse, { payload: ListRequestType } & Partial<UserResponse>>(
	'adminUsers',
	async (payload) => {
		const response = await axios.post(`${baseUrl}${alladminsUrl}`, payload.payload);
		return response.data;
	}
);

export const updateAdminUserStatusById = createAsyncThunk<
	{ message: string },
	{ payload: { is_active: boolean; uid: string } } & Partial<{ message: string }>
>('userAdminStatusUpdate', async (payload) => {
	const response = await axios.put(`${baseUrl}${adminsUrl}/${payload.payload.uid}`, payload.payload);
	return response.data;
});

export const addAdminUser = createAsyncThunk<
	{ message: string },
	{
		payload: {
			var_name: string;
			var_email: string;
			var_mobile_no: string;
			var_password: string;
			role_id: string;
		};
	} & Partial<{
		message: string;
	}>
>('adminUserAdd', async (payload) => {
	try {
		const response = await  axios.post(`${baseUrl}${adminsUrl}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const updateAdminUserById = createAsyncThunk<
	{ message: string },
	{
		id: string;
		payload: {
			var_name: string;
			var_email: string;
			var_mobile_no: string;
			role_id: string;
		};
	} & Partial<{
		message: string;
	}>
>('adminUserUpdate', async (payload) => {
	try {
		const response = await axios.put(`${baseUrl}${adminsUrl}/${payload.id}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const deleteAdminUser = createAsyncThunk<
	{ message: string },
	{ ids: Array<string> } & Partial<{ message: string }>
>('deleteAdminUser', async (payload) => {
	let ids: string = '';
	payload.ids.forEach((id) => {
		if (ids === '') {
			ids += id;
		} else {
			ids += `,${id}`;
		}
	});
	const response = await axios.delete(`${baseUrl}${adminsUrl}/${ids}`);
	return response.data;
});

export const getAdminUserById = createAsyncThunk<{ data: UserModel }, { id: string } & Partial<{ data: UserModel }>>(
	'getAdminUser',
	async (payload) => {
		const response = await axios.get(`${baseUrl}${adminsUrl}/${payload.id}`);
		return response.data;
	}
);
