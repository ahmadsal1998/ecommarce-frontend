import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import {
	deleteSubCategoryByIds,
	fetchSubCategories,
	fetchSubCategoriesParentById,
	updatSubCategoriesStatusById
} from '../../respositories/categories/SubCategoriesRepo';
import { SubCategoryModel } from '../../models/categories/SubCategory';

type AppRootStateType = RootStateType<subCategoriesSliceType>;
type initialStateProps = {
	categories: Array<SubCategoryModel>;
	isSelected: boolean;
	rows: Array<object>;
	searchText: string;
	page: number;
	total: number;
	selectedRows: Array<string>;
	pageSize: number;
	sort: { _id: number };
	isLoading: boolean;
	allDataSelected: boolean;
	isDeleted: boolean;
	isStatusChange: boolean;
	forUpdate: boolean;
};
const initialState: initialStateProps = {
	categories: [],
	isSelected: false,
	page: 1,
	isLoading: false,
	isDeleted: false,
	rows: [],
	allDataSelected: false,
	pageSize: 10,
	sort: { _id: -1 },
	total: 0,
	selectedRows: [],
	searchText: '',
	isStatusChange: false,
	forUpdate: false
};
export const subCategoriesSlice = createSlice({
	name: 'subcategories',
	initialState,
	reducers: {
		setCategory(state, action) {
			state.categories.push(action.payload as SubCategoryModel);
		},
		setForCategoryUpdate(state, action) {
			state.forUpdate = action.payload as boolean;
		},
		setSelected(state, action) {
			state.isSelected = action.payload as boolean;
		},
		setCategories(state, action) {
			state.categories.concat(action.payload as Array<SubCategoryModel>);
		},
		setUCategorySelection(state, action) {
			if (state.selectedRows.length === 0) {
				if (state.rows.length === (action.payload as []).length) {
					state.selectedRows = action.payload as [];
					state.allDataSelected = true;
				} else {
					state.selectedRows = action.payload as [];
				}
			} else if ((action.payload as []).length === 0) {
				state.allDataSelected = false;
				state.selectedRows = [];
			} else {
				state.selectedRows = action.payload as [];
			}
			state.selectedRows = action.payload as [];
			state.isSelected = state.selectedRows.length > 0;
		},
		searchUser(state, action) {
			state.searchText = action.payload as string;
		},
		setPage(state, action) {
			state.page = action.payload as number;
		},
		setPageSize(state, action) {
			state.pageSize = action.payload as number;
		},
		setSort(state, action) {
			state.sort = action.payload as { _id: -1 };
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchSubCategories.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchSubCategories.fulfilled, (state, action) => {
			state.isLoading = false;
			
			state.categories = action.payload.data;
			state.total = action.payload.total;
			state.rows = [];
			
			for (let i: number = 0; i < state.categories.length; i += 1) {
				
				state.rows.push({
					id: state.categories[i].int_glcode ? state.categories[i].int_glcode : i,
					image: state.categories[i].var_icon,
					name: state.categories[i].var_title,
					parent: state.categories[i].category.length > 0 ? state.categories[i].category[0].var_title : '',
					homedisplay: state.categories[i].is_home_active ? state.categories[i].is_home_active : false,
					publish: state.categories[i].is_active as boolean
				});
			}
		});

		builder.addCase(fetchSubCategoriesParentById.fulfilled, (state, action) => {
			state.isLoading = false;
			state.categories = action.payload.data;
			state.total = action.payload.total;
		});
		builder.addCase(fetchSubCategories.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(updatSubCategoriesStatusById.pending, (state) => {
			state.isLoading = true;
			state.isStatusChange = false;
		});
		builder.addCase(updatSubCategoriesStatusById.fulfilled, (state) => {
			state.isLoading = false;
			state.isStatusChange = true;
		});
		builder.addCase(updatSubCategoriesStatusById.rejected, (state) => {
			state.isLoading = false;
			state.isStatusChange = false;
		});

		builder.addCase(deleteSubCategoryByIds.pending, (state) => {
			state.isLoading = true;
			state.isDeleted = false;
		});
		builder.addCase(deleteSubCategoryByIds.fulfilled, (state) => {
			state.isLoading = false;
			state.isDeleted = true;
		});
		builder.addCase(deleteSubCategoryByIds.rejected, (state) => {
			state.isLoading = false;
			state.isDeleted = false;
		});
	}
});
export const {
	setCategory,
	setCategories,
	setSelected,
	searchUser,
	setPage,
	setPageSize,
	setSort,
	setForCategoryUpdate,
	setUCategorySelection
} = subCategoriesSlice.actions;
export const selectSubCategorySlice = appSelector(({ subcategories }: AppRootStateType) => subcategories);

export type subCategoriesSliceType = typeof subCategoriesSlice;
export default subCategoriesSlice.reducer;
