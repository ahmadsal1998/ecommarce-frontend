/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl, rolesUlr, allrolesUrl } from '../urls';
import { ListRequestType } from '../../types/ListRequestType';
import { RoleModel } from '../../models/users/RoleModel';

type RoleResponse = {
	data: Array<RoleModel>;
	total: number;
};

export const fetchRoleUsers = createAsyncThunk<RoleResponse, { payload: ListRequestType } & Partial<RoleResponse>>(
	'usersRole',
	async (payload) => {
		const response = await axios.post(`${baseUrl}${allrolesUrl}`, payload.payload);
		return response.data;
	}
);

export const updateUserRoleStatusById = createAsyncThunk<
	{ message: string },
	{ payload: { is_active: boolean; uid: string } } & Partial<{ message: string }>
>('userRoleStatusUpdate', async (payload) => {
	const response = await axios.put(`${baseUrl}${rolesUlr}/${payload.payload.uid}`, payload.payload);
	return response.data;
});

export const addUserRole = createAsyncThunk<
	{ message: string },
	{
		payload: {
			role: string;
			type: string;
			desc: string;
			lable: string;
			subroles: Array<object>;
		};
	} & Partial<{
		message: string;
	}>
>('userRoleAdd', async (payload) => {
	try {
		const response = await axios.post(`${baseUrl}${rolesUlr}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const updateUserRoleById = createAsyncThunk<
	{ message: string },
	{
		id: string;
		payload: {
			role: string;
			type: string;
			desc: string;
			lable: string;
			subroles: Array<object>;
		};
	} & Partial<{
		message: string;
	}>
>('userRoleUpdate', async (payload) => {
	try {
		const response = await axios.put(`${baseUrl}${rolesUlr}/${payload.id}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const deleteUserRole = createAsyncThunk<
	{ message: string },
	{ ids: Array<string> } & Partial<{ message: string }>
>('deleteUserRole', async (payload) => {
	let ids: string = '';
	payload.ids.forEach((id) => {
		if (ids === '') {
			ids += id;
		} else {
			ids += `,${id}`;
		}
	});
	const response = await axios.delete(`${baseUrl}${rolesUlr}/${ids}`);
	return response.data;
});

export const getUserRoleById = createAsyncThunk<{ data: RoleModel }, { id: string } & Partial<{ data: RoleModel }>>(
	'getUserRole',
	async (payload) => {
		const response = await axios.get(`${baseUrl}${rolesUlr}/${payload.id}`);
		return response.data;
	}
);
