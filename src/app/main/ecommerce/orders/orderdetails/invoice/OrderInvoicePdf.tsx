/* eslint-disable react/self-closing-comp */
import { Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import EscPageSimple from '@esc/core/EscPageSimple';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import { currencySymbole } from '../../../constants/AppConstants';
import { selectOrderSlice } from '../../../stores/orders/OrderStore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'app/store/store';
import { getOrderById } from '../../../respositories/orders/OrderRepo';
import axios from 'axios';

import { baseUrl, ordersUrl } from '../../../respositories/urls';

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
function OrderInvoicePdf() {

	const [isLoding, setLoading] = useState(false);
	const [order, setOrder] = useState(null);
	const dispatch = useAppDispatch();
	let { id } = useParams();
	
	const getInvoice = async ()=>{
		try{
			setLoading(true);
			const response = await axios.get(`${baseUrl}/invoice/${id}`);
			setLoading(false);
			setOrder(response.data.data)
		}catch(e){

		}
	}
	useEffect(()=>{
		getInvoice();
	},[])

	return (
		
		<>{(isLoding||order==null)?null:<div className="m-20" style={{background:"white"}} >
					<div className=" p-20">
						<div className="flex min-w-fit mt-20">
							<Typography
								className="flex-initial text-2xl font-bold min-w-[150px]"
								color="text.secondary"
							>
								Order
							</Typography>
							<Typography className="text-current  text-2xl font-bold ">
								{order.order_id}
							</Typography>
						</div>
						<div className="flex min-w-fit mt-5">
							<Typography
								className="flex-initial text-md font-medium min-w-[150px]"
								color="text.secondary"
							>
								Order Date
							</Typography>
							<Typography className="text-current  text-md font-medium ">
								{order.dt_createddate}
							</Typography>
						</div>
						<div className="flex min-w-fit mt-5">
							<Typography
								className="flex-initial text-md font-medium min-w-[150px]"
								color="text.secondary"
							>
								Order Status
							</Typography>
							<Typography className="text-current  text-md font-medium ">
								{order.chr_status}
							</Typography>
						</div>
						<div className="flex min-w-fit mt-5">
							<Typography
								className="flex-initial text-md font-medium min-w-[150px]"
								color="text.secondary"
							>
								Payment Mode
							</Typography>
							<Typography className="text-current  text-md font-medium ">
								{order.var_payment_mode === 'C' ? 'Cash' : 'Online'}
							</Typography>
						</div>
						<div className="flex flex-col sm:flex-row flex-1 w-full items-baseline justify-between space-y-8 ">
							<div className="grow">
								<Typography className="flex-initial text-2xl mt-40 font-semibold ">
									Account Information
								</Typography>
								<Typography className="text-current mt-5 text-lg font-normal ">
									Name: {order.user.var_name}
								</Typography>
								<Typography className="text-current  text-lg font-normal ">
									Email: {order.user.var_email}
								</Typography>
								<Typography className="text-current  text-lg font-normal ">
									Contact No.: {order.user.var_mobile_no}
								</Typography>
							</div>
							<div className="grow ">
								<Typography className="flex-initial text-2xl mt-40 font-semibold text-end ">
									Address
								</Typography>
								<Typography className="text-current mt-5 text-lg font-normal text-end ">
									{`${order.var_user_address.var_house_no}, ${order.var_user_address.var_app_name},
						${order.var_user_address.var_city}, ${order.var_user_address.var_state}, ${order.var_user_address.var_country}, 
						${order.var_user_address.var_pincode} `}
								</Typography>
							</div>
						</div>
						<Typography className="flex-initial text-1xl mt-40 font-semibold ">ITEMS</Typography>

						<Root
							className="mt-10 p-10"
							content={
								<TableContainer>
									<Table aria-label="simple table">
										<TableHead>
											<TableRow>
												<TableCell>Product</TableCell>
												
												<TableCell align="right">Discount Amount</TableCell>
												<TableCell align="right">Price</TableCell>
												<TableCell align="right">Qty</TableCell>
												
												<TableCell align="right">Tax Amount</TableCell>
												<TableCell align="right">Sub Total</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{order.fk_product_arr.map((data) => (
												<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
													<TableCell
														component="th"
														scope="row"
													>
														<Typography>{data.var_title}</Typography>
														{data.variants.attributes.map((attr) => (
															<Typography>
																{attr.var_title}: {attr.value.var_title}{' '}
															</Typography>
														))}
													</TableCell>
													
													<TableCell align="right">{`${currencySymbole} ${order.var_discount_amount}`}</TableCell>
													<TableCell align="right">{`${currencySymbole} ${data.variants.selling_price}`}</TableCell>
													<TableCell align="right">{data.var_unit}</TableCell>
										
													<TableCell align="right">{data.tax_amount}</TableCell>
													<TableCell align="right">{`${currencySymbole} ${data.total_amount}`}</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							}
						/>
						<div className="flex flex-col sm:flex-row flex-1 w-full items-baseline justify-between space-x-0 sm:space-x-40 sm:space-y-0 py-10 ">
							<div className="grow w-full">
								<Typography className="flex-initial text-1xl mt-40 font-semibold ">
									ORDER TOTALS
								</Typography>
								<div className="grid grid-cols-1 w-full divide-y divide-gray-300">
									<div className="mt-5 grid grid-cols-12 gap-x-4 grid py-10 ">
										<Typography
											className="col-span-8 text-lg font-medium"
											color="text.secondary"
										>
											Sub Total
										</Typography>
										<Typography className="col-span-4 text-right  text-lg font-medium content-end">
											{`${currencySymbole} ${order.var_total_amount}`}
										</Typography>
									</div>
									<div className="mt-5 grid grid-cols-12 gap-x-4 grid py-10 ">
										<Typography
											className="col-span-8 text-lg font-medium"
											color="text.secondary"
										>
											Discount
										</Typography>
										<Typography className="col-span-4 text-right  text-lg font-medium content-end">
											{`${currencySymbole} ${order.var_discount_amount}`}
										</Typography>
									</div>
									
									<div className="mt-5 grid grid-cols-12 gap-x-4 grid py-10 ">
										<Typography
											className="col-span-8 text-lg font-medium"
											color="text.secondary"
										>
											Coupon Disount
										</Typography>
										<Typography className="col-span-4 text-right  text-lg font-medium content-end">
											{`${currencySymbole} 0`}
										</Typography>
									</div>
								
									<div className="mt-5 grid grid-cols-12 gap-x-4 grid py-10 ">
										<Typography
											className="col-span-8 text-lg font-medium"
											color="text.secondary"
										>
											Tax
										</Typography>
										<Typography className="col-span-4 text-right  text-lg font-medium content-end">
											{`${currencySymbole} ${order.var_tax}`}
										</Typography>
									</div>
									<div className="mt-5 grid grid-cols-12 gap-x-4 grid py-10 ">
										<Typography
											color="text.secondary"
											className="col-span-8 text-lg font-medium"
										>
											Delivery Charges
										</Typography>
										<Typography className="col-span-4 text-right  text-lg font-medium content-end">
											{`${currencySymbole} ${order.var_delivery_charge}`}
										</Typography>
									</div>
									<div className="mt-5 grid grid-cols-12 gap-x-4 grid py-10 ">
										<Typography className="col-span-8 text-lg font-bold">Grand Total</Typography>
										<Typography className="col-span-4 text-right  text-xl font-medium content-end">
											{`${currencySymbole} ${order.var_payable_amount}`}
										</Typography>
									</div>
								</div>
							</div>
							<div className="grow w-full "></div>
						</div>
					</div>
				</div>
					}</>
			
	);
}
export default OrderInvoicePdf;
