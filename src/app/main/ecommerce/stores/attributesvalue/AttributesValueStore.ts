import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { AttributeValueModel } from '../../models/products/attributes/AttributeValueModel';
import {
	deleteAttributesByIds,
	fetchAttributeValues,
	updatAttributeValueStatusById
} from '../../respositories/attributes/attributeValueRepo';
import { updateAttributeById } from '../../respositories/attributes/attributeRepo';

type AppRootStateType = RootStateType<attributesValueSliceType>;
type initialStateProps = {
	attributes: Array<AttributeValueModel>;
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
	attributes: [],
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
export const attributeValueSlice = createSlice({
	name: 'attributesValue',
	initialState,
	reducers: {
		setAttributeValue(state, action) {
			state.attributes.push(action.payload as AttributeValueModel);
		},
		setAttributeValues(state, action) {
			state.attributes.concat(action.payload as Array<AttributeValueModel>);
		},
		setSelected(state, action) {
			state.isSelected = action.payload as boolean;
		},
		setAttributeValuesSelection(state, action) {
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
		searchAttributeValues(state, action) {
			state.searchText = action.payload as string;
		},
		setPage(state, action) {
			
			state.page = action.payload as number;
			console.log(state.page)
		},
		setPageSize(state, action) {
			state.pageSize = action.payload as number;
		},
		setSort(state, action) {
			state.sort = action.payload as { _id: -1 };
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAttributeValues.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchAttributeValues.fulfilled, (state, action) => {
			state.isLoading = false;
			state.attributes = action.payload.data;
			state.total = action.payload.total;
			state.rows = [];
			
			for (let i: number = 0; i < state.attributes.length; i += 1) {
				
				state.rows.push({
					id: state.attributes[i].int_glcode ? state.attributes[i].int_glcode : i,
					name: state.attributes[i].var_title,
					publish: state.attributes[i].is_active
				});
			}
		});
		builder.addCase(fetchAttributeValues.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(updateAttributeById.pending, (state) => {
			state.isLoading = true;
			state.isStatusChange = false;
		});
		builder.addCase(updateAttributeById.fulfilled, (state) => {
			state.isLoading = false;
			state.isStatusChange = true;
		});
		builder.addCase(updateAttributeById.rejected, (state) => {
			state.isLoading = false;
			state.isStatusChange = false;
		});

		builder.addCase(updatAttributeValueStatusById.pending, (state) => {
			state.isLoading = true;
			state.isStatusChange = false;
		});
		builder.addCase(updatAttributeValueStatusById.fulfilled, (state) => {
			state.isLoading = false;
			state.isStatusChange = true;
		});
		builder.addCase(updatAttributeValueStatusById.rejected, (state) => {
			state.isLoading = false;
			state.isStatusChange = false;
		});

		builder.addCase(deleteAttributesByIds.pending, (state) => {
			state.isLoading = true;
			state.isDeleted = false;
		});
		builder.addCase(deleteAttributesByIds.fulfilled, (state) => {
			state.isLoading = false;
			state.isDeleted = true;
		});
		builder.addCase(deleteAttributesByIds.rejected, (state) => {
			state.isLoading = false;
			state.isDeleted = false;
		});
	}
});
export const {
	setAttributeValue,
	setAttributeValues,
	setSelected,
	searchAttributeValues,
	setPage,
	setSort,
	setPageSize,
	setAttributeValuesSelection
} = attributeValueSlice.actions;
export const selectAttributeValueSlice = appSelector(({ attributesValue }: AppRootStateType) => attributesValue);

export type attributesValueSliceType = typeof attributeValueSlice;
export default attributeValueSlice.reducer;
