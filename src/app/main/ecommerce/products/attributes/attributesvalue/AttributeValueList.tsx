import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EscPageCarded from '@esc/core/EscPageCarded';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { memo, useEffect, useState } from 'react';
import { useAppDispatch } from 'app/store/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import EditIcon from '@mui/icons-material/Edit';
import withSlices from 'app/store/withSlices';
import Button from '@mui/material/Button';
import {
	attributeValueSlice,
	selectAttributeValueSlice,
	setAttributeValuesSelection,
	setPage,
	setPageSize,
	setSort
} from '../../../stores/attributesvalue/AttributesValueStore';
import {
	selectAddAttributesValueSlice,
	setAttributeForUpate
} from '../../../stores/attributesvalue/AddAttrutesValueStore';
import {
	fetchAttributeValueById,
	fetchAttributeValues,
	updatAttributeValueStatusById
} from '../../../respositories/attributes/attributeValueRepo';


const getSortingVar = (name, sort) => {
	switch (name) {
		case 'name':
			return { var_title: sort === 'asc' ? 1 : -1 };
		default:
			return {};
	}
};

function AttributeValueList() {
	const dispatch = useAppDispatch();
	const attributes = useSelector(selectAttributeValueSlice);
	const navigate = useNavigate();
	const addAttribute = useSelector(selectAddAttributesValueSlice);
	const [newUpdating, setNewUpdating] = useState(false);
	const handleOnDateSelection = (datas) => {
		if (!newUpdating) {
			dispatch(setAttributeValuesSelection(datas));
		} else {
			setNewUpdating(false);
		}
	};
	useEffect(() => {
		dispatch(
			fetchAttributeValues({
				payload: {
					limit: attributes.pageSize,
					page: attributes.page,
					sort: attributes.sort,
					search: attributes.searchText,
					attribute_id: addAttribute.attributeId
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
							dispatch(
								updatAttributeValueStatusById({
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
							dispatch(fetchAttributeValueById({ id: params.id as string }));
						navigate(`/addattributevalue`);
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
export default withSlices([attributeValueSlice])(memo(AttributeValueList));
