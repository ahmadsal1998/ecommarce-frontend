import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { CategoryModel } from '../../models/categories/Category';
import { SubCategoryModel } from '../../models/categories/SubCategory';
import { fetchCategories } from '../../respositories/categories/CategoriesRepo';
import {
	addSubCategory,
	fetchSubCategoriesById,
	updateSubCategoryById
} from '../../respositories/categories/SubCategoriesRepo';

type AppRootStateType = RootStateType<addSubCategorySliceType>;
type initialStateProps = {
	category: SubCategoryModel;
	parentsCats: Array<CategoryModel>;
	name: string;
	error_name: string;
	error_parentCats: string;
	selectedParentCats: string;
	forUpdate: boolean;
	imagePicked: boolean;
	isFormValid: boolean;
	isLoading: boolean;
	message: string;
	homeDisplay: boolean;
	dialogOpen: boolean;
	isCategoryCreated: boolean;
};
const initialState: initialStateProps = {
	category: null,
	name: '',
	parentsCats: [],
	selectedParentCats: '',
	imagePicked: false,
	error_name: '',
	forUpdate: false,
	error_parentCats: '',
	isFormValid: false,
	isLoading: false,
	message: '',
	homeDisplay: false,
	isCategoryCreated: false,
	dialogOpen: false
};
export const addSubCategorySlice = createSlice({
	name: 'addsubcategory',
	initialState,
	reducers: {
		setCategory(state, action) {
			state.category = action.payload as SubCategoryModel;
		},
		setName(state, action) {
			state.name = action.payload as string;
		},
		setHomeDisplay(state) {
			state.homeDisplay = !state.homeDisplay;
		},
		setParentSubCats(state, action) {
			state.parentsCats = action.payload as Array<CategoryModel>;
		},
		setCategoryForUpate(state, action) {
			state.forUpdate = action.payload as boolean;
		},
		setCreated(state, action) {
			state.isCategoryCreated = action.payload as boolean;
		},
		selectParantCats(state, action) {
			state.selectedParentCats = action.payload as string;
		},
		setImagePicked(state, action) {
			state.imagePicked = action.payload as boolean;
		},
		cleanForm(state) {
			state.name = '';
		},
		categoryDialogOpen(state) {
			state.dialogOpen = !state.dialogOpen;
		},
		validateForm(state) {
			if (state.forUpdate) {
				if (
					state.name !== '' &&
					state.error_name === '' &&
					state.error_parentCats === '' &&
					state.selectedParentCats != null
				) {
					state.isFormValid = true;
				} else {
					state.isFormValid = false;
				}
			} else if (
				state.name !== '' &&
				state.error_name === '' &&
				state.imagePicked &&
				state.error_parentCats === '' &&
				state.selectedParentCats != null
			) {
				state.isFormValid = true;
			} else {
				state.isFormValid = false;
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCategories.fulfilled, (state, action) => {
			state.isLoading = false;
			state.parentsCats = action.payload.data.filter((data) => data.is_active);
			if (!state.forUpdate) {
				state.selectedParentCats = state.parentsCats.length>0?state.parentsCats[0].int_glcode:"";
			} else {
				state.selectedParentCats = state.category.fk_parent;
			}
		});
		builder.addCase(addSubCategory.pending, (state) => {
			state.isLoading = true;
			state.isCategoryCreated = false;
		});
		builder.addCase(addSubCategory.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
			state.name = '';
			state.isCategoryCreated = true;
		});
		builder.addCase(addSubCategory.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
			state.isCategoryCreated = false;
		});
		builder.addCase(fetchSubCategoriesById.fulfilled, (state, action) => {
			state.category = action.payload.data;
			state.name = state.category.var_title;
			state.homeDisplay = state.category.is_home_active;
			state.isFormValid = true;
			state.isLoading = false;
		});

		builder.addCase(updateSubCategoryById.pending, (state) => {
			state.isLoading = true;
			state.isCategoryCreated = false;
		});
		builder.addCase(updateSubCategoryById.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
			state.isCategoryCreated = true;
		});
		builder.addCase(updateSubCategoryById.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
			state.isCategoryCreated = false;
		});
	}
});
export const {
	setCategory,
	setName,
	cleanForm,
	validateForm,
	setHomeDisplay,
	setCreated,
	setImagePicked,
	categoryDialogOpen,
	setCategoryForUpate,
	setParentSubCats,
	selectParantCats
} = addSubCategorySlice.actions;
export const selectAddSubCategorySlice = appSelector(({ addsubcategory }: AppRootStateType) => addsubcategory);

export type addSubCategorySliceType = typeof addSubCategorySlice;
export default addSubCategorySlice.reducer;
