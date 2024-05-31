import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { BrandModel } from '../../models/brands/BrandModel';
import {
	deleteBrandByIds,
	fetchBrands,
	updatBrandStatusById,
	updateBrandById
} from '../../respositories/brands/BrandsRepo';

type AppRootStateType = RootStateType<brandsSliceType>;
type initialStateProps = {
	brands: Array<BrandModel>;
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
	brands: [],
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
export const brandsSlice = createSlice({
	name: 'brands',
	initialState,
	reducers: {
		setBrand(state, action) {
			state.brands.push(action.payload as BrandModel);
		},
		setSelected(state, action) {
			state.isSelected = action.payload as boolean;
		},
		setBrands(state, action) {
			state.brands.concat(action.payload as Array<BrandModel>);
		},
		setBrandsSelection(state, action) {
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
		searchBrands(state, action) {
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
		builder.addCase(fetchBrands.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchBrands.fulfilled, (state, action) => {
			state.isLoading = false;
			state.brands = action.payload.data;
			state.total = action.payload.total;
			state.rows = [];
			
			for (let i: number = 0; i < state.brands.length; i += 1) {
				
				state.rows.push({
					id: state.brands[i].int_glcode ? state.brands[i].int_glcode : i,
					image: state.brands[i].var_icon,
					name: state.brands[i].var_title,
					publish: state.brands[i].is_active
				});
			}
		});
		builder.addCase(fetchBrands.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(updateBrandById.pending, (state) => {
			state.isLoading = true;
			state.isStatusChange = false;
		});
		builder.addCase(updateBrandById.fulfilled, (state) => {
			state.isLoading = false;
			state.isStatusChange = true;
		});
		builder.addCase(updateBrandById.rejected, (state) => {
			state.isLoading = false;
			state.isStatusChange = false;
		});

		builder.addCase(updatBrandStatusById.pending, (state) => {
			state.isLoading = true;
			state.isStatusChange = false;
		});
		builder.addCase(updatBrandStatusById.fulfilled, (state) => {
			state.isLoading = false;
			state.isStatusChange = true;
		});
		builder.addCase(updatBrandStatusById.rejected, (state) => {
			state.isLoading = false;
			state.isStatusChange = false;
		});

		builder.addCase(deleteBrandByIds.pending, (state) => {
			state.isLoading = true;
			state.isDeleted = false;
		});
		builder.addCase(deleteBrandByIds.fulfilled, (state) => {
			state.isLoading = false;
			state.isDeleted = true;
		});
		builder.addCase(deleteBrandByIds.rejected, (state) => {
			state.isLoading = false;
			state.isDeleted = false;
		});
	}
});
export const { setBrand, setBrands, setSelected, searchBrands, setPage, setSort, setPageSize, setBrandsSelection } = brandsSlice.actions;
export const selectBrandsSlice = appSelector(({ brands }: AppRootStateType) => brands);

export type brandsSliceType = typeof brandsSlice;
export default brandsSlice.reducer;
