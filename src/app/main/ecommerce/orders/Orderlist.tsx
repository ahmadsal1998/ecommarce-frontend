import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EscPageCarded from '@esc/core/EscPageCarded';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/store/store';
import { selectOrderSlice, setOrderSelection, setPage, setPageSize, setSort } from '../stores/orders/OrderStore';
import { fetchOrders, getOrderById } from '../respositories/orders/OrderRepo';
import Chip from '@mui/material/Chip';


const getSortingVar = (name, sort) => {
	switch (name) {
		case 'name':
			return { var_title: sort === 'asc' ? 1 : -1 };
		default:
			return {};
	}
};
const getColor = (status: string) => {
	switch (status) {
		case 'Received':
			return 'orange';
		case 'Cancelled':
			return 'red';
		case 'Delivered':
			return 'rgba(21, 191, 30, 1)';
		case 'Processed':
			return 'rgba(191, 114, 21, 1)';
		case 'Shipped':
			return 'rgba(66, 135, 245, 1)';
		case 'Returned':
			return 'red';
		default:
			return 'orange';
	}
};
function OrderList() {
	const orders = useSelector(selectOrderSlice);
	const dispatch = useAppDispatch();
	const [newUpdating, setNewUpdating] = useState(false);
	const handleOnDateSelection = (datas) => {
		if (!newUpdating) {
			dispatch(setOrderSelection(datas));
		} else {
			setNewUpdating(false);
		}
	};
	useEffect(() => {
		dispatch(
			fetchOrders({
				payload: {
					limit: orders.pageSize,
					page: orders.page,
					sort: orders.sort,
					search: orders.searchText,
					fromDate:`${orders.fromDate.split("-")[2]}-${orders.fromDate.split("-")[1]}-${orders.fromDate.split("-")[0]}`,
					toDate: `${orders.toDate.split("-")[2]}-${orders.toDate.split("-")[1]}-${orders.toDate.split("-")[0]}`
				}
			})
		);
	}, [orders.page, orders.pageSize, orders.sort, orders.searchText, orders.toDate, orders.fromDate]);
	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'Id', width: 0, hideable: false },
		{ field: 'order_id', headerName: 'Order Id', flex: 1 },
		{ field: 'name', headerName: 'User', flex: 1 },
		{ field: 'mobile_no', headerName: 'Mobile No', maxWidth: 150, minWidth: 150 },
		{ field: 'delivery_mode', headerName: 'Delivery Mode', flex: 1  },
		{ field: 'payable_amount', headerName: 'Payable Amount', flex: 1,
		renderCell: (params) => {
			return (
				<div>
					<Typography sx={{color:"green", fontWeight:"bold"}}>{params.value as string}</Typography>
				</div>
			);
		} },
		{ field: 'payable_mode', headerName: 'Payable Mode', flex: 1, renderCell: (params) => {
			return (
				
					<Chip label={params.value as string} sx={{color:"white",background:params.value=='Cash'?'orange':'blue'}}/>
				
			);
		}},
		{
			field: 'date',
			headerName: 'Date',
			flex: 1,
			renderCell: (params) => {
				return (
					<div>
						<Typography>{params.value as string}</Typography>
					</div>
				);
			}
		},
		{
			field: 'status',
			headerName: 'Status',
			flex: 1,
			renderCell: (params) => {
				return <Chip label={params.value} sx={{ color:"white", background: getColor(params.value as string) }} />
				
			}
		},
		{
			field: 'action',
			headerName: 'Action',
			sortable: false,
			maxWidth: 100,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			renderCell: (params) => {
				return (
					<Button
						variant="contained"
						aria-label="View"
						size="large"
						component={Link}
						to={`/orderdetail/${params.id }`}
						color="secondary"
						onClick={() => dispatch(getOrderById({ id: params.id as string }))}
					>
						View
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
					rows={orders.rows}
					loading={orders.isLoading}
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
					rowSelectionModel={orders.selectedRows}
					disableRowSelectionOnClick
					columnVisibilityModel={{
						id: false
					}}
					initialState={{
						pagination: {
							paginationModel: { page: orders.page - 1, pageSize: orders.pageSize }
						}
					}}
					paginationMode="server"
					rowCount={orders.total}
					autoPageSize={false}
					pageSizeOptions={[10, 25, 50, 75, 100]}
					checkboxSelection
				/>
			}
		/>
	);
}
export default memo(OrderList);
