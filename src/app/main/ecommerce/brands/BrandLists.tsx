import { useSelector } from 'react-redux';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EscPageCarded from '@esc/core/EscPageCarded';
import { memo, useEffect, useState } from 'react';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppDispatch } from 'app/store/store';
import { useNavigate } from 'react-router';
import { fetchBrandById, fetchBrands, updatBrandStatusById } from '../respositories/brands/BrandsRepo';
import { selectBrandsSlice, setPage, setPageSize, setSort, setBrandsSelection } from '../stores/brands/BrandStore';
import {  baseUrl } from '../respositories/urls';
import { setBrandForUpate } from '../stores/brands/AddBrandStore';

const getSortingVar = (name, sort) => {
	switch (name) {
		case 'name':
			return { var_title: sort === 'asc' ? 1 : -1 };
		default:
			return {};
	}
};
function Brandlist() {
	const dispatch = useAppDispatch();
	const brands = useSelector(selectBrandsSlice);
	const navigate = useNavigate();
	const [newUpdating, setNewUpdating] = useState(false);
	const handleOnDateSelection = (datas) => {
		if (!newUpdating) {
			dispatch(setBrandsSelection(datas));
		} else {
			setNewUpdating(false);
		}
	};
	useEffect(() => {
		dispatch(
			fetchBrands({
				payload: {
					limit: brands.pageSize,
					page: brands.page,
					sort: brands.sort,
					search: brands.searchText
				}
			})
		);
	}, [brands.page, brands.pageSize, brands.sort, brands.searchText, brands.isStatusChange, brands.isDeleted]);
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
						style={{ height: '60px', width: '60px', padding: 10 }}
					/>
				);
			},
			minWidth: 100,
			maxWidth: 100
		},
		{ field: 'name', headerName: 'Name', flex: 1, minWidth: 200 },
		{
			field: 'publish',
			headerName: 'Published',
			sortable: false,
			width: 150,
			minWidth: 150,
			align: 'center',
			headerAlign: 'center',
			renderCell: (params) => {
				return (
					<Button
						onClick={() => {
							dispatch(
								updatBrandStatusById({
									payload: {
										is_active: !params.value,
										uid: params.id as string
									}
								})
							);
						}}
					>
						{params.value ? <CheckCircleIcon color="secondary" /> : <UnpublishedIcon color="error" />}
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
							dispatch(setBrandForUpate(true));
							dispatch(fetchBrandById({ id: params.id as string }));
						navigate(`/addbrand`);
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
					rows={brands.rows}
					loading={brands.isLoading}
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
					rowSelectionModel={brands.selectedRows}
					disableRowSelectionOnClick
					columnVisibilityModel={{
						id: false
					}}
					initialState={{
						pagination: {
							paginationModel: { page: brands.page - 1, pageSize: brands.pageSize }
						}
					}}
					paginationMode="server"
					rowCount={brands.total}
					pageSizeOptions={[10, 25, 50, 75, 100]}
					checkboxSelection
				/>
			}
		/>
	);
}
export default memo(Brandlist);
