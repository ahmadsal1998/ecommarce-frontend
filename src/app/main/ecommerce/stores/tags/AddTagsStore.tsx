import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { TagModel } from '../../models/tags/TagsModel';
import { addTag, fetchTagById, updateTagById } from '../../respositories/tags/TagsRepo';

type AppRootStateType = RootStateType<addTagsSliceType>;
type initialStateProps = {
	tag: TagModel;
	name: string;
	error_name: string;
	forUpdate: boolean;
	imagePicked: boolean;
	isFormValid: boolean;
	isLoading: boolean;
	message: string;
	dialogOpen: boolean;
	isTagCreated: boolean;
};
const initialState: initialStateProps = {
	tag: null,
	name: '',
	imagePicked: false,
	error_name: '',
	forUpdate: false,
	isFormValid: false,
	isLoading: false,
	message: '',
	isTagCreated: false,
	dialogOpen: false
};
export const addTagsSlice = createSlice({
	name: 'addTags',
	initialState,
	reducers: {
		setTags(state, action) {
			state.tag = action.payload as TagModel;
		},
		setName(state, action) {
			state.name = action.payload as string;
		},
		setImagePicked(state, action) {
			state.imagePicked = action.payload as boolean;
		},
		cleanForm(state) {
			state.name = '';
		},
		tagDialogOpen(state) {
			state.dialogOpen = !state.dialogOpen;
		},
		setTagForUpate(state, action) {
			state.forUpdate = action.payload as boolean;
		},
		validateForm(state) {
			if (state.forUpdate) {
				if (state.name !== '' && state.error_name === '' ) {
					state.isFormValid = true;
				} else {
					state.isFormValid = false;
				}
			} else if (state.name !== '' && state.error_name === '' && state.imagePicked) {
				state.isFormValid = true;
			} else {
				state.isFormValid = false;
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addTag.pending, (state) => {
			state.isLoading = true;
			state.isTagCreated = false;
		});
		builder.addCase(addTag.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
			state.name = '';
			state.isTagCreated = true;
		});
		builder.addCase(addTag.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
			state.isTagCreated = false;
		});
		builder.addCase(fetchTagById.fulfilled, (state, action) => {
			state.tag = action.payload.data;
			state.name = state.tag.var_title;
			state.isFormValid = true;
			state.isLoading = false;
		});

		builder.addCase(updateTagById.pending, (state) => {
			state.isLoading = true;
			state.isTagCreated = false;
		});
		builder.addCase(updateTagById.fulfilled, (state, action) => {
			state.dialogOpen = true;
			state.isLoading = false;
			state.isTagCreated = true;
			state.message = action.payload.message;
		});
		builder.addCase(updateTagById.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
			state.isTagCreated = false;
		});
	}
});
export const { setTags, setName, cleanForm, validateForm, setImagePicked, tagDialogOpen, setTagForUpate } = addTagsSlice.actions;
export const selectAddTagsSlice = appSelector(({ addTags }: AppRootStateType) => addTags);

export type addTagsSliceType = typeof addTagsSlice;
export default addTagsSlice.reducer;
