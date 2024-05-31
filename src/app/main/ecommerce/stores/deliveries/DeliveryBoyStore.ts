import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { DeliveryBoyModel } from '../../models/delivery/DeliveryBoyModel';
import {
	deleteDeliveryByIds,
	fetchDeliveryBoys,
	updatDeliveryBoyStatusById
} from '../../respositories/deliveries/DeliveryBoyListRepo';

type AppRootStateType = RootStateType<deliveryBoySliceType>;
type initialStateProps = {
	deliveries: Array<DeliveryBoyModel>;
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
	deliveries: undefined,
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
export const deliveryBoySlice = createSlice({
	name: 'deliveryboy',
	initialState,
	reducers: {
		setForDeliveryUpdate(state, action) {
			state.forUpdate = action.payload as boolean;
		},
		setSelected(state, action) {
			state.isSelected = action.payload as boolean;
		},
		setDeliverySelection(state, action) {
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
		search(state, action) {
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
		builder.addCase(fetchDeliveryBoys.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchDeliveryBoys.fulfilled, (state, action) => {
			state.isLoading = false;
			state.deliveries = action.payload.data;
			state.total = action.payload.total;
			state.rows = [];
			if (state.allDataSelected) {
				state.selectedRows = [];
			}
			for (let i: number = 0; i < state.deliveries.length; i += 1) {
				if (state.allDataSelected) {
					state.selectedRows.push(
						state.deliveries[i].int_glcode ? state.deliveries[i].int_glcode : i.toString()
					);
				}
				state.rows.push({
					id: state.deliveries[i].int_glcode ? state.deliveries[i].int_glcode : i,
					profile: state.deliveries[i].var_profile,
					name: state.deliveries[i].var_name,
					email: state.deliveries[i].var_email,
					block: state.deliveries[i].current_status,
					phoneno: state.deliveries[i].var_mobile_no,
					publish: state.deliveries[i].chr_status
				});
			}
		});
		builder.addCase(fetchDeliveryBoys.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(updatDeliveryBoyStatusById.pending, (state) => {
			state.isLoading = true;
			state.isStatusChange = false;
		});
		builder.addCase(updatDeliveryBoyStatusById.fulfilled, (state) => {
			state.isLoading = false;
			state.isStatusChange = true;
		});
		builder.addCase(updatDeliveryBoyStatusById.rejected, (state) => {
			state.isLoading = false;
			state.isStatusChange = false;
		});

		builder.addCase(deleteDeliveryByIds.pending, (state) => {
			state.isLoading = true;
			state.isDeleted = false;
		});
		builder.addCase(deleteDeliveryByIds.fulfilled, (state) => {
			state.isLoading = false;
			state.isDeleted = true;
		});
		builder.addCase(deleteDeliveryByIds.rejected, (state) => {
			state.isLoading = false;
			state.isDeleted = false;
		});
	}
});
export const { setSelected, setForDeliveryUpdate, setDeliverySelection, search, setPage, setPageSize, setSort } =
	deliveryBoySlice.actions;
export const selectDeliveryBoySlice = appSelector(({ deliveryboy }: AppRootStateType) => deliveryboy);

export type deliveryBoySliceType = typeof deliveryBoySlice;
export default deliveryBoySlice.reducer;
