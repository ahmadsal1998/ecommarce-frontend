import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { PromoModel } from '../../models/promo/PromoMode';
import { deletePromoByIds, fetchPromo, updatPromoStatusById } from '../../respositories/promocodes/PromocodeRepo';

type AppRootStateType = RootStateType<promoCodeSliceType>;
type initialStateProps = {
	promo: Array<PromoModel>;
	isSelected: boolean;
	isLoading: boolean;
	isDeleted: boolean;
	isChangedStatus: boolean;
	rows: Array<object>;
	error: string;
	allDataSelected: boolean;
	total: number;
	selectedRows: Array<string>;
	searchText: string;
	page: number;
	pageSize: number;
	sort: { _id: number };
};
const initialState: initialStateProps = {
	isSelected: false,
	promo: [],
	isLoading: false,
	isDeleted: false,
	isChangedStatus: false,
	rows: [],
	error: '',
	allDataSelected: false,
	total: 0,
	selectedRows: [],
	searchText: '',
	page: 1,
	pageSize: 10,
	sort: {
		_id: -1
	}
};
export const promotCodesSlotSlice = createSlice({
	name: 'promoCodes',
	initialState,
	reducers: {
		setPromo(state, action) {
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

			state.isSelected = state.selectedRows.length > 0;
		},
		setPage(state, action) {
			state.page = action.payload as number;
		},
		setPageSize(state, action) {
			state.pageSize = action.payload as number;
		},
		setSort(state, action) {
			state.sort = action.payload as { _id: -1 };
		},
		searchPromos(state, action) {
			state.searchText = action.payload as string;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPromo.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchPromo.fulfilled, (state, action) => {
			state.isLoading = false;
			state.promo = action.payload.data;
			state.total = action.payload.total;
			state.rows = [];
			
			for (let i: number = 0; i < state.promo.length; i += 1) {
				
				state.rows.push({
					id: state.promo[i].int_glcode,
					couponcode: state.promo[i].var_promocode,
					discountpercentage: state.promo[i].var_percentage,
					maxdiscountprice: state.promo[i].max_discount_price,
					minorderprice: state.promo[i].min_order,
					useperuser: state.promo[i].no_of_time,
					expirydate: state.promo[i].expiry_date,
					publish: state.promo[i].chr_publish
				});
			}
		});
		builder.addCase(fetchPromo.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		});
		builder.addCase(deletePromoByIds.pending, (state) => {
			state.isDeleted = false;
			state.isLoading = true;
		});
		builder.addCase(deletePromoByIds.fulfilled, (state) => {
			state.isDeleted = true;
			state.selectedRows = [];
			state.isLoading = false;
			state.isSelected = state.selectedRows.length > 0;
		});
		builder.addCase(deletePromoByIds.rejected, (state) => {
			state.isDeleted = false;
			state.isLoading = false;
		});
		builder.addCase(updatPromoStatusById.pending, (state) => {
			state.isChangedStatus = false;
		});
		builder.addCase(updatPromoStatusById.fulfilled, (state) => {
			state.isChangedStatus = true;
		});
		builder.addCase(updatPromoStatusById.rejected, (state) => {
			state.isChangedStatus = false;
		});
	}
});
export const { searchPromos, setSort, setPage, setPageSize, setPromo } = promotCodesSlotSlice.actions;
export const selectPromoCodeSlotSlice = appSelector(({ promoCodes }: AppRootStateType) => promoCodes);

export type promoCodeSliceType = typeof promotCodesSlotSlice;
export default promotCodesSlotSlice.reducer;
