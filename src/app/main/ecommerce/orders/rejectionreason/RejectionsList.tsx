import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EscPageCarded from '@esc/core/EscPageCarded';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { memo } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from 'app/store/store';
import { escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import { Link } from 'react-router-dom';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { setSelected } from '../../stores/orders/rejectionReasonStore';


const columns: GridColDef[] = [
	{ field: 'id', headerName: 'Id', width: 0, hideable: false, minWidth: 200 },
	{ field: 'title', headerName: 'Title', flex: 1, minWidth: 200 },

	{
		field: 'publish',
		headerName: 'Publish',
		sortable: false,
		width: 150,
		minWidth: 150,
		align: 'center',
		headerAlign: 'center',
		renderCell: (params) => {
			return params.value === 'Y' ? <CheckCircleIcon color="secondary" /> : <UnpublishedIcon color="error" />;
		}
	},
	{
		field: 'option',
		headerName: 'Option',
		sortable: false,
		width: 150,
		minWidth: 150,
		align: 'center',
		headerAlign: 'center',
		renderCell: () => {
			return (
				<EscButton
					variant="contained"
					color="secondary"
					className=" w-min  hidden sm:flex "
					aria-label="Sign in"
					size="large"
					buttonStyle={escGradientAndShadowButtonStyle}
					component={Link}
					to={`/add-user`}
					startIcon={<EditIcon />}
				>
					Edit
				</EscButton>
			);
		}
	}
];

const rows = [
	{ id: 1, title: 'Test one', publish: 'Y' },
	{ id: 2, title: 'Text two', publish: 'N' },
	{ id: 3, title: 'Test three', publish: 'Y' },
	{ id: 4, title: 'Text four', publish: 'N' },
	{ id: 5, title: 'Test five', publish: 'Y' },
	{ id: 6, title: 'Text six', publish: 'Y' },
	{ id: 7, title: 'Test seven', publish: 'Y' },
	{ id: 8, title: 'Text nine', publish: 'y' },
	{ id: 9, title: 'Test ten', publish: 'Y' }
];
function Rejectlist() {
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
					columnVisibilityModel={{
						id: false
					}}
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
export default memo(Rejectlist);
