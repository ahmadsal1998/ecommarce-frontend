/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { allSubCategoriesUrl, allsubcatbyparentUrl, baseUrl, subCategoriesUrl } from '../urls';
import { ListRequestType } from '../../types/ListRequestType';
import { SubCategoryModel } from '../../models/categories/SubCategory';

type SubCategoryResponse = {
	data: Array<SubCategoryModel>;
	total: number;
};

export const fetchSubCategories = createAsyncThunk<
	SubCategoryResponse,
	{ forAll: boolean; payload: ListRequestType } & Partial<SubCategoryResponse>
>('subCategories', async (payload) => {
	const response = await axios.post(`${baseUrl}${allSubCategoriesUrl}`, payload.forAll ? {} : payload.payload);
	return response.data;
});
export const fetchSubCategoriesById = createAsyncThunk<
	{ data: SubCategoryModel },
	{ id: string } & Partial<{ data: SubCategoryModel }>
>('subCategoriesById', async (payload) => {
	const response = await axios.get(`${baseUrl}${subCategoriesUrl}/${payload.id}`);
	return response.data;
});

export const fetchSubCategoriesParentById = createAsyncThunk<
	SubCategoryResponse,
	{ fk_parent: string } & Partial<SubCategoryResponse>
>('subCategoriesByParentId', async (payload) => {
	const response = await axios.post(`${baseUrl}${allsubcatbyparentUrl}/${payload.fk_parent}`);
	return response.data;
});

export const addSubCategory = createAsyncThunk<
	{ message: string },
	{
		payload: {
			title: string;
			fk_parent: string;
			file: string | File;
			is_home_active: string;
		};
	} & Partial<{
		message: string;
	}>
>('subCategoryAdd', async (payload) => {
	try {
		const formData = new FormData();
		if (payload.payload.file !== '') {
			formData.append('image', payload.payload.file);
		}
		formData.append('var_title', payload.payload.title);
		formData.append('fk_parent', payload.payload.fk_parent);
		formData.append('is_home_active', payload.payload.is_home_active);
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};
		const response = await axios.post(`${baseUrl}${subCategoriesUrl}`, formData, config);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const updateSubCategoryById = createAsyncThunk<
	{ message: string },
	{
		id: string;
		payload: {
			title: string;
			file: string | File;
			is_home_active: string;
		};
	} & Partial<{
		message: string;
	}>
>('subCategorypdate', async (payload) => {
	try {
		const formData = new FormData();
		if (payload.payload.file !== '') {
			formData.append('image', payload.payload.file);
		}
		formData.append('var_title', payload.payload.title);
		formData.append('is_home_active', payload.payload.is_home_active);
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};
		const response = await axios.put(`${baseUrl}${subCategoriesUrl}/${payload.id}`, formData, config);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const deleteSubCategoryByIds = createAsyncThunk<
	{ message: string },
	{ ids: Array<string> } & Partial<{ message: string }>
>('deleteSubCategories', async (payload) => {
	let ids: string = '';
	payload.ids.forEach((id) => {
		if (ids === '') {
			ids += id;
		} else {
			ids += `,${id}`;
		}
	});
	const response = await axios.delete(`${baseUrl}${subCategoriesUrl}/${ids}`);
	return response.data;
});

export const updatSubCategoriesStatusById = createAsyncThunk<
	{ message: string },
	{ payload: { is_active: boolean; is_home_active: boolean; uid: string } } & Partial<{ message: string }>
>('updatSubCategoriesStatus', async (payload) => {
	const response = await axios.put(`${baseUrl}${subCategoriesUrl}/${payload.payload.uid}`, payload.payload);
	return response.data;
});
