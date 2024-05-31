import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EscPageCarded from '@esc/core/EscPageCarded';
import { useAppDispatch } from 'app/store/store';
import { useNavigate } from 'react-router-dom';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { memo, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { fetchRoleUsers, getUserRoleById, updateUserRoleStatusById } from '../respositories/users/RoleRepo';
import { selectUserRoleSlice, setPage, setPageSize, setRole, setSort } from '../stores/roles/UserRolesStore';
import { clearForm, forUserRoleUpdate } from '../stores/roles/AddUserRoleStore';


const getSortingVar = (name, sort) => {
	switch (name) {
		case 'title':
			return { var_name: sort === 'asc' ? 1 : -1 };

		default:
			return {};
	}
};

function RoleList() {
	const users = useSelector(selectUserRoleSlice);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'Id', width: 0, hideable: false, minWidth: 200 },
		{ field: 'title', headerName: 'Role Title', maxWidth: 250, minWidth: 200 },
		{ field: 'roles', headerName: 'Roles', flex: 1, minWidth: 200 },
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
								updateUserRoleStatusById({
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
								updateUserRoleStatusById({
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
							dispatch(getUserRoleById({ id: params.id as string }));
							dispatch(clearForm());
							dispatch(forUserRoleUpdate(true));
						navigate(`/add-role`);
						}}
					>
						<EditIcon color="secondary" />
					</Button>
				);
			}
		}
	];
	const [newUpdating, setNewUpdating] = useState(false);
	const handleOnDateSelection = (datas) => {
		if (!newUpdating) {
			dispatch(setRole(datas));
		} else {
			setNewUpdating(false);
		}
	};
	useEffect(() => {
		dispatch(
			fetchRoleUsers({
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
export default memo(RoleList);
