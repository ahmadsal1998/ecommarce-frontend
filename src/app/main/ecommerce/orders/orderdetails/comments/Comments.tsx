import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selectOrderSlice } from '../../../stores/orders/OrderStore';

function Comments() {
	const orders = useSelector(selectOrderSlice);
	return (
		<div className="flex flex-col sm:flex-row flex-1 w-8/12 items-baseline  space-y-30 space-x-0 sm:space-x-40 sm:space-y-0 py-10 m-20">
			<table>
			{orders.selectedOrder.comments.map((data, index) => 
			
				<tr>
				<td>
				<Typography
							gutterBottom
							component="div"
							color="text.secondary"
						>
							{data.dt_createddate}
						</Typography>
				</td>
				<td>
				<Typography
							variant="body2"
							style={{ marginLeft:"20px"}}
							className="font-semibold"
						>
							{data.message}
						</Typography>
				</td>
				</tr>
			
				
			)}
			</table>
		</div>
	);
}
export default Comments;
