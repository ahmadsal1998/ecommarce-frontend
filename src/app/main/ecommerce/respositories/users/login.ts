/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { baseUrl, loginUrl } from '../urls';
import { UserModel } from '../../models/users/UsersModel';

type LoginResponse = {
	data: UserModel;
};

export const loginRepo = createAsyncThunk<LoginResponse, { id: string } & Partial<LoginResponse>>(
	'login',
	async (payload: object, { signal }) => {
		const source = axios.CancelToken.source();
		signal.addEventListener('abort', () => {
			source.cancel();
		});
		const response = await axios.get(`${baseUrl}/${loginUrl}`, {
			cancelToken: source.token
		});
		return response.data;
	}
);
