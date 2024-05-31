import { memo } from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import { escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { selectOrderSlice, setReturnOrder } from '../../../stores/orders/OrderStore';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'app/store/store';

function Refunds() {
	const orders = useSelector(selectOrderSlice);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	return (
		<TableContainer className="p-20">
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Refund / Return</TableCell>
						<TableCell align="right">Created</TableCell>
						<TableCell align="right">Order #</TableCell>
						<TableCell align="right">Order Date</TableCell>
						<TableCell align="right">Customer</TableCell>
						<TableCell align="right">Status</TableCell>
						<TableCell align="right">Refunded</TableCell>
						<TableCell align="right">Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{orders.selectedOrder.returnOrder.map((data, index) => (
						<TableRow
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							key={index}
						>
							<TableCell
								component="th"
								scope="row"
							>
								{data.return_id}
							</TableCell>
							<TableCell align="right">{data.dt_createddate}</TableCell>
							<TableCell align="right">{data.order_id}</TableCell>
							<TableCell align="right">{orders.selectedOrder.dt_createddate}</TableCell>
							<TableCell align="right">{orders.selectedOrder.user.var_mobile_no}</TableCell>
							<TableCell align="right">{data.paid_status=="N"?"Not Paid":"Paid"}</TableCell>
							<TableCell align="right">{data.paid_status=="N"?"0":data.paid_amount}</TableCell>
							<TableCell align="right">
								<EscButton
									variant="contained"
									size="large"
									buttonStyle={escGradientAndShadowButtonStyle}
									color="secondary"
									onClick={()=>{
										
									navigate(`/refund-details/${orders.selectedOrder.int_glcode}/${index}`);
									}}
								>
									View
								</EscButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
export default memo(Refunds);
