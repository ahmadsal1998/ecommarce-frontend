import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TotalSellingAnalytics } from './charts/TotalSellingAnalytics';
import Chip from '@mui/material/Chip';

const getStatus = (status: string) => {
	switch (status) {
		case 'A':
			return 'Received';
		case 'C':
			return 'Cancelled';
		case 'D':
			return 'Delivered';
		case 'P':
			return 'Processed';
		case 'S':
			return 'Shipped';
		case 'R':
			return 'Returned';
		default:
			return '';
	}
};
const getColor = (status: string) => {
	switch (status) {
		case 'R':
			return 'orange';
		case 'C':
			return 'red';
		case 'D':
			return 'rgba(21, 191, 30, 1)';
		case 'P':
			return 'rgba(191, 114, 21, 1)';
		case 'S':
			return 'rgba(66, 135, 245, 1)';
		case 'R':
			return 'red';
		default:
			return 'orange';
	}
};
function TotalOrders({statusLabel, statusCount, todayOrders}) {
	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full justify-center " >
			<Card className="flex-1  flex flex-col  mt-10">
				<div className="flex-1 ">
					<div className="flex flex-col sm:flex-row flex-1 w-full justify-start space-y-8 sm:space-y-0 py-10 sm:py-24 px-24 md:px-24">
						<div className="grow">
							<Typography className="mt-10 text-2xl font-bold leading-tight tracking-tight">
								Today's Top Orders
							</Typography>
							<Typography
								className="mt-5"
								color="grey"
							>
								Overview of Latest Month
							</Typography>
						</div>
					</div>
					<Divider
						className="ms-10 me-10"
						sx={{
							borderColor: '#d9dadb'
						}}
					/>
					<div className="f">
						<TableContainer >
							<Table
								sx={{ minWidth: 650 }}
								aria-label="simple table"
							>
								<TableHead>
									<TableRow>
										<TableCell> Order Id</TableCell>
										<TableCell align="right">User</TableCell>
										<TableCell align="right">Status</TableCell>
										<TableCell align="right">Payments</TableCell>
										<TableCell align="right">Amount</TableCell>
									</TableRow>
								</TableHead>
								{todayOrders.map((element) => {
									
								
								return <TableBody key={element.order_id}>
									<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell
											component="th"
											scope="row"
										>
											{element.order_id}
										</TableCell>
										<TableCell align="right">{element.user[0].var_name}</TableCell>
										<TableCell align="right"  > <Chip label={getStatus(element.chr_status)} sx={{ color:"white", background: getColor(element.chr_status) }} /></TableCell>
										<TableCell align="right">  <Chip label={element.var_payment_mode==='C'?"Cash":"Online"} sx={{color:"white", background: element.var_payment_mode==='C'?'orange':'blue'}}/> </TableCell>
										<TableCell align="right" sx={{color:"green", fontWeight:"bold"}}>{element.var_payable_amount}</TableCell>
									</TableRow>
								</TableBody>
								})
							}
							</Table>
						</TableContainer>
					</div>
				</div>
			</Card>
			<div>
				<TotalSellingAnalytics statusLabel={statusLabel} statusCount={statusCount} />
			</div>
		</div>
	);
}
export default TotalOrders;
