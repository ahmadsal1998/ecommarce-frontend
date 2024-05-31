import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EscPageCarded from '@esc/core/EscPageCarded';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { memo, useEffect, useState } from 'react';
import { useAppDispatch } from 'app/store/store';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import {
	selectSubCategorySlice,
	setPage,
	setPageSize,
	setSort,
	setUCategorySelection
} from '../../stores/categories/SubCategoryStore';
import {
	fetchSubCategories,
	fetchSubCategoriesById,
	updatSubCategoriesStatusById
} from '../../respositories/categories/SubCategoriesRepo';
import {  baseUrl } from '../../respositories/urls';
import { setCategoryForUpate } from '../../stores/categories/AddSubCategoryStore';

const getSortingVar = (name, sort) => {
	switch (name) {
		case 'name':
			return { var_title: sort === 'asc' ? 1 : -1 };
		case 'parent':
			return { var_parent_cat: sort === 'asc' ? 1 : -1 };
		default:
			return {};
	}
};
function SubCategorylist() {
	const dispatch = useAppDispatch();
	const categories = useSelector(selectSubCategorySlice);
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
			fetchSubCategories({
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
		{ field: 'parent', headerName: 'Parent Category', flex: 1, minWidth: 200 },
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
								updatSubCategoriesStatusById({
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
								updatSubCategoriesStatusById({
									payload: {
										is_active: !params.value,
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
							dispatch(fetchSubCategoriesById({ id: params.id as string }));
						navigate(`/addsubcategories`);
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
					rowCount={categories.total}
					columnVisibilityModel={{
						id: false
					}}
					initialState={{
						pagination: {
							paginationModel: { page: categories.page - 1, pageSize: categories.pageSize }
						}
					}}
					paginationMode="server"
					pageSizeOptions={[10, 25, 50, 75, 100]}
					checkboxSelection
				/>
			}
		/>
	);
}
export default memo(SubCategorylist);
