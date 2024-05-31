import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import EscPageSimple from '@esc/core/EscPageSimple';
import TextField from '@mui/material/TextField';
import { memo, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/store/store';
import { currencySymbole } from '../../../constants/AppConstants';
import {
	orderSlice,
	selectOrderSlice,
	setReturnOrder
} from '../../../stores/orders/OrderStore';
import axios from 'axios';
import { baseUrl, returnorderUrl } from '../../../respositories/urls';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escGradientAndShadowButtonStyle, escOutlineAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import { getOrderById } from '../../../respositories/orders/OrderRepo';
import { i } from 'vite/dist/node/types.d-jgA8ss1A';
import withSlices from 'app/store/withSlices';
import { useNavigate, useParams } from 'react-router-dom';

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

function RefundDetails() {
	const orders = useSelector(selectOrderSlice);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');
    const [shippingCharge, setShippingCharge] = useState('0.0');
    const [adjustment, setAdjustment] =  useState("0.0");
    const [fee, setFee] = useState('0.0');
    const [total, setTotal] = useState("0.0");
    const [open, setOpen] = useState(false)
    const [loading, setLoading] =  useState(false)
    const handleClose = ()=>{
        setOpen(false);
		navigate(-1);
    }
   const setShippingChargeAmount=(amount)=>{
	setShippingCharge(amount);
		if(amount.length>0){
			if(/^[0-9]*\.?[0-9]*$/.test(amount)){
				
				setTotal((parseFloat(adjustment)+parseFloat(amount)+parseFloat(fee)).toString());
			}
		}
    }
    const setAdjustmentAmount=(amount)=>{
		setAdjustment(amount);
		if(amount.length>0){
			if(amount.length>0&&/^[0-9]*\.?[0-9]*$/.test(amount)){
				
				setTotal((parseFloat(amount)+parseFloat(shippingCharge)+parseFloat(fee)).toString());
			}
		}
    }
    const setFeeAmount=(amount)=>{
		setFee(amount);
		if(amount.length>0){
			if(amount.length>0&&/^[0-9]*\.?[0-9]*$/.test(amount)){
				
				setTotal((parseFloat(adjustment)+parseFloat(shippingCharge)+parseFloat(amount)).toString());
			}
		}
    }
    const updateRefund=async()=>{
        try {
            setLoading(true);
            const response = await axios.put(`${baseUrl}${returnorderUrl}/${orders.selectedReturnOrder.int_glcode}`, {
                paid_amount: total,
                admin_comment: comment
            });
			
            setLoading(false);
            setMessage(response.data.message)
            setOpen(true)
			
            dispatch(getOrderById({ id: orders.selectedOrder.int_glcode }))
        } catch (e: unknown) {
            setLoading(false);
            throw (e as { response: { data: object } }).response.data;
        }
    }
	
	let { id } = useParams();
	let { index } = useParams();
	useEffect(()=>{
		dispatch(getOrderById({ id: id }))
	},[])

	useEffect(()=>{
		
		if(orders.selectedOrder){
			 setAdjustment(orders.selectedOrder.returnOrder[index].var_payable_amount);
    		setTotal(orders.selectedOrder.returnOrder[index].var_payable_amount);
			dispatch(setReturnOrder(orders.selectedOrder.returnOrder[index]))
			setComment(orders.selectedOrder.returnOrder[index].admin_comment)
		}
	},[orders.selectedOrder])
   
	return (
		<Root
			content={
				orders.selectedReturnOrder?
            <div className="w-full p-20">
                <Typography
					className="flex-initial text-2xl font-bold min-w-[150px]"
					color="text.secondary"
				>
					{`Refund Information (${ orders.selectedReturnOrder.return_id})`}
				</Typography>
			<div className="flex min-w-fit mt-10">
				<Typography
					className="flex-initial text-1xl font-bold min-w-[150px]"
					color="text.secondary"
				>
					Order
				</Typography>
				<Typography className="text-current  text-1xl font-bold ">{orders.selectedOrder.order_id}</Typography>
			</div>
			<div className="flex min-w-fit mt-5">
				<Typography
					className="flex-initial text-md font-medium min-w-[150px]"
					color="text.secondary"
				>
					Order Date
				</Typography>
				<Typography className="text-current  text-md font-medium ">
					{orders.selectedOrder.dt_createddate}
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
					{orders.selectedOrder.chr_status}
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
					{orders.selectedOrder.var_payment_mode === 'C' ? 'Cash' : 'Online'}
				</Typography>
			</div>
			<div className="flex flex-col sm:flex-row flex-1 w-full items-baseline justify-between space-y-8 ">
				<div className="grow">
					<Typography className="flex-initial text-2xl mt-40 font-semibold ">Account Information</Typography>
					<Typography className="text-current mt-5 text-lg font-normal ">
						Name: {orders.selectedOrder.user.var_name}
					</Typography>
					<Typography className="text-current  text-lg font-normal ">
						Email: {orders.selectedOrder.user.var_email}
					</Typography>
					<Typography className="text-current  text-lg font-normal ">
						Contact No.: {orders.selectedOrder.user.var_mobile_no}
					</Typography>
				</div>
				<div className="grow ">
					<Typography className="flex-initial text-2xl mt-40 font-semibold text-end ">Address</Typography>
					<Typography className="text-current mt-5 text-lg font-normal text-end ">
						{`${orders.selectedOrder.var_user_address.var_house_no}, ${orders.selectedOrder.var_user_address.var_app_name},
						${orders.selectedOrder.var_user_address.var_city}, ${orders.selectedOrder.var_user_address.var_state}, ${orders.selectedOrder.var_user_address.var_country}, 
						${orders.selectedOrder.var_user_address.var_pincode} `}
					</Typography>
				</div>
			</div>


            <div className="flex min-w-fit mt-20">
				<Typography
					className="flex-initial text-2xl font-medium min-w-[150px]"
					color="text.secondary"
				>
					Customer note:
				</Typography>
				<Typography className="text-current  text-md font-medium ">
					{orders.selectedReturnOrder.customer_comment}
				</Typography>
			</div>

			<Typography className="flex-initial text-1xl mt-40 font-semibold ">ITEMS</Typography>

			<Root
				className="mt-10 "
                
				content={
					<TableContainer style={{background:"white"}}>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Product</TableCell>
									<TableCell align="right">Original Price</TableCell>
									<TableCell align="right">Discount Price</TableCell>
									<TableCell align="right">Price</TableCell>
									<TableCell align="right">Qty</TableCell>
									<TableCell align="right">Tax Percent</TableCell>
									<TableCell align="right">Tax Amount</TableCell>
									<TableCell align="right">Sub Total</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								
									<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell
											component="th"
											scope="row"
                                            width={400}
										>
											<Typography>{orders.selectedReturnOrder.fk_product_arr.var_title}</Typography>
											{orders.selectedReturnOrder.fk_product_arr.variants.attributes.map((attr) => (
												<Typography>{attr.var_title}: {attr.value.var_title} </Typography>
											))}
										</TableCell>
										<TableCell align="right">{`${currencySymbole} ${orders.selectedReturnOrder.fk_product_arr.variants.price}`}</TableCell>
										<TableCell align="right">{`${currencySymbole} 0`}</TableCell>
										<TableCell align="right">{`${currencySymbole} ${orders.selectedReturnOrder.fk_product_arr.variants.selling_price}`}</TableCell>
										<TableCell align="right">{orders.selectedReturnOrder.fk_product_arr.var_unit}</TableCell>
										<TableCell align="right">{orders.selectedReturnOrder.fk_product_arr.var_gst}%</TableCell>
										<TableCell align="right">{orders.selectedReturnOrder.fk_product_arr.tax_amount}</TableCell>
										<TableCell align="right">{`${currencySymbole} ${orders.selectedReturnOrder.fk_product_arr.total_amount}`}</TableCell>
									</TableRow>
								
							</TableBody>
						</Table>
					</TableContainer>
				}
			/>
			<div className="flex flex-col sm:flex-row flex-1 w-full items-baseline justify-between space-y-30 space-x-0 sm:space-x-40 sm:space-y-0 py-10 ">
            <div className="grow w-full ">
					<div className="col  sm-w-full">
						<Typography className="flex-initial text-2xl mt-40 font-semibold mb-20 ">
                        Return Refund Comments
						</Typography>
						
						<TextField
							id="outlined-basic"
							label="Comment"
							fullWidth
							multiline
							rows={4}
							className="mt-20"
							required
							value={comment}
							onChange={(e) => {
								setComment(e.target.value);
							}}
							inputProps={{ maxLength: 100 }}
							variant="outlined"
						/>
						
					
					</div>
				</div>
                <div className="grow w-full">
					<Typography className="flex-initial text-2xl mt-40 font-semibold ">Refund Totals</Typography>
					<div className="grid grid-cols-1 w-full divide-y divide-gray-300">
						<div className="mt-5 grid grid-cols-12 gap-x-4 grid py-10 ">
							<Typography
								className="col-span-8 text-lg font-medium"
								color="text.secondary"
							>
								Sub Total
							</Typography>
							<Typography className="col-span-4 text-right  text-lg font-medium content-end">
								{`${currencySymbole} ${orders.selectedReturnOrder.var_payable_amount}`}
							</Typography>
						</div>
						<div className="mt-5 grid grid-cols-12 gap-x-4 grid py-10 ">
							<Typography
								className="col-span-8 text-lg font-medium"
								color="text.secondary"
							>
								Refund Shipping
							</Typography>
							
                            <TextField
                                hiddenLabel
                                id="filled-hidden-label-normal"
                                value={shippingCharge}
                                onChange={(e) => {
                                    setShippingChargeAmount(e.target.value);
                                }}
                                variant="outlined"
                                className="col-span-4 text-right  text-lg font-medium content-end"
                                />
							
						</div>
						<div className="mt-5 grid grid-cols-12 gap-x-4 grid py-10 ">
							<Typography
								className="col-span-8 text-lg font-medium"
								color="text.secondary"
							>
								Adjustment Refund
							</Typography>
                            <TextField
                              value={adjustment}
                                hiddenLabel
                                id="filled-hidden-label-normal"
                                className="col-span-4 text-right  text-lg font-medium content-end"
                              
                                variant="outlined"
                                onChange={(e) => {
                                    setAdjustmentAmount(e.target.value);
                                }}
                                />
						</div>
						<div className="mt-5 grid grid-cols-12 gap-x-4 grid py-10 ">
							<Typography
								className="col-span-8 text-lg font-medium"
								color="text.secondary"
							>
								Adjustment Fee
							</Typography>
                            <TextField
                                hiddenLabel
                                className="col-span-4 text-right  text-lg font-medium content-end"
                                id="filled-hidden-label-normal"
                               
                                variant="outlined"
                                value={fee}
                                onChange={(e) => {
                                    setFeeAmount(e.target.value);
                                }}
                                />
						</div>
					
						<div className="mt-5 grid grid-cols-12 gap-x-4 grid py-10 ">
							<Typography className="col-span-8 text-lg font-bold">Grand Total</Typography>
							<Typography className="col-span-4 text-right  text-xl font-medium content-end">
								{`${currencySymbole} ${total}`}
							</Typography>
						</div>
                        { 
                       loading?<CircularProgress color="inherit" />:<div>{ 
						orders.selectedOrder.returnOrder[index].paid_status=="Y"?
						<div>
							<h1 style={{color:'black', marginTop:10, fontSize:16}}>Status: <span style={{fontSize:20}}>Paid</span>
							</h1>
							<h1 style={{color:'black', marginTop:10, fontSize:16}}>Amount: <span style={{fontSize:20}}>{currencySymbole }{orders.selectedReturnOrder.paid_amount}</span></h1>
						</div>:<EscButton
                            variant="outlined"
                            color="secondary"
							style={{marginTop:20}}
                            className=" w-min hidden sm:flex "
                            buttonStyle={escGradientAndShadowButtonStyle}
                            size="large"
                            onClick={()=>{
                               updateRefund();
                            }}
                           
                        >
                            Submit
                       
                       </EscButton>}
					   </div>
                       }
					</div>
				</div>
			
			</div>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogContent>
					<DialogContentText>
						<Box sx={{ width: '250px', fontSize: 16 }}>{message}</Box>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>OK</Button>
				</DialogActions>
			</Dialog>
		</div>:<div></div>
            }></Root>
	);
}
export default  withSlices([orderSlice]) (memo(RefundDetails));
