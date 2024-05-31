import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EscPageCarded from '@esc/core/EscPageCarded';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from 'app/store/store';
import { useSelector } from 'react-redux';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import {
	selectAttributeSlice,
	setAttributeSelection,
	setPage,
	setPageSize,
	setSort
} from '../../stores/attributes/AttributeStore';
import {
	fetchAttributeById,
	fetchAttributs,
	updatAttributesStatusById
} from '../../respositories/attributes/attributeRepo';
import { setAttributeForUpate } from '../../stores/attributes/AddAttributeStore';
import { fetchAttributeValues } from '../../respositories/attributes/attributeValueRepo';
import { setAttributeId } from '../../stores/attributesvalue/AddAttrutesValueStore';


const getSortingVar = (name, sort) => {
	switch (name) {
		case 'name':
			return { var_title: sort === 'asc' ? 1 : -1 };
		default:
			return {};
	}
};

function AttributeList() {
	const dispatch = useAppDispatch();
	const attributes = useSelector(selectAttributeSlice);
	const navigate = useNavigate();
	const [newUpdating, setNewUpdating] = useState(false);
	const handleOnDateSelection = (datas) => {
		if (!newUpdating) {
			dispatch(setAttributeSelection(datas));
		} else {
			setNewUpdating(false);
		}
	};
	useEffect(() => {
		dispatch(
			fetchAttributs({
				payload: {
					limit: attributes.pageSize,
					page: attributes.page,
					sort: attributes.sort,
					search: attributes.searchText
				}
			})
		);
	}, [
		attributes.page,
		attributes.pageSize,
		attributes.sort,
		attributes.searchText,
		attributes.isStatusChange,
		attributes.isDeleted
	]);
	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'Id', width: 0, hideable: false, minWidth: 200 },
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
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
							dispatch(setAttributeId({ id: params.id, type: params.row.type }));
							dispatch(
								updatAttributesStatusById({
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
							dispatch(setAttributeForUpate(true));
							dispatch(fetchAttributeById({ id: params.id as string }));
						navigate(`/addattribute`);
						}}
					>
						<EditIcon color="secondary" />
					</Button>
				);
			}
		},
		{
			field: 'values',
			headerName: 'Values',
			sortable: false,
			width: 100,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			renderCell: (params) => {
				return (
					<EscButton
						buttonStyle={escGradientAndShadowButtonStyle}
						onClick={() => {
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
							dispatch(setAttributeId({ id: params.id, type: params.row.type }));
							dispatch(
								fetchAttributeValues({
									payload: {
										limit: attributes.pageSize,
										page: attributes.page,
										sort: attributes.sort,
										search: attributes.searchText,
										attribute_id: params.id as string
									}
								})
							);
						navigate(`/attributesvalues`);
						}}
					>
						Values
					</EscButton>
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
					rows={attributes.rows}
					loading={attributes.isLoading}
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
					rowSelectionModel={attributes.selectedRows}
					disableRowSelectionOnClick
					columnVisibilityModel={{
						id: false
					}}
					initialState={{
						pagination: {
							paginationModel: { page: attributes.page - 1, pageSize: attributes.pageSize }
						}
					}}
					paginationMode="server"
					rowCount={attributes.total}
					pageSizeOptions={[10, 25, 50, 75, 100]}
					checkboxSelection
				/>
			}
		/>
	);
}
export default memo(AttributeList);
