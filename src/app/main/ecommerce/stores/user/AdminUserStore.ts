import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { UserModel } from '../../models/users/UsersModel';
import { deleteAdminUser, fetchAdminUsers, updateAdminUserStatusById } from '../../respositories/users/AdminUerRepo';

type AppRootStateType = RootStateType<adminUserSliceType>;
type initialStateProps = {
	users: Array<UserModel>;
	isSelected: boolean;
	isLoading: boolean;
	isDeleted: boolean;
	isChangedStatus: boolean;
	rows: Array<object>;
	csvRows: Array<Array<object>>;
	finalCsvRow: Array<object>;
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
	users: [],
	rows: [],
	isSelected: false,
	isLoading: false,
	isDeleted: false,
	isChangedStatus: false,
	error: '',
	page: 1,
	allDataSelected: false,
	pageSize: 10,
	sort: { _id: -1 },
	total: 0,
	finalCsvRow:[],
	csvRows:[],
	selectedRows: [],
	searchText: ''
};
export const userAdminSlice = createSlice({
	name: 'usersAdmin',
	initialState,
	reducers: {
		setUserSelection(state, action) {
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
			state.csvRows[state.page] = state.rows.filter((row:{id: string})=>{
				return state.selectedRows.indexOf(row.id) !==-1;
			})
			state.finalCsvRow = [];
			state.csvRows.forEach((data)=>{
				state.finalCsvRow = [...state.finalCsvRow, ...data]
			})

		},
		setFinalCsv(state, action){
			const users = action.payload as Array<UserModel>;
			if(users.length>0){
			for (let i: number = 0; i < users.length; i += 1) {
				
				state.finalCsvRow.push({
					id: users[i].user_id ? users[i].user_id : i,
					name: users[i].var_name,
					email: users[i].var_email,
					mobileno: users[i].var_mobile_no,
					date: users[i].created_date,
					publish: users[i].is_active?"Yes":"No"
				}) 
			}
			}else{
				state.finalCsvRow = [];
			}
		},
		searchUser(state, action) {
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
		builder.addCase(fetchAdminUsers.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchAdminUsers.fulfilled, (state, action) => {
			state.isLoading = false;
			state.users = action.payload.data;
			state.total = action.payload.total;
			state.rows = [];
			
			for (let i: number = 0; i < state.users.length; i += 1) {
				
				state.rows.push({
					id: state.users[i].user_id ? state.users[i].user_id : i,
					name: state.users[i].var_name,
					email: state.users[i].var_email,
					mobileno: state.users[i].var_mobile_no,
					role: state.users[i].role.length > 0 ? state.users[i].role[0].lable : '',
					date: state.users[i].created_date,
					publish: state.users[i].is_active
				});
			}
		});
		builder.addCase(fetchAdminUsers.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		});
		builder.addCase(deleteAdminUser.pending, (state) => {
			state.isDeleted = false;
		});
		builder.addCase(deleteAdminUser.fulfilled, (state) => {
			state.isDeleted = true;
			state.selectedRows = [];
			state.isSelected = state.selectedRows.length > 0;
		});
		builder.addCase(deleteAdminUser.rejected, (state) => {
			state.isDeleted = false;
		});
		builder.addCase(updateAdminUserStatusById.pending, (state) => {
			state.isChangedStatus = false;
		});
		builder.addCase(updateAdminUserStatusById.fulfilled, (state) => {
			state.isChangedStatus = true;
		});
		builder.addCase(updateAdminUserStatusById.rejected, (state) => {
			state.isChangedStatus = false;
		});
	}
});
export const { setUserSelection, searchUser, setPage,setFinalCsv, setPageSize, setSort } = userAdminSlice.actions;
export const selectAdminUserSlice = appSelector(({ usersAdmin }: AppRootStateType) => usersAdmin);

export type adminUserSliceType = typeof userAdminSlice;
export default userAdminSlice.reducer;
