import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { AttributeModel } from '../../models/products/attributes/AttributeModel';
import {
	deleteAttributesByIds,
	fetchAttributs,
	fetchAttributsWithValues,
	updatAttributesStatusById,
	updateAttributeById
} from '../../respositories/attributes/attributeRepo';

type AppRootStateType = RootStateType<attributesSliceType>;
type initialStateProps = {
	attributes: Array<AttributeModel>;
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
export const attributeSlice = createSlice({
	name: 'attributes',
	initialState,
	reducers: {
		clearSelectAttribut(state, action){
			state.attributes.forEach((data)=>{
				data.isChecked= false;
			})
		},	
		setAttribute(state, action) {
			state.attributes.push(action.payload as AttributeModel);
		},
		setSelected(state, action) {
			state.isSelected = action.payload as boolean;
		},
		setAttributes(state, action) {
			state.attributes.concat(action.payload as Array<AttributeModel>);
		},
		setAttributeSelection(state, action) {
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
		searchAttribute(state, action) {
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
		builder.addCase(fetchAttributs.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchAttributs.fulfilled, (state, action) => {
			state.isLoading = false;
			state.attributes = action.payload.data;
			state.total = action.payload.total;
			state.rows = [];
			
			for (let i: number = 0; i < state.attributes.length; i += 1) {
				
				state.rows.push({
					id: state.attributes[i].int_glcode ? state.attributes[i].int_glcode : i,
					name: state.attributes[i].var_title,
					type: state.attributes[i].var_type,
					publish: state.attributes[i].is_active
				});
			}
		});
		builder.addCase(fetchAttributsWithValues.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchAttributsWithValues.fulfilled, (state, action) => {
			state.isLoading = false;
			state.attributes = action.payload.data;
			state.total = action.payload.total;

		});
		builder.addCase(fetchAttributs.rejected, (state) => {
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

		builder.addCase(updatAttributesStatusById.pending, (state) => {
			state.isLoading = true;
			state.isStatusChange = false;
		});
		builder.addCase(updatAttributesStatusById.fulfilled, (state) => {
			state.isLoading = false;
			state.isStatusChange = true;
		});
		builder.addCase(updatAttributesStatusById.rejected, (state) => {
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
	setAttribute,
	setAttributes,
	setSelected,
	searchAttribute,
	setPage,
	clearSelectAttribut,
	setSort,
	setPageSize,
	setAttributeSelection
} = attributeSlice.actions;
export const selectAttributeSlice = appSelector(({ attributes }: AppRootStateType) => attributes);

export type attributesSliceType = typeof attributeSlice;
export default attributeSlice.reducer;
