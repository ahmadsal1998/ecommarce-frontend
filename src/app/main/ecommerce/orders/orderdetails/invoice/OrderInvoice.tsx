import { memo, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { useSelector } from 'react-redux';
import { selectOrderSlice } from '../../../stores/orders/OrderStore';
import { useAppDispatch } from 'app/store/store';
import { getOrderById } from '../../../respositories/orders/OrderRepo';
import CircularProgress from '@mui/material/CircularProgress';
import { baseUrl } from '../../../respositories/urls';

function OrderInvoice() {
	const orders = useSelector(selectOrderSlice);
	const navigate = useNavigate();	
	const [loading, setLoading] = useState(false);
	return (
		<TableContainer className="p-20">
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Invoice</TableCell>
						<TableCell align="right">Invoice Date</TableCell>
						<TableCell align="right">Order #</TableCell>
						<TableCell align="right">Order Date</TableCell>
						<TableCell align="right">Customer</TableCell>
						<TableCell align="right">Status</TableCell>
						<TableCell align="right">Amount</TableCell>
						<TableCell align="right">Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{orders.selectedOrder.invoices.map((data, index) => (
						<TableRow
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							key={index}
						>
							<TableCell
								component="th"
								scope="row"
							>
								{data.invoice_id}
							</TableCell>
							<TableCell align="right">{data.dt_createddate}</TableCell>
							<TableCell align="right">{data.order_id}</TableCell>
							<TableCell align="right">{data.dt_orderdate}</TableCell>
							<TableCell align="right">
								{(data.customer as { var_mobile_no: string }).var_mobile_no}
							</TableCell>
							<TableCell align="right">{data.payment_method === 'C' ? 'Cash' : 'Online'}</TableCell>
							<TableCell align="right">{data.amount}</TableCell>
							<TableCell align="right">
								<EscButton
									variant="contained"
									size="large"
									color="secondary"
									buttonStyle={escGradientAndShadowButtonStyle}
									component={Link}
									
									onClick={()=>{ 
										setLoading(true);
										fetch(`${baseUrl}/invoice-pdf/${orders.selectedOrder.int_glcode}`, {
											method: 'GET',
											headers: {
											'Content-Type': 'application/pdf',
											},
										})
										.then((response) => response.blob())
										.then((blob) => {
											// Create blob link to download
											const url = window.URL.createObjectURL(
											new Blob([blob]),
											);
											const link = document.createElement('a');
											link.href = url;
											link.setAttribute(
											'download',
											`${orders.selectedOrder.int_glcode}.pdf`,
											);

											// Append to html link element page
											document.body.appendChild(link);

											// Start download
											link.click();

											// Clean up and remove the link
											link.parentNode.removeChild(link);
											setLoading(false);	
										});
																			
									}}
								>
									{loading? <CircularProgress color="inherit" />:"Download"}
								</EscButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>

	);
}
export default memo(OrderInvoice);
