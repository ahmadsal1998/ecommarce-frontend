import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EscPageCarded from '@esc/core/EscPageCarded';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { useSelector } from 'react-redux';
import { memo, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useAppDispatch } from 'app/store/store';
import {
	selectCategorySlice,
	setPage,
	setPageSize,
	setSort,
	setUCategorySelection
} from '../../stores/categories/CategoryStore';
import {
	fetchCategories,
	fetchCategoriesById,
	updatCategoriesStatusById
} from '../../respositories/categories/CategoriesRepo';
import {  baseUrl } from '../../respositories/urls';
import { setCategoryForUpate } from '../../stores/categories/AddCategoryStore';

const getSortingVar = (name, sort) => {
	switch (name) {
		case 'name':
			return { var_title: sort === 'asc' ? 1 : -1 };
		default:
			return {};
	}
};
function Categorylist() {
	const dispatch = useAppDispatch();
	const categories = useSelector(selectCategorySlice);
	const navigate = useNavigate();
	const [newUpdating, setNewUpdating] = useState(false);
	const handleOnDateSelection = (datas) => {
		if (!newUpdating) {
			dispatch(setUCategorySelection(datas));
		} else {
			setNewUpdating(false);
		}
	};
	useEffect(() => {
		dispatch(
			fetchCategories({
				forAll: false,
				payload: {
					limit: categories.pageSize,
					page: categories.page,
					sort: categories.sort,
					search: categories.searchText
				}
			})
		);
	}, [
		categories.page,
		categories.pageSize,
		categories.sort,
		categories.searchText,
		categories.isStatusChange,
		categories.isDeleted
	]);
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
			field: 'homedisplay',
			headerName: 'Home display',
			sortable: false,
			width: 250,
			align: 'center',
			headerAlign: 'center',
			minWidth: 250,
			renderCell: (params) => {
				return (
					<Button
						onClick={() => {
							dispatch(
								updatCategoriesStatusById({
									payload: {
										is_active: (params.row as { publish: boolean }).publish,
										is_home_active: (params.row as { homedisplay: boolean })
											? !(params.row as { homedisplay: boolean }).homedisplay
											: true,
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
								updatCategoriesStatusById({
									payload: {
										is_active: !(params.row as { publish: boolean }).publish,
										is_home_active: (params.row as { homedisplay: boolean }).homedisplay,
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
							dispatch(setCategoryForUpate(true));
							dispatch(fetchCategoriesById({ id: params.id as string }));
						navigate(`/addcategory`);
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
					rows={categories.rows}
					loading={categories.isLoading}
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
					rowSelectionModel={categories.selectedRows}
					disableRowSelectionOnClick
					columnVisibilityModel={{
						id: false
					}}
					initialState={{
						pagination: {
							paginationModel: { page: categories.page - 1, pageSize: categories.pageSize }
						}
					}}
					paginationMode="server"
					rowCount={categories.total}
					pageSizeOptions={[10, 25, 50, 75, 100]}
					checkboxSelection
				/>
			}
		/>
	);
}
export default memo(Categorylist);
