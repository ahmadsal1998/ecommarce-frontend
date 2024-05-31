/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl, allProductsUrl, productsUrl } from '../urls';
import { ListRequestType } from '../../types/ListRequestType';
import { ProductModel } from '../../models/products/product/ProductModel';
import { VarientModel } from '../../models/products/verient/VarientModel';

type ProductResponse = {
	data: Array<ProductModel>;
	total: number;
};

export const fetchProduct = createAsyncThunk<ProductResponse, { payload: ListRequestType } & Partial<ProductResponse>>(
	'products',
	async (payload) => {
		const response = await axios.post(`${baseUrl}${allProductsUrl}`,  payload.payload);
		return response.data;
	}
);
export const fetchProductById = createAsyncThunk<
	{ data: ProductModel },
	{ id: string } & Partial<{ data: ProductModel }>
>('productsById', async (payload) => {
	const response = await axios.get(`${baseUrl}${productsUrl}/${payload.id}`);
	return response.data;
});

export const addProduct = createAsyncThunk<
	{ message: string },
	{
		payload: {
			var_title: string;
			fk_category: string;
			fk_subcategory: string;
			fk_brand: string;
			fk_tags: Array<string>;
			var_gst: string;
			var_short_description: string;
			txt_description: string;
			var_offer: string;
			var_price: string;
			sku_id: string,
			txt_nutrition: string,
			home_display: string;
			var_image:  string;
			variants: Array<VarientModel>;
		};
	} & Partial<{
		message: string;
	}>
>('productAdd', async (payload) => {
	try {
		const response = await axios.post(`${baseUrl}${productsUrl}`, payload.payload );
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const updateProductById = createAsyncThunk<
	{ message: string },
	{
		id: string;
		payload: {
			var_title: string;
			fk_category: string;
			fk_subcategory: string;
			fk_brand: string;
			fk_tags: Array<string>;
			var_gst: string;
			var_short_description: string;
			txt_description: string;
			var_offer: string;
			sku_id: string,
			txt_nutrition: string,
			var_price: string;
			home_display: string;
			var_image: string;
			variants: Array<VarientModel>;
		};
	} & Partial<{
		message: string;
	}>
>('productUpdate', async (payload) => {
	try {
		console.log(payload)
		const response = await axios.put(`${baseUrl}${productsUrl}/${payload.id}`, payload.payload);
		return response.data;
	} catch (e: unknown) {
		throw (e as { response: { data: object } }).response.data;
	}
});

export const deleteProductsByIds = createAsyncThunk<
	{ message: string },
	{ ids: Array<string> } & Partial<{ message: string }>
>('deleteProduct', async (payload) => {
	let ids: string = '';
	payload.ids.forEach((id) => {
		if (ids === '') {
			ids += id;
		} else {
			ids += `,${id}`;
		}
	});
	const response = await axios.delete(`${baseUrl}${productsUrl}/${ids}`);
	return response.data;
});

export const updateProductsStatusById = createAsyncThunk<
	{ message: string },
	{ uid: string; payload: { chr_publish: boolean } } & Partial<{ message: string }>
>('updatProductStatus', async (payload) => {
	const response = await axios.put(`${baseUrl}${productsUrl}/${payload.uid}`, payload.payload);
	return response.data;
});
