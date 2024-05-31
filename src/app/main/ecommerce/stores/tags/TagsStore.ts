import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { TagModel } from '../../models/tags/TagsModel';
import { deleteTagsByIds, fetchTags, updatTagStatusById, updateTagById } from '../../respositories/tags/TagsRepo';

type AppRootStateType = RootStateType<tagsSliceType>;
type initialStateProps = {
	tags: Array<TagModel>;
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
	tags: [],
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
export const tagsSlice = createSlice({
	name: 'tags',
	initialState,
	reducers: {
		setTag(state, action) {
			state.tags.push(action.payload as TagModel);
		},
		setSelected(state, action) {
			state.isSelected = action.payload as boolean;
		},
		setTags(state, action) {
			state.tags.concat(action.payload as Array<TagModel>);
		},
		setTagSelection(state, action) {
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
		searchTag(state, action) {
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
		builder.addCase(fetchTags.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchTags.fulfilled, (state, action) => {
			state.isLoading = false;
			state.tags = action.payload.data;
			state.total = action.payload.total;
			state.rows = [];
			
			for (let i: number = 0; i < state.tags.length; i += 1) {
			
				state.rows.push({
					id: state.tags[i].int_glcode ? state.tags[i].int_glcode : i,
					image: state.tags[i].var_icon,
					name: state.tags[i].var_title,
					publish: state.tags[i].is_active
				});
			}
		});
		builder.addCase(fetchTags.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(updateTagById.pending, (state) => {
			state.isLoading = true;
			state.isStatusChange = false;
		});
		builder.addCase(updateTagById.fulfilled, (state) => {
			state.isLoading = false;
			state.isStatusChange = true;
		});
		builder.addCase(updateTagById.rejected, (state) => {
			state.isLoading = false;
			state.isStatusChange = false;
		});

		builder.addCase(updatTagStatusById.pending, (state) => {
			state.isLoading = true;
			state.isStatusChange = false;
		});
		builder.addCase(updatTagStatusById.fulfilled, (state) => {
			state.isLoading = false;
			state.isStatusChange = true;
		});
		builder.addCase(updatTagStatusById.rejected, (state) => {
			state.isLoading = false;
			state.isStatusChange = false;
		});

		builder.addCase(deleteTagsByIds.pending, (state) => {
			state.isLoading = true;
			state.isDeleted = false;
		});
		builder.addCase(deleteTagsByIds.fulfilled, (state) => {
			state.isLoading = false;
			state.isDeleted = true;
		});
		builder.addCase(deleteTagsByIds.rejected, (state) => {
			state.isLoading = false;
			state.isDeleted = false;
		});
	}
});
export const { setTag, setTags, setSelected, searchTag, setPage, setSort, setPageSize, setTagSelection } =
	tagsSlice.actions;
export const selectTagsSlice = appSelector(({ tags }: AppRootStateType) => tags);

export type tagsSliceType = typeof tagsSlice;
export default tagsSlice.reducer;
