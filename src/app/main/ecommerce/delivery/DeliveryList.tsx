import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EscPageCarded from '@esc/core/EscPageCarded';
import { useAppDispatch } from 'app/store/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { memo, useEffect, useState } from 'react';
import {
	selectDeliveryBoySlice,
	setDeliverySelection,
	setForDeliveryUpdate,
	setPage,
	setPageSize,
	setSort
} from '../stores/deliveries/DeliveryBoyStore';
import {
	fetchDeliveryBoyById,
	fetchDeliveryBoys,
	updatDeliveryBoyStatusById
} from '../respositories/deliveries/DeliveryBoyListRepo';
import {  baseUrl } from '../respositories/urls';

const getSortingVar = (name, sort) => {
	switch (name) {
		case 'name':
			return { var_name: sort === 'asc' ? 1 : -1 };
		case 'email':
			return { var_email: sort === 'asc' ? 1 : -1 };
		case 'var_mobile_no':
			return { date: sort === 'asc' ? 1 : -1 };

		default:
			return {};
	}
};

function DeliveryList() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const delivery = useSelector(selectDeliveryBoySlice);

	useEffect(() => {
		dispatch(
			fetchDeliveryBoys({
				payload: {
					limit: delivery.pageSize,
					page: delivery.page,
					sort: delivery.sort,
					search: delivery.searchText
				}
			})
		);
	}, [
		delivery.page,
		delivery.pageSize,
		delivery.sort,
		delivery.searchText,
		delivery.isDeleted,
		delivery.isStatusChange
	]);
	const [newUpdating, setNewUpdating] = useState(false);
	const handleOnDateSelection = (datas) => {
		if (!newUpdating) {
			dispatch(setDeliverySelection(datas));
		} else {
			setNewUpdating(false);
		}
	};

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'Id', width: 0, hideable: false, minWidth: 200 },
		{
			field: 'profile',
			headerName: 'Profile',
			sortable: false,
			renderCell: (params) => {
				return (
					<img
						src={`${baseUrl}/images/${params.value as string}`}
						alt=""
						style={{ height: '60px', width: '60px' }}
					/>
				);
			},
			minWidth: 100,
			maxWidth: 100
		},
		{ field: 'name', headerName: 'Name', flex: 1, minWidth: 200 },
		{ field: 'email', headerName: 'Email', maxWidth: 200, minWidth: 200 },
		{ field: 'phoneno', headerName: 'Phone No.', maxWidth: 200, minWidth: 200 },
		{
			field: 'block',
			headerName: 'Block/ Un Block',
			sortable: false,
			width: 150,
			minWidth: 150,
			align: 'center',
			headerAlign: 'center',
			renderCell: (params) => {
				return params.value === 'Y' ? (
					<CheckCircleIcon
						color="secondary"
						onClick={() => {
							dispatch(
								updatDeliveryBoyStatusById({
									payload: {
										current_status: 'N'
									},
									uid: params.id as string
								})
							);
						}}
					/>
				) : (
					<UnpublishedIcon
						color="error"
						onClick={() => {
							dispatch(
								updatDeliveryBoyStatusById({
									payload: { current_status: 'Y' },
									uid: params.id as string
								})
							);
						}}
					/>
				);
			}
		},
		{
			field: 'publish',
			headerName: 'Published',
			sortable: false,
			width: 150,
			minWidth: 150,
			align: 'center',
			headerAlign: 'center',
			renderCell: (params) => {
				return params.value === 'Y' ? (
					<CheckCircleIcon
						color="secondary"
						onClick={() => {
							dispatch(
								updatDeliveryBoyStatusById({
									payload: {
										chr_status: 'N'
									},
									uid: params.id as string
								})
							);
						}}
					/>
				) : (
					<UnpublishedIcon
						color="error"
						onClick={() => {
							dispatch(
								updatDeliveryBoyStatusById({
									payload: { chr_status: 'Y' },
									uid: params.id as string
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
							dispatch(setForDeliveryUpdate(true));
							dispatch(fetchDeliveryBoyById({ id: params.id as string }));
						navigate(`/add_delivery`);
						}}
					>
						<EditIcon color="secondary" />
					</Button>
				);
			}
		}
	];

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
					rows={delivery.rows}
					loading={delivery.isLoading}
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
					rowSelectionModel={delivery.selectedRows}
					disableRowSelectionOnClick
					columnVisibilityModel={{
						id: false
					}}
					initialState={{
						pagination: {
							paginationModel: { page: delivery.page - 1, pageSize: delivery.pageSize }
						}
					}}
					paginationMode="server"
					rowCount={delivery.total}
					pageSizeOptions={[10, 25, 50, 75, 100]}
					autoPageSize={false}
					checkboxSelection
				/>
			}
		/>
	);
}
export default memo(DeliveryList);
