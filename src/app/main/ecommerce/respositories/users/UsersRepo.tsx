/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addressUrl, allAddressUrl, baseUrl, usersUrl, userUrl } from '../urls';
import { UserModel } from '../../models/users/UsersModel';
import { ListRequestType } from '../../types/ListRequestType';
import { AddressModel } from '../../models/address/AddressModel';

type LoginResponse = {
	data: Array<UserModel>;
	total: number;
};

export const fetchUsers = createAsyncThunk<LoginResponse, { payload: ListRequestType } & Partial<LoginResponse>>(
	'user',
	async (payload) => {
		const response = await axios.post(`${baseUrl}${usersUrl}`, payload.payload);
		return response.data;
	}
);
type AddresResponse = {
	data: Array<AddressModel>;
	total: number;
};
export const fetchUserAddress = createAsyncThunk<
	AddresResponse,
	{
		payload: {
			id: string;
		};
	} & Partial<AddresResponse>
>('allAddress', async (payload) => {
	const response = await axios.post(`${baseUrl}${allAddressUrl}`, payload.payload);
	return response.data;
});

export const updateUserStatusById = createAsyncThunk<
	{ message: string },
	{ payload: { is_active: boolean; uid: string } } & Partial<{ message: string }>
>('userStatusUpdate', async (payload) => {
	const response = await axios.put(`${baseUrl}${userUrl}/${payload.payload.uid}`, payload.payload);
	return response.data;
});

export const addUser = createAsyncThunk<
	{ message: string },
	{
		payload: {
			name: string;
			email: string;
			mobile_no: string;
			password: string;
			file: string | File;
			adress: Array<AddressModel>;
		};
	} & Partial<{
		message: string;
	}>
>('userAdd', async (payload) => {
	try {
		const address = [];
		payload.payload.adress.forEach((adr) => {
			address.push({
				var_house_no: adr.var_house_no,
				var_app_name: adr.var_app_name,
				var_landmark: adr.var_landmark,
				var_country: adr.var_country,
				var_state: adr.var_state,
				var_city: adr.var_city,
				chr_type: adr.chr_type,
				default_status: adr.default_status,
				var_pincode: adr.var_pincode
			});
		});
		const formData = new FormData();
		if (payload.payload.file !== '') {
			formData.append('image', payload.payload.file);
		}
		formData.append('var_name', payload.payload.name);
		formData.append('var_email', payload.payload.email);
		formData.append('var_mobile_no', payload.payload.mobile_no);
		formData.append('var_password', payload.payload.password);
		formData.append('address', JSON.stringify(address));

		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};
		const response = await axios.post(`${baseUrl}${userUrl}`, formData, config);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const updateUserById = createAsyncThunk<
	{ message: string },
	{
		payload: {
			id: string;
			name: string;
			email: string;
			mobile_no: string;
			password: string;
			file: string | File;
			adress: Array<AddressModel>;
		};
	} & Partial<{
		message: string;
	}>
>('userUpdate', async (payload) => {
	try {
		const address = [];
		payload.payload.adress.forEach((adr) => {
			address.push({
				int_glcode: adr.int_glcode,
				var_fk_user: adr.fk_user,
				var_house_no: adr.var_house_no,
				var_app_name: adr.var_app_name,
				var_landmark: adr.var_landmark,
				var_country: adr.var_country,
				var_state: adr.var_state,
				var_city: adr.var_city,
				chr_type: adr.chr_type,
				default_status: adr.default_status,
				var_pincode: adr.var_pincode
			});
		});
		const formData = new FormData();
		if (payload.payload.file !== '') {
			formData.append('image', payload.payload.file);
		}
		formData.append('var_name', payload.payload.name);
		formData.append('address', JSON.stringify(address));

		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};
		const response = await axios.put(`${baseUrl}${userUrl}/${payload.payload.id}`, formData, config);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const deleteUser = createAsyncThunk<{ message: string }, { ids: Array<string> } & Partial<{ message: string }>>(
	'deleteUser',
	async (payload) => {
		let ids: string = '';
		payload.ids.forEach((id) => {
			if (ids === '') {
				ids += id;
			} else {
				ids += `,${id}`;
			}
		});
		const response = await axios.delete(`${baseUrl}${usersUrl}/${ids}`);
		return response.data;
	}
);
export const deleteAddressById = createAsyncThunk<{ message: string }, { id: string } & Partial<{ message: string }>>(
	'deleteAddress',
	async (payload) => {
		const response = await axios.delete(`${baseUrl}${addressUrl}/${payload.id}`);
		return response.data;
	}
);

export const getUserById = createAsyncThunk<{ data: UserModel }, { id: string } & Partial<{ data: UserModel }>>(
	'getUser',
	async (payload) => {
		const response = await axios.get(`${baseUrl}${userUrl}/${payload.id}`);
		return response.data;
	}
);
