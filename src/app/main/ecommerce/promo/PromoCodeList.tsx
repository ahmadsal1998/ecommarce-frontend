import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EscPageCarded from '@esc/core/EscPageCarded';
import { useAppDispatch } from 'app/store/store';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { selectPromoCodeSlotSlice, setPage, setPageSize, setPromo, setSort } from '../stores/promo/PromocodesState';
import { fetchPromo, updatPromoStatusById } from '../respositories/promocodes/PromocodeRepo';

const getSortingVar = (name, sort) => {
	switch (name) {
		case 'couponcode':
			return { var_promocode: sort === 'asc' ? 1 : -1 };
		case 'discountpercentage':
			return { var_percentage: sort === 'asc' ? 1 : -1 };
		case 'maxdiscountprice':
			return { max_discount_price: sort === 'asc' ? 1 : -1 };
		case 'minorderprice':
			return { min_order: sort === 'asc' ? 1 : -1 };
		case 'useperuser':
			return { no_of_time: sort === 'asc' ? 1 : -1 };
		case 'expirydate':
			return { expiry_date: sort === 'asc' ? 1 : -1 };

		default:
			return {};
	}
};
function PromoCodelist() {
	const promo = useSelector(selectPromoCodeSlotSlice);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'Id', width: 0, hideable: false, minWidth: 200 },
		{ field: 'couponcode', headerName: 'Coupon Code', flex: 1, minWidth: 200 },
		{ field: 'discountpercentage', headerName: 'Discount Percentage', flex: 1, minWidth: 200 },
		{ field: 'maxdiscountprice', headerName: 'Max Discount Price', flex: 1, minWidth: 200 },
		{ field: 'minorderprice', headerName: 'Min Order Price', flex: 1, minWidth: 200 },
		{ field: 'useperuser', headerName: 'Use Per User', flex: 1, minWidth: 200 },
		{ field: 'expirydate', headerName: 'Expiry Date', flex: 1, minWidth: 200 },
		{
			field: 'publish',
			headerName: 'Published',
			sortable: false,
			width: 150,
			minWidth: 150,
			align: 'center',
			headerAlign: 'center',
			renderCell: (params) => {
				return params.value ? (
					<CheckCircleIcon
						color="secondary"
						onClick={() => {
							dispatch(
								updatPromoStatusById({
									payload: {
										chr_publish: !params.value,
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
								updatPromoStatusById({
									payload: {
										chr_publish: !params.value,
										uid: params.id as string
									}
								})
							);
						}}
					/>
				);
			}
		}
	];
	const [newUpdating, setNewUpdating] = useState(false);
	const handleOnDateSelection = (datas) => {
		if (!newUpdating) {
			dispatch(setPromo(datas));
		} else {
			setNewUpdating(false);
		}
	};
	useEffect(() => {
		dispatch(
			fetchPromo({
				payload: { limit: promo.pageSize, page: promo.page, sort: promo.sort, search: promo.searchText }
			})
		);
	}, [promo.page, promo.pageSize, promo.sort, promo.searchText, promo.isDeleted, promo.isChangedStatus]);
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
					rows={promo.rows}
					loading={promo.isLoading}
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
					rowSelectionModel={promo.selectedRows}
					disableRowSelectionOnClick
					columnVisibilityModel={{
						id: false
					}}
					initialState={{
						pagination: {
							paginationModel: { page: promo.page - 1, pageSize: promo.pageSize }
						}
					}}
					paginationMode="server"
					rowCount={promo.total}
					pageSizeOptions={[10, 25, 50, 75, 100]}
					autoPageSize={false}
					checkboxSelection
				/>
			}
		/>
	);
}
export default memo(PromoCodelist);
