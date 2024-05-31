import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import EscPageSimple from '@esc/core/EscPageSimple';
import TextField from '@mui/material/TextField';
import { memo, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import InputLabel from '@mui/material/InputLabel';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escGradientAndShadowButtonStyle, escDisabledButtonStyle } from 'app/configs/escButtonStyleConfig';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/store/store';
import { currencySymbole } from '../../../constants/AppConstants';
import {
	selectOrderSlice,
	setComment,
	orderDialogOpenClose,
	clearCommentData,
	isCommentValid,
	setStatus
} from '../../../stores/orders/OrderStore';
import { addOrderComment, getOrderById } from '../../../respositories/orders/OrderRepo';
import { OrderProductModel, ProductModel } from '../../../models/products/product/ProductModel';
import { OrderProduct } from '../../../models/orders/OrderModel';

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

const getDiscountAmount=(product:Array<OrderProduct>)=>{
	let discountAmount = 0;
	product.forEach((data)=>{
		discountAmount+=parseFloat(data.variants.price) - parseFloat(data.variants.selling_price);
	})
	return discountAmount;
}
function Information() {
	const orders = useSelector(selectOrderSlice);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(isCommentValid([]));
	}, [orders.comment, orders.status]);
	const handleClose = () => {
		dispatch(orderDialogOpenClose([]));
		dispatch(clearCommentData([]));
		dispatch(getOrderById({ id: orders.selectedOrder.int_glcode }));
	};
	const addComment = () => {
		dispatch(
			addOrderComment({
				order_id: orders.selectedOrder.order_id,
				message: orders.comment,
				status: orders.status
			})
		);
	};
	return (
		<div className="w-full p-20">
			<div className="flex min-w-fit mt-20">
				<Typography
					className="flex-initial text-2xl font-bold min-w-[150px]"
					color="text.secondary"
				>
					Order
				</Typography>
				<Typography className="text-current  text-2xl font-bold ">{orders.selectedOrder.order_id}</Typography>
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

			<Typography className="flex-initial text-1xl mt-40 font-semibold ">ITEMS</Typography>

			<Root
				className="mt-10 p-10"
				content={
					<TableContainer>
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
								{orders.selectedOrder.fk_product_arr.map((data) => (
									<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell
											component="th"
											scope="row"
										>
											<Typography>{data.var_title}</Typography>
											{data.variants.attributes.map((attr) => (
												<Typography>{attr.var_title}: {attr.value.var_title} </Typography>
											))}
										</TableCell>
										<TableCell align="right">{`${currencySymbole} ${data.variants.price}`}</TableCell>
										<TableCell align="right">{`${currencySymbole} ${parseFloat(data.variants.price) - parseFloat(data.variants.selling_price)}`}</TableCell>
										<TableCell align="right">{`${currencySymbole} ${data.variants.selling_price}`}</TableCell>
										<TableCell align="right">{data.var_unit}</TableCell>
										<TableCell align="right">{data.var_gst}%</TableCell>
										<TableCell align="right">{data.tax_amount}</TableCell>
										<TableCell align="right">{`${currencySymbole} ${data.total_amount}`}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				}
			/>
			<div className="flex flex-col sm:flex-row flex-1 w-full items-baseline justify-between space-y-30 space-x-0 sm:space-x-40 sm:space-y-0 py-10 ">
				<div className="grow w-full">
					<Typography className="flex-initial text-1xl mt-40 font-semibold ">ORDER TOTALS</Typography>
					<div className="grid grid-cols-1 w-full divide-y divide-gray-300">
						<div className="mt-5 grid grid-cols-12 gap-x-4 grid py-10 ">
							<Typography
								className="col-span-8 text-lg font-medium"
								color="text.secondary"
							>
								Sub Total
							</Typography>
							<Typography className="col-span-4 text-right  text-lg font-medium content-end">
								{`${currencySymbole} ${orders.selectedOrder.var_total_amount}`}
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
								{`${currencySymbole} ${orders.selectedOrder.var_discount_amount}`}
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
								{`${currencySymbole} ${orders.selectedOrder.var_promo_discount}`}
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
								{`${currencySymbole} ${orders.selectedOrder.var_tax}`}
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
								{`${currencySymbole} ${orders.selectedOrder.var_delivery_charge}`}
							</Typography>
						</div>
						<div className="mt-5 grid grid-cols-12 gap-x-4 grid py-10 ">
							<Typography className="col-span-8 text-lg font-bold">Grand Total</Typography>
							<Typography className="col-span-4 text-right  text-xl font-medium content-end">
								{`${currencySymbole} ${orders.selectedOrder.var_payable_amount}`}
							</Typography>
						</div>
					</div>
				</div>
				<div className="grow w-full ">
					<div className="col  sm-w-full">
						<Typography className="flex-initial text-1xl mt-40 font-semibold mb-20 ">
							NOTES FOR THIS ORDER
						</Typography>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Select Status</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								label="Select Status"
								value={orders.status}
								onChange={(e) => {
									dispatch(setStatus(e.target.value));
								}}
							>
								<MenuItem value="Select">
									<div className="flex flex-start gap-10">Select Status</div>
								</MenuItem>
								<MenuItem value="A">
									<div className="flex flex-start gap-10">Received</div>
								</MenuItem>
								<MenuItem value="P">
									<div className="flex flex-start gap-10">Processed</div>
								</MenuItem>
								<MenuItem value="S">
									<div className="flex flex-start gap-10">Shipped</div>
								</MenuItem>
								<MenuItem value="D">
									<div className="flex flex-start gap-10">Delivered</div>
								</MenuItem>
							</Select>
						</FormControl>
						<TextField
							id="outlined-basic"
							label="Comment"
							fullWidth
							multiline
							rows={4}
							className="mt-20"
							required
							value={orders.comment}
							onChange={(e) => {
								dispatch(setComment(e.target.value));
							}}
							inputProps={{ maxLength: 100 }}
							variant="outlined"
						/>
						<FormControlLabel
							control={<Checkbox defaultChecked />}
							label="Visible on Storefront"
							className="mt-20"
						/>
						<div className="w-full content-start">
							{orders.commentValid ? (
								<EscButton
									variant="contained"
									color="secondary"
									className=" w-max   "
									aria-label="Sign in"
									size="large"
									onClick={addComment}
									buttonStyle={escGradientAndShadowButtonStyle}
								>
									{orders.commentAdding ? <CircularProgress color="inherit" /> : 'Submit comment'}
								</EscButton>
							) : (
								<EscButton
									variant="contained"
									className=" w-max   "
									aria-label="Sign in"
									size="large"
									buttonStyle={escDisabledButtonStyle}
								>
									Submit comment
								</EscButton>
							)}
						</div>
					</div>
				</div>
			</div>
			<Dialog
				open={orders.dialogOpen}
				onClose={handleClose}
			>
				<DialogContent>
					<DialogContentText>
						<Box sx={{ width: '250px', fontSize: 16 }}>{orders.message}</Box>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>OK</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
export default memo(Information);
