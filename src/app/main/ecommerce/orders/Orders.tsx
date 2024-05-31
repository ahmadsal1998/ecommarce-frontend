import { styled } from '@mui/material/styles';
import EscPageSimple from '@esc/core/EscPageSimple';
import { memo, useEffect, useRef, useState } from 'react';
import withSlices from 'app/store/withSlices';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escOutlineAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useSelector } from 'react-redux';
import { CSVLink } from 'react-csv'
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useAppDispatch } from 'app/store/store';
import { orderSlice, searchOrder, selectOrderSlice, setFinalCsv, setFromDate, setOrderSelection, setToDate } from '../stores/orders/OrderStore';
import OrderList from './Orderlist';
import { allordersUrl, baseUrl } from '../respositories/urls';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';


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
function Products() {
	const orders = useSelector(selectOrderSlice);
	const dispatch = useAppDispatch();

	const [pageName, setPageName] = useState('orders_' + Date.now() + Date.now() + Math.floor(Math.random() * 1000) + '.csv')
	const excelRef = useRef<CSVLink>(null);
	var headers = [
		{ label: 'Id', key: 'id' },
		{ label: 'Order Id', key: 'order_id' },
		{ label: 'User', key: 'name' },
		{ label: 'Mobile No', key: 'mobile_no' },
		{ label: 'Delivery Mode', key: 'delivery_mode' },
		{ label: 'Payable Amount', key: 'payable_amount' },
		{ label: 'Payable Mode', key: 'payable_mode' },
		{ label: 'Date', key: 'date' },
		{ label: 'Status', key: 'status' }
	  ]
	  useEffect(()=>{
		dispatch(setOrderSelection([]));
	  },[])
	  const [exportRequest, setExportRequest] = useState(false)
	  const csvDownloadReq = async()=>{
		if(orders.finalCsvRow.length == 0){
			setExportRequest(true);
			const response = await axios.post(`${baseUrl}${allordersUrl}`,  {limit:orders.total,
			page: 1,
			sort: {_id:-1},
			search: orders.searchText
			});
			
			dispatch(setFinalCsv(response.data.data))
		
			
		}else{
			setPageName('orders_' + Date.now() + Math.floor(Math.random() * 1000) + '.csv');
			excelRef!.current!.link.click();
		}
	  }
	  useEffect(()=>{
		setExportRequest(false);
			if(orders.finalCsvRow.length>0&&exportRequest){
				setPageName('orders__' + Date.now() + Math.floor(Math.random() * 1000) + '.csv');
				excelRef!.current!.link.click();
				dispatch(setFinalCsv([]))
			}
			
	  },[orders.finalCsvRow])
	return (
		<Root
			content={
				<div className=" w-full flex flex-col min-h-full">
					<div className="EscPageCarded-header container   ">
						<div className="flex flex-col sm:flex-row flex-1 w-full items-baseline justify-between space-y-8 sm:space-y-0 py-10 sm:py-24 px-24 md:px-24">
							<div className="grow">
								<Typography className="mt-10 text-4xl font-extrabold leading-tight tracking-tight">
									Orders
								</Typography>
							</div>
							<div className="grow-0">
						<div className="flex  sm:flex-row items-end space-x-10 space-y-0 mt-20 me-20 mb-20">
							<div className="flex flex-col sm:flex-row flex-1 items-baseline justify-between">
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DemoContainer components={['DatePicker', 'DatePicker']}>
										<DatePicker    format="DD-MM-YYYY"
													className="w-min"
												
													label="From Date"
													value={dayjs(orders.fromDate, "DD-MM-YYYY")}
													onChange={(newValue) =>{ 
														dispatch(setFromDate(newValue.format("DD-MM-YYYY")))
													}}/>
									</DemoContainer>
								</LocalizationProvider>
								<Typography
									className="ms-10 me-10 text-xl font-bold text-center mt-20"
									color="grey"
								>
									To
								</Typography>
								<LocalizationProvider dateAdapter={AdapterDayjs} >
									<DemoContainer components={['DatePicker', 'DatePicker']}>
										<DatePicker  format="DD-MM-YYYY"
													
													label="To Date"
													value={dayjs(orders.toDate, "DD-MM-YYYY")}
													onChange={(newValue) => {
														dispatch(setToDate(newValue.format("DD-MM-YYYY")))
													}}/>
									</DemoContainer>
								</LocalizationProvider>
							</div>
						</div>
					</div>
							<div className="grow-0">
								
								<div className="flex  sm:flex-row items-end content-end  space-x-10 space-y-0">
									<TextField
										className=" w-max"
										id="outlined-multiline-flexible"
										InputProps={{
											style: {
												padding: 10,
												maxHeight: 42
											},
											startAdornment: (
												<InputAdornment position="start">
													<SearchIcon />
												</InputAdornment>
											)
										}}
										placeholder="Search"
										value={orders.searchText}
										onChange={(e) => dispatch(searchOrder(e.target.value))}
										maxRows={7}
										minRows={7}
										sx={{
											background: 'white',
											borderRadius: 40,
											'& fieldset': { outline: 'none', borderRadius: 40, padding: 1 }
										}}
									/>
									<div>
									{exportRequest ?<CircularProgress color="inherit" /> :<EscButton
										variant="outlined"
										color="secondary"
										buttonStyle={escOutlineAndShadowButtonStyle}
										className=" w-min hidden sm:flex "
										aria-label="Sign in"
										onClick={()=>{
											
												csvDownloadReq();
												
											
										}}
										size="large"
										startIcon={<FileDownloadOutlinedIcon />}
									>
										  Excel
										
									</EscButton>}
										<CSVLink
											style={{ 'z-index': '-1', display: 'none' }}
											data={orders.finalCsvRow}
											ref={excelRef}
											headers={headers}
											filename={pageName}
											onClick={(event) => {}}
										></CSVLink>
									</div>

									<EscButton
										variant="outlined"
										color="secondary"
										className="w-min sm:hidden"
										aria-label="Sign in"
										size="large"
										onClick={()=>{
											csvDownloadReq()
										}}
										buttonStyle={escOutlineAndShadowButtonStyle}
									>
										<FileDownloadOutlinedIcon />
									</EscButton>
								</div>
								
								
							</div>
						</div>
					</div>
					<div className="flex grow min-h-max ">
						<OrderList />
					</div>
				</div>
			}
		/>
	);
}
export default withSlices([orderSlice])(memo(Products));
