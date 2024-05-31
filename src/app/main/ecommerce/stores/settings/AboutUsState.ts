import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { AboutUsModel } from '../../models/settings/AboutUsModel';
import { addAboutUs, fetchAboutUs, updateAboutUsById } from '../../respositories/settings/AboutUsRepo';

type AppRootStateType = RootStateType<addAboutUsType>;
type initialStateProps = {
	metaContent: AboutUsModel;
	id: string;
	content: string;
	banner: string;
	forUpdate: boolean;
	isFormValid: boolean;
	isLoading: boolean;
	message: string;
	dialogOpen: boolean;
};
const initialState: initialStateProps = {
	metaContent: null,
	id: '',
	forUpdate: false,
	isFormValid: false,
	isLoading: false,
	message: '',
	dialogOpen: false,
	content: '',
	banner: ''
};
export const addAboutUsSlice = createSlice({
	name: 'addAboutUs',
	initialState,
	reducers: {
		setContent(state, action) {
			state.content = action.payload as string;
		},
		setBanner(state, action) {
			state.banner = action.payload as string;
		},
		toggleAboutDailog(state) {
			state.dialogOpen = !state.dialogOpen;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAboutUs.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchAboutUs.fulfilled, (state, action) => {
			if (action.payload.data.length > 0) {
				state.id = action.payload.data[0].int_glcode;
				state.content = action.payload.data[0].content;
				state.banner = action.payload.data[0].banner;
				
			}
            state.isFormValid = true;
				state.isLoading = false;
		});
		builder.addCase(addAboutUs.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(addAboutUs.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
		});
		builder.addCase(addAboutUs.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
		});
		builder.addCase(updateAboutUsById.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(updateAboutUsById.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
		});
		builder.addCase(updateAboutUsById.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
		});
	}
});
export const { setContent, setBanner, toggleAboutDailog } = addAboutUsSlice.actions;
export const selectAddAboutUsSlice = appSelector(({ addAboutUs }: AppRootStateType) => addAboutUs);

export type addAboutUsType = typeof addAboutUsSlice;
export default addAboutUsSlice.reducer;
