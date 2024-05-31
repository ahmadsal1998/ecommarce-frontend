import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { BrandModel } from '../../models/brands/BrandModel';
import { addBrand, fetchBrandById, updateBrandById } from '../../respositories/brands/BrandsRepo';

type AppRootStateType = RootStateType<addBrandSliceType>;
type initialStateProps = {
	brand: BrandModel;
	name: string;
	error_name: string;
	forUpdate: boolean;
	imagePicked: boolean;
	isFormValid: boolean;
	isLoading: boolean;
	message: string;
	dialogOpen: boolean;
	isBrandCreated: boolean;
};
const initialState: initialStateProps = {
	brand: null,
	name: '',
	imagePicked: false,
	error_name: '',
	forUpdate: false,
	isFormValid: false,
	message: '',
	isBrandCreated: false,
	isLoading: false,
	dialogOpen: false
};
export const addBrandSlice = createSlice({
	name: 'addbrand',
	initialState,
	reducers: {
		setBrand(state, action) {
			state.brand = action.payload as BrandModel;
		},
		setName(state, action) {
			state.name = action.payload as string;
		},
		setImagePicked(state, action) {
			state.imagePicked = action.payload as boolean;
		},
		cleanForm(state) {
			state.name = '';
		},
		setBrandForUpate(state, action) {
			state.forUpdate = action.payload as boolean;
		},
		brandDialogOpen(state) {
			state.dialogOpen = !state.dialogOpen;
		},
		validateForm(state) {
			if (state.forUpdate) {
				if (state.name !== '' && state.error_name === '' ) {
					state.isFormValid = true;
				} else {
					state.isFormValid = false;
				}
			} else if (state.name !== '' && state.error_name === '' && state.imagePicked) {
				state.isFormValid = true;
			} else {
				state.isFormValid = false;
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addBrand.pending, (state) => {
			state.isLoading = true;
			state.isBrandCreated = false;
		});
		builder.addCase(addBrand.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
			state.name = '';
			state.isBrandCreated = true;
		});
		builder.addCase(addBrand.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
			state.isBrandCreated = false;
		});
		builder.addCase(fetchBrandById.fulfilled, (state, action) => {
			state.brand = action.payload.data;
			state.name = state.brand.var_title;
			state.isFormValid = true;
			state.isLoading = false;
		});

		builder.addCase(fetchBrandById.pending, (state) => {
			state.isLoading = true;
			state.isBrandCreated = false;
		});
		builder.addCase(updateBrandById.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
			state.isBrandCreated = true;
		});
		builder.addCase(updateBrandById.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
			state.isBrandCreated = false;
		});
	}
});
export const { setBrand, setName, cleanForm, validateForm, setImagePicked, brandDialogOpen, setBrandForUpate } = addBrandSlice.actions;
export const selectAddBrandSlice = appSelector(({ addbrand }: AppRootStateType) => addbrand);

export type addBrandSliceType = typeof addBrandSlice;
export default addBrandSlice.reducer;
