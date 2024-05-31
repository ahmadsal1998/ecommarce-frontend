import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { CategoryModel } from '../../models/categories/Category';
import { addCategory, fetchCategoriesById, updateCategoryById } from '../../respositories/categories/CategoriesRepo';

type AppRootStateType = RootStateType<addCategorySliceType>;
type initialStateProps = {
	category: CategoryModel;
	name: string;
	error_name: string;
	forUpdate: boolean;
	imagePicked: boolean;
	isFormValid: boolean;
	isLoading: boolean;
	message: string;
	dialogOpen: boolean;
	isCategoryCreated: boolean;
};
const initialState: initialStateProps = {
	category: null,
	name: '',
	imagePicked: false,
	error_name: '',
	forUpdate: false,
	isLoading: false,
	isFormValid: false,
	message: '',
	isCategoryCreated: false,
	dialogOpen: false
};
export const addCategorySlice = createSlice({
	name: 'addcategory',
	initialState,
	reducers: {
		setCategory(state, action) {
			state.category = action.payload as CategoryModel;
		},
		setName(state, action) {
			state.name = action.payload as string;
		},
		setCategoryForUpate(state, action) {
			state.forUpdate = action.payload as boolean;
		},
		setImagePicked(state, action) {
			state.imagePicked = action.payload as boolean;
		},
		cleanForm(state) {
			state.name = '';
		},
		userDialogOpen(state) {
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
		builder.addCase(addCategory.pending, (state) => {
			state.isLoading = true;
			state.isCategoryCreated = false;
		});
		builder.addCase(addCategory.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
			state.name = '';
			state.isCategoryCreated = true;
		});
		builder.addCase(addCategory.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
			state.isCategoryCreated = false;
		});
		builder.addCase(fetchCategoriesById.fulfilled, (state, action) => {
			state.category = action.payload.data;
			state.name = state.category.var_title;
			state.isFormValid = true;
			state.isLoading = false;
		});

		builder.addCase(updateCategoryById.pending, (state) => {
			state.isLoading = true;
			state.isCategoryCreated = false;
		});
		builder.addCase(updateCategoryById.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
			state.isCategoryCreated = true;
		});
		builder.addCase(updateCategoryById.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
			state.isCategoryCreated = false;
		});
	}
});
export const { setCategory, userDialogOpen, setName, cleanForm, validateForm, setImagePicked, setCategoryForUpate } =
	addCategorySlice.actions;
export const selectAddCategorySlice = appSelector(({ addcategory }: AppRootStateType) => addcategory);

export type addCategorySliceType = typeof addCategorySlice;
export default addCategorySlice.reducer;
