import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { CategoryModel } from '../../models/categories/Category';
import { SubCategoryModel } from '../../models/categories/SubCategory';

type AppRootStateType = RootStateType<addSubCategorySliceType>;
type initialStateProps = {

	category: SubCategoryModel;
	parentsCats: Array<CategoryModel>;
	name: string;
	error_name: string;
	error_parentCats: string;
	selectedParentCats: number;
	forUpdate: boolean;
	imagePicked: boolean;
	isFormValid: boolean;
};
const initialState: initialStateProps = {
	category: null,
	name: '',
	parentsCats: [],
	selectedParentCats: 1,
	imagePicked: false,
	error_name: '',
	forUpdate: false,
	error_parentCats: '',
	isFormValid: false	
};
export const addSubCategorySlice = createSlice({
	name: 'addProduct',
	initialState,
	reducers: {
		setCategory(state, action) {
			state.category = action.payload as SubCategoryModel;
		},
		setName(state, action) {
			state.name = action.payload as string;
		},
		setParentSubCats(state, action) {
			state.parentsCats = action.payload as Array<CategoryModel>;
		},
		selectParantCats(state, action) {
			state.selectedParentCats = action.payload as number;
		},
		setImagePicked(state, action) {
			state.imagePicked = action.payload as boolean;
		},
		cleanForm(state) {
			state.name = '';
		},
		validateForm(state) {
			if (
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


});
export const {
	setCategory,
	setName,
	cleanForm,
	validateForm,
	setImagePicked,
	setParentSubCats,
	selectParantCats
} = addSubCategorySlice.actions;
export const selectAddSubCategorySlice = appSelector(({ addProduct }: AppRootStateType) => addProduct);

export type addSubCategorySliceType = typeof addSubCategorySlice;
export default addSubCategorySlice.reducer;
