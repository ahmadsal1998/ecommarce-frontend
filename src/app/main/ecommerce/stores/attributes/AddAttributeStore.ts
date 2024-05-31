import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { AttributeModel } from '../../models/products/attributes/AttributeModel';
import { addAttribute, fetchAttributeById, updateAttributeById } from '../../respositories/attributes/attributeRepo';

type AppRootStateType = RootStateType<addAttributesSliceType>;
type initialStateProps = {
	attribute: AttributeModel;
	name: string;
	error_name: string;
	forUpdate: boolean;
	isFormValid: boolean;
	isLoading: boolean;
	message: string;
	dialogOpen: boolean;
	isAttributeCreated: boolean;
};
const initialState: initialStateProps = {
	attribute: null,
	name: '',
	error_name: '',
	forUpdate: false,
	isFormValid: false,
	message: '',
	isAttributeCreated: false,
	isLoading: false,
	dialogOpen: false
};
export const addAttributesSlice = createSlice({
	name: 'addAttributes',
	initialState,
	reducers: {
		setAttribute(state, action) {
			state.attribute = action.payload as AttributeModel;
		},
		setName(state, action) {
			state.name = action.payload as string;
		},
		cleanForm(state) {
			state.name = '';
		},
		setAttributeForUpate(state, action) {
			state.forUpdate = action.payload as boolean;
		},
		atributeDialogOpen(state) {
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
		builder.addCase(addAttribute.pending, (state) => {
			state.isLoading = true;
			state.isAttributeCreated = false;
		});
		builder.addCase(addAttribute.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
			state.name = '';
			state.isAttributeCreated = true;
		});
		builder.addCase(addAttribute.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
			state.isAttributeCreated = false;
		});
		builder.addCase(fetchAttributeById.fulfilled, (state, action) => {
			state.attribute = action.payload.data;
			state.name = state.attribute.var_title;
			state.isFormValid = true;
			state.isLoading = false;
		});

		builder.addCase(fetchAttributeById.pending, (state) => {
			state.isLoading = true;
			state.isAttributeCreated = false;
		});
		builder.addCase(updateAttributeById.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
			state.isAttributeCreated = true;
		});
		builder.addCase(updateAttributeById.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
			state.isAttributeCreated = false;
		});
	}
});
export const { setAttribute, setName, cleanForm, validateForm, setAttributeForUpate, atributeDialogOpen  } = addAttributesSlice.actions;
export const selectAddAttributesSlice = appSelector(({ addAttributes }: AppRootStateType) => addAttributes);

export type addAttributesSliceType = typeof addAttributesSlice;
export default addAttributesSlice.reducer;
