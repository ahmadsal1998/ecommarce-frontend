import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { MetacontentModel } from '../../models/settings/MetaContactModel';
import { addMetaContact, fetchMetaContact, updateMetaContactById } from '../../respositories/settings/MetaContactRepo';

type AppRootStateType = RootStateType<addMetaContactType>;
type initialStateProps = {
	metaContent: MetacontentModel;
	id: string;
	title: string;
	desc: string;
	forUpdate: boolean;
	isFormValid: boolean;
	isLoading: boolean;
	message: string;
	dialogOpen: boolean;
};
const initialState: initialStateProps = {
	metaContent: null,
	id: '',
	forUpdate: false,
	isFormValid: false,
	isLoading: false,
	message: '',
	dialogOpen: false,
	title: '',
	desc: ''
};
export const addMetaContactUsSlice = createSlice({
	name: 'addMetaContact',
	initialState,
	reducers: {
		setTitle(state, action) {
			state.title = action.payload as string;
		},
		setDesc(state, action) {
			state.desc = action.payload as string;
		},
		toggleMetaDailog(state) {
			state.dialogOpen = !state.dialogOpen;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMetaContact.fulfilled, (state, action) => {
			if (action.payload.data.length > 0) {
				state.id = action.payload.data[0].int_glcode;
				state.title = action.payload.data[0].title;
				state.desc = action.payload.data[0].desc;
			}
			state.isFormValid = true;
			state.isLoading = false;
		});
		builder.addCase(addMetaContact.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(addMetaContact.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
		});
		builder.addCase(addMetaContact.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
		});
		builder.addCase(updateMetaContactById.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(updateMetaContactById.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
		});
		builder.addCase(updateMetaContactById.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
		});
	}
});
export const { setTitle, setDesc, toggleMetaDailog } = addMetaContactUsSlice.actions;
export const selectAddMetaContactUsSlice = appSelector(({ addMetaContact }: AppRootStateType) => addMetaContact);

export type addMetaContactType = typeof addMetaContactUsSlice;
export default addMetaContactUsSlice.reducer;
