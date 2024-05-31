import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EscPageCarded from '@esc/core/EscPageCarded';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { memo, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from 'app/store/store';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import {
	selectBannerSlotSlice,
	setBannerSelection,
	setPage,
	setPageSize,
	setSort
} from '../stores/banners/BannerStore';
import { fetchBannerById, fetchBanners, updatBannerStatusById } from '../respositories/banners/BannerRepo';
import { setBannerForUpate } from '../stores/banners/AddBannerStore';
import {  baseUrl } from '../respositories/urls';

const getSortingVar = (name, sort) => {
	switch (name) {
		case 'name':
			return { var_title: sort === 'asc' ? 1 : -1 };
		default:
			return {};
	}
};
function BannerList() {
	const banner = useSelector(selectBannerSlotSlice);
	const [newUpdating, setNewUpdating] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const handleOnDateSelection = (datas) => {
		if (!newUpdating) {
			dispatch(setBannerSelection(datas as []));
		} else {
			setNewUpdating(false);
		}
	};

	useEffect(() => {
		dispatch(
			fetchBanners({
				payload: {
					limit: banner.pageSize,
					page: banner.page,
					sort: banner.sort,
					search: banner.searchText
				}
			})
		);
	}, [banner.page, banner.pageSize, banner.sort, banner.searchText, banner.isStatusChange, banner.isDeleted]);

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'Id', width: 0, hideable: false, minWidth: 200 },
		{
			field: 'banner',
			headerName: 'Banner Image',
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
			minWidth: 200,
			maxWidth: 200
		},
		{ field: 'title', headerName: 'Title', flex: 1, minWidth: 200 },
		{ field: 'descriptioin', headerName: 'Description', flex: 1, minWidth: 200 },
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
								updatBannerStatusById({
									uid: params.id as string,
									payload: {
										chr_publish: params.value === 'Y' ? 'N' : 'Y'
									}
								})
							);
						}}
					>
						{params.value === 'Y' ? (
							<CheckCircleIcon color="secondary" />
						) : (
							<UnpublishedIcon color="error" />
						)}
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
							dispatch(setBannerForUpate(true));
							dispatch(fetchBannerById({ id: params.id as string }));
						navigate(`/add_banner`);
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
					rows={banner.rows}
					loading={banner.isLoading}
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
					rowSelectionModel={banner.selectedRows}
					disableRowSelectionOnClick
					columnVisibilityModel={{
						id: false
					}}
					initialState={{
						pagination: {
							paginationModel: { page: banner.page - 1, pageSize: banner.pageSize }
						}
					}}
					paginationMode="server"
					rowCount={banner.total}
					pageSizeOptions={[10, 25, 50, 75, 100]}
					checkboxSelection
				/>
			}
		/>
	);
}
export default memo(BannerList);
