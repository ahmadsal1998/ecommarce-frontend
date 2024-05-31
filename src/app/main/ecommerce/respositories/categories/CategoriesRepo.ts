/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl, categoriesUrl, allCategoriesUrl } from '../urls';
import { ListRequestType } from '../../types/ListRequestType';
import { CategoryModel } from '../../models/categories/Category';

type CategoryResponse = {
	data: Array<CategoryModel>;
	total: number;
};

export const fetchCategories = createAsyncThunk<
	CategoryResponse,
	{ forAll: boolean; payload: ListRequestType } & Partial<CategoryResponse>
>('categories', async (payload) => {
	const response = await axios.post(`${baseUrl}${allCategoriesUrl}`, payload.forAll ? {} : payload.payload);
	return response.data;
});
export const fetchCategoriesById = createAsyncThunk<
	{ data: CategoryModel },
	{ id: string } & Partial<{ data: CategoryModel }>
>('categoriesById', async (payload) => {
	const response = await axios.get(`${baseUrl}${categoriesUrl}/${payload.id}`);
	return response.data;
});

export const addCategory = createAsyncThunk<
	{ message: string },
	{
		payload: {
			title: string;
			file: string | File;
		};
	} & Partial<{
		message: string;
	}>
>('categoryAdd', async (payload) => {
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
		const response = await axios.post(`${baseUrl}${categoriesUrl}`, formData, config);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const updateCategoryById = createAsyncThunk<
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
>('categoryUpdate', async (payload) => {
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
		const response = await axios.put(`${baseUrl}${categoriesUrl}/${payload.id}`, formData, config);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const deleteCategoryByIds = createAsyncThunk<
	{ message: string },
	{ ids: Array<string> } & Partial<{ message: string }>
>('deleteCategories', async (payload) => {
	let ids: string = '';
	payload.ids.forEach((id) => {
		if (ids === '') {
			ids += id;
		} else {
			ids += `,${id}`;
		}
	});
	const response = await axios.delete(`${baseUrl}${categoriesUrl}/${ids}`);
	return response.data;
});

export const updatCategoriesStatusById = createAsyncThunk<
	{ message: string },
	{ payload: { is_active: boolean; is_home_active: boolean; uid: string } } & Partial<{ message: string }>
>('updatCategoriesStatus', async (payload) => {
	const response = await axios.put(`${baseUrl}${categoriesUrl}/${payload.payload.uid}`, payload.payload);
	return response.data;
});
