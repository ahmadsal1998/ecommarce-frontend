import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Link } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Divider from '@mui/material/Divider';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import { currencySymbole } from '../constants/AppConstants';
import { TotalEarn } from './charts/TotalEarn';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { selectdashboardSLice } from '../stores/dashboard/DashboradState';



function Summery({totalSale, totalEarning, chartForProducts,dateOrder, ordersForChart,chartLabel, fromDateChange, toDateChange, fromDate, toDate}) {
	const dashboardSel = useSelector(selectdashboardSLice);
	return (
		<Card className=" w-full flex flex-col  mt-20" >
			<div className="flex-1 ">
				<div className="flex flex-col sm:flex-row flex-1 w-full items-baseline justify-between space-y-8 sm:space-y-0 py-10 sm:py-24 px-24 md:px-24">
					<div className="grow">
						<Typography className="mt-10 text-2xl font-bold leading-tight tracking-tight">
							Sales Summary
						</Typography>
						<Typography
							className="mt-5"
							color="grey"
						>
							Overview of Latest Month
						</Typography>
					</div>
					<div className="grow-0">
						<div className="flex  sm:flex-row items-center justify-between space-x-10 space-y-0">
							<div className="flex flex-col sm:flex-row flex-1 w-full items-baseline justify-between">
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DemoContainer components={['DatePicker', 'DatePicker']}>
										<DatePicker    format="DD-MM-YYYY"
													className="w-full"
												
													label="From Date"
													value={dayjs(dashboardSel.fromDate, "DD-MM-YYYY")}
													onChange={(newValue) => fromDateChange(newValue.format("DD-MM-YYYY"))}/>
									</DemoContainer>
								</LocalizationProvider>
								<Typography
									className="ms-10 me-10 text-xl font-bold text-center mt-20"
									color="grey"
								>
									To
								</Typography>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DemoContainer components={['DatePicker', 'DatePicker']}>
										<DatePicker  format="DD-MM-YYYY"
													className="w-full"
													
													label="To Date"
													value={dayjs(dashboardSel.toDate, "DD-MM-YYYY")}
													onChange={(newValue) => toDateChange(newValue.format("DD-MM-YYYY"))}/>
									</DemoContainer>
								</LocalizationProvider>
							</div>
						</div>
					</div>
				</div>
				<Divider
					className="m-10"
					sx={{
						borderColor: '#d9dadb'
					}}
				/>
				<div className="flex flex-col sm:flex-row flex-1 w-full   items-end justify-between ">
					<div className="col items-end me-40">
						<div className="flex mt-60 ms-20 me-20">
							<div className="col">
								<Typography className="text-3xl font-bold">{`${currencySymbole} ${totalEarning}`}</Typography>
								<Typography color="grey">Current Month Earnings</Typography>
							</div>
						</div>
						<div className="flex ms-20 me-20 mt-40 ">
							<div className="col">
								<Typography className="text-3xl font-bold">{totalSale}</Typography>
								<Typography color="grey">Current Month Sales</Typography>
							</div>
						</div>
						<EscButton
							variant="contained"
							className=" ms-20 me-20 mt-40 mb-20    "
							color="secondary"
							aria-label="Sign in"
							component={Link}
							to={`/orders`}
							size="large"
							buttonStyle={escGradientAndShadowButtonStyle}
						>
							View all orders
						</EscButton>
					</div>
					
					<div className="flex-1 p-20 ">
						<TotalEarn chartForProducts={chartForProducts} ordersForChart={ordersForChart} chartLabel={chartLabel} dateOrder={dateOrder} />
					</div>
				</div>
			</div>
		</Card>
	);
}
export default Summery;
