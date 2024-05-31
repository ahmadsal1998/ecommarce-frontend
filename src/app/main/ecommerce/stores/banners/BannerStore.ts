import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { BannerModel } from '../../models/banners/BannerModel';
import {
	deleteBannerByIds,
	fetchBanners,
	updatBannerStatusById,
	updateBannerById
} from '../../respositories/banners/BannerRepo';

type AppRootStateType = RootStateType<deliveryBannerSliceType>;
type initialStateProps = {
	banners: Array<BannerModel>;
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
	isSelected: false,
	banners: [],
	rows: [],
	searchText: '',
	page: 1,
	total: 0,
	selectedRows: [],
	pageSize: 10,
	sort: {
		_id: -1
	},
	isLoading: false,
	allDataSelected: false,
	isDeleted: false,
	isStatusChange: false,
	forUpdate: false
};
export const BannerSlotSlice = createSlice({
	name: 'banner',
	initialState,
	reducers: {
		setBannerForUpate(state, action) {
			state.banners.push(action.payload as BannerModel);
		},
		setSelected(state, action) {
			state.isSelected = action.payload as boolean;
		},
		setBanners(state, action) {
			state.banners.concat(action.payload as Array<BannerModel>);
		},
		setBannerSelection(state, action) {
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
		searchBanner(state, action) {
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
		builder.addCase(fetchBanners.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchBanners.fulfilled, (state, action) => {
			state.isLoading = false;
			state.banners = action.payload.data;
			state.total = action.payload.total;
			state.rows = [];
			
			for (let i: number = 0; i < state.banners.length; i += 1) {
			
				state.rows.push({
					id: state.banners[i].int_glcode,
					title: state.banners[i].var_title,
					descriptioin: state.banners[i].txt_description,
					banner: state.banners[i].var_image,
					publish: state.banners[i].chr_publish
				});
			}
		});

		builder.addCase(fetchBanners.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(updateBannerById.pending, (state) => {
			state.isLoading = true;
			state.isStatusChange = false;
		});
		builder.addCase(updateBannerById.fulfilled, (state) => {
			state.isLoading = false;
			state.isStatusChange = true;
		});
		builder.addCase(updateBannerById.rejected, (state) => {
			state.isLoading = false;
			state.isStatusChange = false;
		});

		builder.addCase(updatBannerStatusById.pending, (state) => {
			state.isLoading = true;
			state.isStatusChange = false;
		});
		builder.addCase(updatBannerStatusById.fulfilled, (state) => {
			state.isLoading = false;
			state.isStatusChange = true;
		});
		builder.addCase(updatBannerStatusById.rejected, (state) => {
			state.isLoading = false;
			state.isStatusChange = false;
		});

		builder.addCase(deleteBannerByIds.pending, (state) => {
			state.isLoading = true;
			state.isDeleted = false;
		});
		builder.addCase(deleteBannerByIds.fulfilled, (state) => {
			state.isLoading = false;
			state.isDeleted = true;
		});
		builder.addCase(deleteBannerByIds.rejected, (state) => {
			state.isLoading = false;
			state.isDeleted = false;
		});
	}
});
export const {
	setBannerForUpate,
	setSelected,
	setBanners,
	setBannerSelection,
	searchBanner,
	setPage,
	setPageSize,
	setSort
} = BannerSlotSlice.actions;
export const selectBannerSlotSlice = appSelector(({ banner }: AppRootStateType) => banner);

export type deliveryBannerSliceType = typeof BannerSlotSlice;
export default BannerSlotSlice.reducer;
