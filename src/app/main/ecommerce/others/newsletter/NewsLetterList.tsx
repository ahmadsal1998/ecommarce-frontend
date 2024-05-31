import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EscPageCarded from '@esc/core/EscPageCarded';
import { memo } from 'react';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'Id', width: 0, hideable: false, minWidth: 200 },
	{ field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
	{ field: 'date', headerName: 'Date', flex: 1, minWidth: 200 }
];
const rows = [
	
];

function NewslettList() {
	return (
		<EscPageCarded
			content={
				<DataGrid
					sx={{
						'.MuiDataGrid-columnHeaderTitle':{
							fontWeight:'bold'
						},
						'& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within': {
							outline: 'none',
						  },
				
						  '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
							outline: 'none',
						  },
						'& .MuiDataGrid-columnHeader': {},
						overflowX: 'scroll'
					}}
					rows={rows}
					columns={columns}
					disableColumnMenu
					rowHeight={70}
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
export default memo(NewslettList);
