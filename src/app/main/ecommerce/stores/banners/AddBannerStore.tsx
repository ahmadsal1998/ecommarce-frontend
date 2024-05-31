import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { addBanner, fetchBannerById, updateBannerById } from '../../respositories/banners/BannerRepo';
import { BannerModel } from '../../models/banners/BannerModel';

type AppRootStateType = RootStateType<addBannerSliceType>;
type initialStateProps = {
	banner: BannerModel;
	name: string;
	desc: string;
	error_desc: string;
	serror_name: string;
	forUpdate: boolean;
	image: string;
	isFormValid: boolean;
	isBannerCreated: boolean;
	message: string;
	error_name: string;
	dialogOpen: boolean;
	isLoading: boolean;
};
const initialState: initialStateProps = {
	banner: null,
	name: '',
	desc: '',
	error_desc: '',
	image: '',
	error_name: '',
	message: '',
	isLoading: false,
	isBannerCreated: false,
	dialogOpen: false,
	forUpdate: false,
	isFormValid: false,
	serror_name: ''
};
export const addBannerSlice = createSlice({
	name: 'addbanner',
	initialState,
	reducers: {
		setBrand(state, action) {
			state.banner = action.payload as BannerModel;
		},
		setName(state, action) {
			state.name = action.payload as string;
			if (state.name === '') {
				state.error_name = 'Name is required field';
			} else {
				state.error_name = '';
			}
		},
		setBannerForUpate(state, action) {
			state.forUpdate = action.payload as boolean;
		},
		setImage(state, action) {
			state.image = action.payload as string;
		},
		setDesc(state, action) {
			state.desc = action.payload as string;
			if (state.desc === '') {
				state.error_desc = 'Description is required field';
			} else {
				state.error_desc = '';
			}
		},
		bannerDialogOpenClose(state, action) {
			state.dialogOpen = !state.dialogOpen;
		},
		cleanForm(state) {
			state.name = '';
			state.desc = '';
			state.image = '';
		},
		validateForm(state) {
			if (
				state.name !== '' &&
				state.desc !== '' &&
				state.image !== '' &&
				state.error_desc === '' &&
				state.error_name === ''
			) {
				state.isFormValid = true;
			} else {
				state.isFormValid = false;
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addBanner.pending, (state) => {
			state.isLoading = true;
			state.isBannerCreated = false;
		});
		builder.addCase(addBanner.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
			state.name = '';
			state.isBannerCreated = true;
		});
		builder.addCase(addBanner.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
			state.isBannerCreated = false;
		});
		builder.addCase(fetchBannerById.fulfilled, (state, action) => {
			state.banner = action.payload.data;
			state.name = state.banner.var_title;
			state.desc = state.banner.txt_description;
			state.image = state.banner.var_image;
			state.isFormValid = true;
			state.isLoading = false;
		});

		builder.addCase(fetchBannerById.pending, (state) => {
			state.isLoading = true;
			state.isBannerCreated = false;
		});
		builder.addCase(updateBannerById.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
			state.isBannerCreated = true;
		});
		builder.addCase(updateBannerById.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
			state.isBannerCreated = false;
		});
	}
});
export const {
	setBrand,
	setName,
	bannerDialogOpenClose,
	cleanForm,
	validateForm,
	setBannerForUpate,
	setDesc,
	setImage
} = addBannerSlice.actions;
export const selectAddBannerSlice = appSelector(({ addbanner }: AppRootStateType) => addbanner);

export type addBannerSliceType = typeof addBannerSlice;
export default addBannerSlice.reducer;
