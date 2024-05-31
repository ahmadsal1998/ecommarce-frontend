import EscPageSimple from '@esc/core/EscPageSimple';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import EscPageCarded from '@esc/core/EscPageCarded';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { memo, useEffect } from 'react';
import withSlices from 'app/store/withSlices';
import { useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import Information from './information/Information';
import OrderInvoice from './invoice/OrderInvoice';
import Refunds from './refunds/Refunds';
import Comments from './comments/Comments';
import Shipments from './shipments/Shipments';
import { orderSlice, selectOrderSlice } from '../../stores/orders/OrderStore';
import { getOrderById } from '../../respositories/orders/OrderRepo';
import { useAppDispatch } from 'app/store/store';

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
const tabs = [<Information />, <OrderInvoice />, <Refunds />, <Shipments />, <Comments />];

function OrderDetail() {
	const navigate = useNavigate();
	const orders = useSelector(selectOrderSlice);
	const [tabIndex, setTabIndex] = React.useState(0);
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabIndex(newValue);
	};

	const dispatch = useAppDispatch();
	let { id } = useParams();
	useEffect(()=>{
		dispatch(getOrderById({ id: id }))
	},[])
	
	return (
		<Root
			content={
				<div className=" w-full flex flex-col min-h-full">
					<div className="EscPageCarded-header container">
						<div className="flex  sm:flex-row flex-1 w-full items-end  justify-between space-y-8 sm:space-y-0 py-10 sm:py-24 px-24 md:px-24">
							<div className="grow">
								<Button
									size="large"
									onClick={() => navigate(-1)}
									startIcon={<ArrowBackIcon />}
								>
									Orders
								</Button>
								<Typography className="mt-10 text-2xl font-extrabold leading-tight tracking-tight ">
									Order Details
								</Typography>
							</div>
						</div>
					</div>
					<div className="flex grow min-h-max  ">
						{orders.isLoading ? (
							<Box sx={{ width: '100%' }}>
								<LinearProgress color="secondary" />
							</Box>
						) : (
							<EscPageCarded
								content={
									<Box
										sx={{
											flexGrow: 0,

											padding: '1.5rem 1rem 1rem 0'
										}}
									>
										<Tabs
											value={tabIndex}
											onChange={handleChange}
											variant="scrollable"
											indicatorColor="secondary"
											orientation="horizontal"
											sx={{ borderBottom: 0.5, borderColor: 'primary.light' }}
											aria-label="visible arrows tabs example"
										>
											<Tab label="Information" />
											<Tab label="Invoices" />
											<Tab label="Refund / Return" />
											<Tab label="Shipments" />
											<Tab label="Comment History" />
										</Tabs>
										<div>{tabs[tabIndex]}</div>
									</Box>
								}
							/>
						)}
					</div>
				</div>
			}
		/>
	);
}
export default withSlices([orderSlice])(memo(OrderDetail));
