/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl, allTagsUrl, tagsUrl } from '../urls';
import { ListRequestType } from '../../types/ListRequestType';
import { TagModel } from '../../models/tags/TagsModel';

type TagsResponse = {
	data: Array<TagModel>;
	total: number;
};

export const fetchTags = createAsyncThunk<TagsResponse, { payload: ListRequestType } & Partial<TagsResponse>>(
	'alltags',
	async (payload) => {
		const response = await axios.post(`${baseUrl}${allTagsUrl}`, payload.payload);
		return response.data;
	}
);

export const fetchTagById = createAsyncThunk<{ data: TagModel }, { id: string } & Partial<{ data: TagModel }>>(
	'findTagById',
	async (payload) => {
		const response = await axios.get(`${baseUrl}${tagsUrl}/${payload.id}`);
		return response.data;
	}
);

export const addTag = createAsyncThunk<
	{ message: string },
	{
		payload: {
			title: string;
			file: string | File;
		};
	} & Partial<{
		message: string;
	}>
>('tagAdd', async (payload) => {
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
		const response = await axios.post(`${baseUrl}${tagsUrl}`, formData, config);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const updateTagById = createAsyncThunk<
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
>('tagUpdate', async (payload) => {
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
		const response = await axios.put(`${baseUrl}${tagsUrl}/${payload.id}`, formData, config);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const deleteTagsByIds = createAsyncThunk<
	{ message: string },
	{ ids: Array<string> } & Partial<{ message: string }>
>('deleteTags', async (payload) => {
	let ids: string = '';
	payload.ids.forEach((id) => {
		if (ids === '') {
			ids += id;
		} else {
			ids += `,${id}`;
		}
	});
	const response = await axios.delete(`${baseUrl}${tagsUrl}/${ids}`);
	return response.data;
});

export const updatTagStatusById = createAsyncThunk<
	{ message: string },
	{ payload: { is_active: boolean; uid: string } } & Partial<{ message: string }>
>('updatTagStatus', async (payload) => {
	const response = await axios.put(`${baseUrl}${tagsUrl}/${payload.payload.uid}`, payload.payload);
	return response.data;
});
