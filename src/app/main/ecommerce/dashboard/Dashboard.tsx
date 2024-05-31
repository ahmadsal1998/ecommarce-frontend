import EscPageSimple from '@esc/core/EscPageSimple';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { memo, useEffect, useState } from 'react';
import withSlices from 'app/store/withSlices';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import { useAppDispatch } from 'app/store/store';
import { currencySymbole } from '../constants/AppConstants';
import TotalSec from './TotalSec';
import Summery from './Summery';
import TotalOrders from './TopOrders';
import { orderSlice } from '../stores/orders/OrderStore';
import { productSlice } from '../stores/product/ProductStore';
import { userSlice } from '../stores/user/UserListStore';
import { fetchUsers } from '../respositories/users/UsersRepo';
import { fetchProduct } from '../respositories/product/ProductRepo';
import { fetchOrders } from '../respositories/orders/OrderRepo';
import axios from 'axios';
import apexchart from "apexcharts";

import { baseUrl, changepasswordUrl, dashboardordersUrl, ordersUrl } from '../respositories/urls';
import moment from 'moment';
import { dashboardSlice, selectdashboardSLice, setFromDate, setToDate } from '../stores/dashboard/DashboradState';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { setMobilePopupMenu } from 'app/theme-layouts/shared-components/navbar/store/navbarSlice';
;

const Root = styled(EscPageSimple)(({ theme }) => ({
	'& .EscPageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .EscPageSimple-content': {},
	'& .EscPageSimple-sidebarHeader': {},
	'& .EscPageSimple-sidebarContent': {}
}));

function Dashboard() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(
			fetchUsers({
				payload: { limit: 0, page: 0, sort: { _id: -1 }, search: '' }
			})
		);
		dispatch(
			fetchProduct({
				payload: { limit: 0, page: 0, sort: { _id: -1 }, search: '' }
			})
		);
		dispatch(
			fetchOrders({
				payload: { limit: 0, page: 0, sort: { _id: -1 }, search: '' ,toDate:'', fromDate:''}
			})
		);
	}, []);
	const [dashboardData, setDashoboardData] = useState({todayOrders: [],
    chartLabel: [],
    ordersForChart: [],
    chartForProducts: [],
    totalSale: 0,
    totalEarning: 0,
    statusCount: [ ],
	chartOrd: [],
    statusLabel: [],

    lastMonthEarning: 0,
    lifetimeEarning: 0});
	const dashboardSel = useSelector(selectdashboardSLice);
	
	const getDashboard = async ()=>{
	
		
		const response = await axios.post(`${baseUrl}${dashboardordersUrl}`, {
			"limit":10,
			"page":1,
			"fromDate":`${dashboardSel.fromDate.split("-")[2]}-${dashboardSel.fromDate.split("-")[1]}-${dashboardSel.fromDate.split("-")[0]}`,
			"toDate":`${dashboardSel.toDate.split("-")[2]}-${dashboardSel.toDate.split("-")[1]}-${dashboardSel.toDate.split("-")[0]}`
		});
		setDashoboardData(response.data);
		

			console.log(response.data)
				apexchart.exec("totalEarn",'updateSeries', response.data.chartOrd);
			
	}
	useEffect(()=>{
		getDashboard();
	},[dashboardSel.fromDate, dashboardSel.toDate])
	const fromDateOnchange=(v)=>{
		dispatch(setFromDate(v));
	}
	const toDateOnchange=(v)=>{
		dispatch(setToDate(v));
	}
	
	return (
		<Root
			content={
				<div className="w-full flex flex-col min-h-full " style={{overflow:"auto"}}>
					<div className="EscPageCarded-header container">
						<div className="flex flex-col sm:flex-row flex-1 w-full items-baseline justify-between space-y-8 sm:space-y-0 py-10 sm:py-24 px-24 md:px-24">
							<div className="grow">
								<Typography className="mt-10 text-4xl font-extrabold leading-tight tracking-tight">
									Dashboard
								</Typography>
							</div>
							<div className="grow-0">
								<div className="flex  sm:flex-row items-start justify-between space-x-10 space-y-0">
									<div className="flex flex-auto">
										<BarChartOutlinedIcon
											sx={{ fontSize: '5rem' }}
											color="secondary"
										/>

										<div className="col ms-5">
											<Typography className="font-normal">Last Month</Typography>
											<Typography
												className="font-semibold text-2xl"
												color="secondary"
											>{`${currencySymbole} ${dashboardData.lastMonthEarning}`}</Typography>
										</div>
									</div>
									<div className="flex flex-auto">
										<BarChartOutlinedIcon
											sx={{ fontSize: '5rem' }}
											color="secondary"
										/>

										<div className="col ">
											<Typography className="font-normal">Total Earnings</Typography>
											<Typography
												className="font-semibold text-2xl"
												color="secondary"
											>{`${currencySymbole} ${dashboardData.lifetimeEarning}`}</Typography>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col  m-20">
						<TotalSec />
						<Summery totalEarning={dashboardData.totalEarning} totalSale={dashboardData.totalSale} chartForProducts={dashboardData.chartForProducts} ordersForChart={dashboardData.ordersForChart} chartLabel={dashboardData.chartLabel} fromDateChange={fromDateOnchange} toDateChange={toDateOnchange} fromDate={dashboardSel.fromDate} toDate={dashboardSel.toDate} dateOrder={dashboardData.chartOrd}/>
						<TotalOrders statusLabel={dashboardData.statusLabel} statusCount={dashboardData.statusCount} todayOrders={dashboardData.todayOrders} />
					</div>
					
				</div>
				
			}
		/>
	);
}
export default withSlices([orderSlice, productSlice, userSlice, dashboardSlice])(memo(Dashboard));
