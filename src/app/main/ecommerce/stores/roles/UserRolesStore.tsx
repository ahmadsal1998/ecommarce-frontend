import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { deleteUserRole, fetchRoleUsers, updateUserRoleStatusById } from '../../respositories/users/RoleRepo';
import { RoleModel } from '../../models/users/RoleModel';

type AppRootStateType = RootStateType<userRoleSliceType>;
type initialStateProps = {
	name: string;
	roles: Array<RoleModel>;
	error_name: string;
	forUpdate: boolean;
	isFormValid: boolean;
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
	name: '',
	error_name: '',
	roles: [],
	forUpdate: false,
	isFormValid: false,
	isSelected: false,
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
export const userRoleSlice = createSlice({
	name: 'userRole',
	initialState,
	reducers: {
		setName(state, action) {
			state.name = action.payload as string;
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
		setRole(state, action) {
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
		searchUserRole(state, action) {
			state.searchText = action.payload as string;
		},
		cleanForm(state) {
			state.name = '';
			state.roles = [];
		},
		validateForm(state) {
			if (state.name !== '' && state.error_name === '' && state.roles.length > 0) {
				state.isFormValid = true;
			} else {
				state.isFormValid = false;
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchRoleUsers.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchRoleUsers.fulfilled, (state, action) => {
			state.isLoading = false;
			state.roles = action.payload.data;
			state.total = action.payload.total;
			state.rows = [];
			
			for (let i: number = 0; i < state.roles.length; i += 1) {
				
				state.rows.push({
					id: state.roles[i].int_glcode,
					title: state.roles[i].lable,
					roles:
						state.roles[i].subroles && state.roles[i].subroles.length > 0
							? state.roles[i].subroles.map((data: { title: string }) => ` ${data.title}`)
							: '',
					publish: state.roles[i].is_active
				});
			}
		});
		builder.addCase(fetchRoleUsers.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		});
		builder.addCase(deleteUserRole.pending, (state) => {
			state.isDeleted = false;
		});
		builder.addCase(deleteUserRole.fulfilled, (state) => {
			state.isDeleted = true;
			state.selectedRows = [];
			state.isSelected = state.selectedRows.length > 0;
		});
		builder.addCase(deleteUserRole.rejected, (state) => {
			state.isDeleted = false;
		});
		builder.addCase(updateUserRoleStatusById.pending, (state) => {
			state.isChangedStatus = false;
		});
		builder.addCase(updateUserRoleStatusById.fulfilled, (state) => {
			state.isChangedStatus = true;
		});
		builder.addCase(updateUserRoleStatusById.rejected, (state) => {
			state.isChangedStatus = false;
		});
	}
});
export const { setName, cleanForm, validateForm, setRole, searchUserRole, setPage, setPageSize, setSort } = userRoleSlice.actions;
export const selectUserRoleSlice = appSelector(({ userRole }: AppRootStateType) => userRole);

export type userRoleSliceType = typeof userRoleSlice;
export default userRoleSlice.reducer;
