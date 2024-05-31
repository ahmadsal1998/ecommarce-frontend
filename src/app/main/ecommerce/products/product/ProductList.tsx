import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EscPageCarded from '@esc/core/EscPageCarded';
import { useAppDispatch } from 'app/store/store';
import EditIcon from '@mui/icons-material/Edit';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import {
	selectProdictSlice,
	setProductSelection,
	setPageSize,
	setSort,
	setPage
} from '../../stores/product/ProductStore';
import { fetchProduct, fetchProductById, updateProductsStatusById } from '../../respositories/product/ProductRepo';
import {  baseUrl } from '../../respositories/urls';
import { setProductForUpdate } from '../../stores/product/AddProductDetailStore';

const getSortingVar = (name, sort) => {
	switch (name) {
		case 'name':
			return { var_title: sort === 'asc' ? 1 : -1 };
		default:
			return {};
	}
};

function ProductList() {
	const product = useSelector(selectProdictSlice);
	const dispatch = useAppDispatch();
	const [newUpdating, setNewUpdating] = useState(false);
	const navigate = useNavigate();
	const handleOnDateSelection = (datas) => {
		if (!newUpdating) {
			dispatch(setProductSelection(datas as []));
		} else {
			setNewUpdating(false);
		}
	};

	useEffect(() => {
		dispatch(
			fetchProduct({
				payload: {
					limit: product.pageSize,
					page: product.page,
					sort: product.sort,
					search: product.searchText
				}
			})
		);
	}, [product.page, product.pageSize, product.sort, product.searchText, product.isStatusChange, product.isDeleted]);
	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'Id', width: 0, hideable: false, minWidth: 200 },
		{
			field: 'image',
			headerName: 'Image',
			sortable: false,
			renderCell: (params) => {
				
				return (
					<img
						src={`${baseUrl}/images/${params.value as string}`}
						alt=""
						style={{  padding:"10px" }}
					/>
				);
			},
			minWidth: 100,
			maxWidth: 100
		},
		{ field: 'name', headerName: 'Product Title', flex: 1, minWidth: 200 },
		{ field: 'category', headerName: 'Category', maxWidth: 200, minWidth: 200 },
		{ field: 'brand', headerName: 'Brand', maxWidth: 200, minWidth: 200 },

		{
			field: 'publish',
			headerName: 'Published',
			sortable: false,
			width: 150,
			minWidth: 150,
			align: 'center',
			headerAlign: 'center',
			renderCell: (params) => {
				console.log(params, params.value)
				return (
					<Button
						onClick={() => {
							dispatch(
								updateProductsStatusById({
									uid: params.id as string,
									payload: {
										chr_publish: params.value==="Active"?false:true
									}
								})
							);
						}}
					>
						{params.value==="Active"? <CheckCircleIcon color="secondary" /> : <UnpublishedIcon color="error" />}
					</Button>
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
							dispatch(setProductForUpdate(true));
							dispatch(fetchProductById({ id: params.id as string }));
						navigate(`/addproduct`);
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
					rows={product.rows}
					loading={product.isLoading}
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
					rowSelectionModel={product.selectedRows}
					disableRowSelectionOnClick
					columnVisibilityModel={{
						id: false
					}}
					initialState={{
						pagination: {
							paginationModel: { page: product.page - 1, pageSize: product.pageSize }
						}
					}}
					paginationMode="server"
					rowCount={product.total}
					pageSizeOptions={[10, 25, 50, 75, 100]}
					checkboxSelection
				/>
			}
		/>
	);
}
export default memo(ProductList);
