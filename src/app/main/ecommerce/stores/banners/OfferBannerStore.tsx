import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { OfferBannerModel } from '../../models/banners/OfferBannerModel';
import {
	deleteOfferBannerByIds,
	fetchOfferBanners,
	updatOfferBannerStatusById,
	updateOfferBannerById
} from '../../respositories/banners/OfferBannerRepo';

type AppRootStateType = RootStateType<deliveryBannerOfferSliceType>;
type initialStateProps = {
	banners: Array<OfferBannerModel>;
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
	page: 0,
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
export const BannerOfferSlotSlice = createSlice({
	name: 'bannerOffer',
	initialState,
	reducers: {
		setBannerForUpate(state, action) {
			state.forUpdate = action.payload as boolean;
		},
		setSelected(state, action) {
			state.isSelected = action.payload as boolean;
		},
		setBanners(state, action) {
			state.banners.concat(action.payload as Array<OfferBannerModel>);
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
		builder.addCase(fetchOfferBanners.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchOfferBanners.fulfilled, (state, action) => {
			state.isLoading = false;
			state.banners = action.payload.data;
			state.total = action.payload.total;
			state.rows = [];
		
			for (let i: number = 0; i < state.banners.length; i += 1) {
				
				state.rows.push({
					id: state.banners[i].int_glcode,
					title: state.banners[i].var_title,
					banner: state.banners[i].var_image,
					publish: state.banners[i].chr_publish
				});
			}
		});

		builder.addCase(fetchOfferBanners.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(updateOfferBannerById.pending, (state) => {
			state.isLoading = true;
			state.isStatusChange = false;
		});
		builder.addCase(updateOfferBannerById.fulfilled, (state) => {
			state.isLoading = false;
			state.isStatusChange = true;
		});
		builder.addCase(updateOfferBannerById.rejected, (state) => {
			state.isLoading = false;
			state.isStatusChange = false;
		});
		builder.addCase(updatOfferBannerStatusById.pending, (state) => {
			state.isLoading = true;
			state.isStatusChange = false;
		});
		builder.addCase(updatOfferBannerStatusById.fulfilled, (state) => {
			state.isLoading = false;
			state.isStatusChange = true;
		});
		builder.addCase(updatOfferBannerStatusById.rejected, (state) => {
			state.isLoading = false;
			state.isStatusChange = false;
		});

		builder.addCase(deleteOfferBannerByIds.pending, (state) => {
			state.isLoading = true;
			state.isDeleted = false;
		});
		builder.addCase(deleteOfferBannerByIds.fulfilled, (state) => {
			state.isLoading = false;
			state.isDeleted = true;
		});
		builder.addCase(deleteOfferBannerByIds.rejected, (state) => {
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
} = BannerOfferSlotSlice.actions;
export const selectBannerOfferSlotSlice = appSelector(({ bannerOffer }: AppRootStateType) => bannerOffer);

export type deliveryBannerOfferSliceType = typeof BannerOfferSlotSlice;
export default BannerOfferSlotSlice.reducer;
