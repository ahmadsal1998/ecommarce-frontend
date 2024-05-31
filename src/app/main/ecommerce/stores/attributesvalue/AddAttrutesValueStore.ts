import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { AttributeValueModel } from '../../models/products/attributes/AttributeValueModel';
import {
	addAttributesValue,
	fetchAttributeValueById,
	updateAttributeValueById
} from '../../respositories/attributes/attributeValueRepo';

type AppRootStateType = RootStateType<addAttributesValueSliceType>;
type initialStateProps = {
	attributeValue: AttributeValueModel;
	name: string;
	error_name: string;
	forUpdate: boolean;
	isFormValid: boolean;
	isLoading: boolean;
	message: string;
	dialogOpen: boolean;
	attributeId: string;
	colorCode: string;
	attributeType: string;
	isAttributeCreated: boolean;
};
const initialState: initialStateProps = {
	attributeValue: null,
	name: '',
	error_name: '',
	forUpdate: false,
	isFormValid: false,
	message: '',
	colorCode: '#000',
	isAttributeCreated: false,
	isLoading: false,
	dialogOpen: false,
	attributeId: '',
	attributeType: ''
};
export const addAttributesValueSlice = createSlice({
	name: 'addAttributesValue',
	initialState,
	reducers: {
		setAttributeValue(state, action) {
			state.attributeValue = action.payload as AttributeValueModel;
		},
		setName(state, action) {
			state.name = action.payload as string;
		},
		setColor(state, action){
			state.colorCode = action.payload as string;
		},
		setAttributeId(state, action) {
			const payload: { id: string; type: string } = action.payload as { id: string; type: string};
			state.attributeId = payload.id;
			state.attributeType = payload.type;
		},
		cleanForm(state) {
			state.name = '';
			state.colorCode = '';
		},
		setAttributeForUpate(state, action) {
			state.forUpdate = action.payload as boolean;
		},
		attributeValueDialogOpen(state) {
			state.dialogOpen = !state.dialogOpen;
		},
		validateForm(state) {
			if (state.name !== '' && state.error_name === '') {
				state.isFormValid = true;
			} else {
				state.isFormValid = false;
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addAttributesValue.pending, (state) => {
			state.isLoading = true;
			state.isAttributeCreated = false;
		});
		builder.addCase(addAttributesValue.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
			state.name = '';
			state.isAttributeCreated = true;
		});
		builder.addCase(addAttributesValue.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
			state.isAttributeCreated = false;
		});
		builder.addCase(fetchAttributeValueById.fulfilled, (state, action) => {
			state.attributeValue = action.payload.data;
			state.name = state.attributeValue.var_title;
			state.colorCode = state.attributeValue.colorCode;
			state.isFormValid = true;
			state.isLoading = false;
		});

		builder.addCase(fetchAttributeValueById.pending, (state) => {
			state.isLoading = true;
			state.isAttributeCreated = false;
		});
		builder.addCase(updateAttributeValueById.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
			state.isAttributeCreated = true;
		});
		builder.addCase(updateAttributeValueById.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
			state.isAttributeCreated = false;
		});
	}
});
export const {
	setAttributeValue,
	setName,
	cleanForm,
	validateForm,
	setColor,
	attributeValueDialogOpen,
	setAttributeForUpate,
	setAttributeId
} = addAttributesValueSlice.actions;
export const selectAddAttributesValueSlice = appSelector(
	({ addAttributesValue }: AppRootStateType) => addAttributesValue
);

export type addAttributesValueSliceType = typeof addAttributesValueSlice;
export default addAttributesValueSlice.reducer;
