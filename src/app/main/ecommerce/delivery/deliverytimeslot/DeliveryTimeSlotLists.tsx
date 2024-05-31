import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EscPageCarded from '@esc/core/EscPageCarded';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import { useAppDispatch } from 'app/store/store';
import { setSelected } from '../../stores/deliveries/DeliveryTimeSlotStore';


const columns: GridColDef[] = [
	{ field: 'id', headerName: 'Sl. No.', width: 0, hideable: false, minWidth: 200 },
	{ field: 'starttime', headerName: 'Start Time', flex: 1, minWidth: 200 },
	{ field: 'endtime', headerName: 'End Time', maxWidth: 200, minWidth: 200 },
	{ field: 'slotend', headerName: 'Slot End Time', maxWidth: 200, minWidth: 200 },
	{ field: 'deliverytype', headerName: 'Delivery Type', maxWidth: 200, minWidth: 200 },
	{
		field: 'action',
		headerName: 'Option',
		sortable: false,
		maxWidth: 100,
		minWidth: 100,
		align: 'center',
		headerAlign: 'center',
		renderCell: () => {
			return (
				<EscButton
					variant="contained"
					aria-label="View"
					size="large"
					component={Link}
					to={`/orderdetail`}
					buttonStyle={escGradientAndShadowButtonStyle}
					color="secondary"
					startIcon={<EditIcon />}
				>
					Edit
				</EscButton>
			);
		}
	}
];
const rows = [
	{
		id: 1,
		starttime: '09:00 AM',
		endtime: '09:00 PM',
		slotend: '08:00 PM',
		deliverytype: 'FAST'
	},
	{
		id: 2,
		starttime: '09:00 AM',
		endtime: '09:00 PM',
		slotend: '08:00 PM',
		deliverytype: 'FAST'
	},
	{
		id: 3,
		starttime: '09:00 AM',
		endtime: '09:00 PM',
		slotend: '08:00 PM',
		deliverytype: 'FAST'
	},
	{
		id: 4,
		starttime: '09:00 AM',
		endtime: '09:00 PM',
		slotend: '08:00 PM',
		deliverytype: 'FAST'
	},
	{
		id: 5,
		starttime: '09:00 AM',
		endtime: '09:00 PM',
		slotend: '08:00 PM',
		deliverytype: 'FAST'
	},
	{
		id: 6,
		starttime: '09:00 AM',
		endtime: '09:00 PM',
		slotend: '08:00 PM',
		deliverytype: 'FAST'
	}
];

function DeliveryTimeSlotList() {
	const dispatch = useAppDispatch();
	const handleOnDateSelection = (datas) => {
		dispatch(setSelected((datas as []).length > 0));
	};
	return (
		<EscPageCarded
			content={
				<DataGrid
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
					rows={rows}
					columns={columns}
					disableColumnMenu
					onRowSelectionModelChange={handleOnDateSelection}
					rowHeight={70}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 10 }
						}
					}}
					pageSizeOptions={[10, 25, 50, 75, 100]}
					checkboxSelection
				/>
			}
		/>
	);
}
export default memo(DeliveryTimeSlotList);
