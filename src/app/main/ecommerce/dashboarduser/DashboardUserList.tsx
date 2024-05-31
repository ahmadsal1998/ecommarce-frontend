import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EscPageCarded from '@esc/core/EscPageCarded';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { memo, useEffect, useState } from 'react';
import { useAppDispatch } from 'app/store/store';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { fetchAdminUsers, getAdminUserById, updateAdminUserStatusById } from '../respositories/users/AdminUerRepo';
import { selectAdminUserSlice, setPage, setPageSize, setSort, setUserSelection } from '../stores/user/AdminUserStore';
import { forUserUpdate } from '../stores/dashboard/AddDashboardUserStore';


const getSortingVar = (name, sort) => {
	switch (name) {
		case 'name':
			return { var_name: sort === 'asc' ? 1 : -1 };
		case 'email':
			return { var_email: sort === 'asc' ? 1 : -1 };
		case 'date':
			return { date: sort === 'asc' ? 1 : -1 };
		case 'mobileno':
			return { var_mobile_no: sort === 'asc' ? 1 : -1 };

		default:
			return {};
	}
};

function DashboardUserlist() {
	const navigate = useNavigate();
	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'Id', width: 0, hideable: false, minWidth: 200 },
		{
			field: 'name',
			headerName: 'Name',
			flex: 1,
			minWidth: 200
		},
		{ field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
		{ field: 'mobileno', headerName: 'Mobile No', flex: 1, minWidth: 200 },
		{
			field: 'date',
			headerName: 'Created Date',
			flex: 1,
			minWidth: 200
		},
		{ field: 'role', headerName: 'Role', flex: 1, minWidth: 200 },
		{
			field: 'publish',
			headerName: 'Active',
			sortable: false,
			width: 100,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',

			renderCell: (params) => {
				return params.value ? (
					<CheckCircleIcon
						color="secondary"
						onClick={() => {
							dispatch(
								updateAdminUserStatusById({
									payload: {
										is_active: !params.value,
										uid: params.id as string
									}
								})
							);
						}}
					/>
				) : (
					<UnpublishedIcon
						color="error"
						onClick={() => {
							dispatch(
								updateAdminUserStatusById({
									payload: { is_active: !params.value, uid: params.id as string }
								})
							);
						}}
					/>
				);
			}
		},
		{
			field: 'action',
			headerName: 'Action',
			sortable: false,
			width: 100,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			renderCell: (params) => {
				return (
					<Button
						onClick={() => {
							dispatch(forUserUpdate(true));
							dispatch(getAdminUserById({ id: params.id as string }));
						navigate(`/add-dashboard-user`);
						}}
					>
						<EditIcon color="secondary" />
					</Button>
				);
			}
		}
	];

	const [newUpdating, setNewUpdating] = useState(false);
	const users = useSelector(selectAdminUserSlice);
	const dispatch = useAppDispatch();
	const handleOnDateSelection = (datas) => {
		if (!newUpdating) {
			dispatch(setUserSelection(datas));
		} else {
			setNewUpdating(false);
		}
	};

	useEffect(() => {
		dispatch(
			fetchAdminUsers({
				payload: { limit: users.pageSize, page: users.page, sort: users.sort, search: users.searchText }
			})
		);
	}, [users.page, users.pageSize, users.sort, users.searchText, users.isDeleted, users.isChangedStatus]);
	return (
		<EscPageCarded
			content={
				<DataGrid
					onPaginationModelChange={(e) => {
						dispatch(setPage(e.page + 1));
						dispatch(setPageSize(e.pageSize));
						setNewUpdating(true);
					}}
					sx={{
						'.MuiDataGrid-columnHeaderTitle': {
							fontWeight: 'bold'
						},
						'& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within': {
							outline: 'none'
						},

						'& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
							outline: 'none'
						},
						'& .MuiDataGrid-columnHeader': {},
						overflowX: 'scroll'
					}}
					rows={users.rows}
					loading={users.isLoading}
					columns={columns}
					disableColumnMenu
					onSortModelChange={(e) => {
						try {
							dispatch(setSort(getSortingVar(e[0].field, e[0].sort)));
						} catch (e) {
							/* empty */
						}
					}}
					onRowSelectionModelChange={handleOnDateSelection}
					rowSelectionModel={users.selectedRows}
					disableRowSelectionOnClick
					columnVisibilityModel={{
						id: false
					}}
					initialState={{
						pagination: {
							paginationModel: { page: users.page - 1, pageSize: users.pageSize }
						}
					}}
					paginationMode="server"
					rowCount={users.total}
					pageSizeOptions={[10, 25, 50, 75, 100]}
					autoPageSize={false}
					checkboxSelection
				/>
			}
		/>
	);
}
export default memo(DashboardUserlist);
