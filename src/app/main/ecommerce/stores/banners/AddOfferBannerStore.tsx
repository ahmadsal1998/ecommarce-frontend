import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import {
	addOfferBanner,
	fetchOfferBannerById,
	updateOfferBannerById
} from '../../respositories/banners/OfferBannerRepo';
import { OfferBannerModel } from '../../models/banners/OfferBannerModel';

type AppRootStateType = RootStateType<addBannerOfferSliceType>;
type initialStateProps = {
	banner: OfferBannerModel;
	name: string;
	error_name: string;
	forUpdate: boolean;
	image: string;
	isFormValid: boolean;
	isBannerCreated: boolean;
	message: string;
	dialogOpen: boolean;
	isLoading: boolean;
};
const initialState: initialStateProps = {
	banner: null,
	name: '',
	image: '',
	error_name: '',
	forUpdate: false,
	isFormValid: false,
	isBannerCreated: false,
	message: '',
	dialogOpen: false,
	isLoading: false
};
export const addOfferBannerSlice = createSlice({
	name: 'addofferbanner',
	initialState,
	reducers: {
		setBrand(state, action) {
			state.banner = action.payload as OfferBannerModel;
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
		bannerDialogOpenClose(state, action){
			state.dialogOpen = !state.dialogOpen;
		},
		cleanForm(state) {
			state.name = '';
			state.image ='';
		},
		validateForm(state) {
			if (state.name !== '' && state.error_name === '' && state.image !== '') {
				state.isFormValid = true;
			} else {
				state.isFormValid = false;
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addOfferBanner.pending, (state) => {
			state.isLoading = true;
			state.isBannerCreated = false;
		});
		builder.addCase(addOfferBanner.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
			state.name = '';
			state.isBannerCreated = true;
		});
		builder.addCase(addOfferBanner.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
			state.isBannerCreated = false;
		});
		builder.addCase(fetchOfferBannerById.fulfilled, (state, action) => {
			state.banner = action.payload.data;
			state.name = state.banner.var_title;
			state.image = state.banner.var_image;
			state.isFormValid = true;
			state.isLoading = false;
		});

		builder.addCase(fetchOfferBannerById.pending, (state) => {
			state.isLoading = true;
			state.isBannerCreated = false;
		});
		builder.addCase(updateOfferBannerById.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
			state.isBannerCreated = true;
		});
		builder.addCase(updateOfferBannerById.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
			state.isBannerCreated = false;
		});
	}
});
export const { setBrand, setName,bannerDialogOpenClose, cleanForm, validateForm, setBannerForUpate, setImage } = addOfferBannerSlice.actions;
export const selectAddOfferBannerSlice = appSelector(({ addofferbanner }: AppRootStateType) => addofferbanner);

export type addBannerOfferSliceType = typeof addOfferBannerSlice;
export default addOfferBannerSlice.reducer;
