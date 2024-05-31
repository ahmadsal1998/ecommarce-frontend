import EscPageSimple from '@esc/core/EscPageSimple';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import EscPageCarded from '@esc/core/EscPageCarded';
import withSlices from 'app/store/withSlices';
import Box from '@mui/material/Box';
import { useAppDispatch } from 'app/store/store';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { memo, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escDisabledButtonStyle, escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';

import {
	addPromoSlice,
	cleanForm,
	promoDialog,
	selectAddPromoSlice,
	setApplyNoTime,
	setDescription,
	setDiscountPercent,
	setExpiryDate,
	setMaxDiscount,
	setMinPrice,
	setPromoCode,
	validateForm
} from '../stores/promo/AddPromoCodeStore';
import { addPromo, updatePromoById } from '../respositories/promocodes/PromocodeRepo';

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

function AddPromoCodeTags() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const promo = useSelector(selectAddPromoSlice);

	useEffect(() => {
		dispatch(validateForm());
	}, [promo.promo_code, promo.discount_percent, promo.max_discount_price, promo.apply_no_time, promo.description]);

	const [buttonText, setButtonText] = useState('Create');
	useEffect(() => {
		if (!promo.forUpdate) {
			dispatch(cleanForm());
		} else {
			setButtonText('Update');
		}
	}, []);

	const handleClose = () => {
		dispatch(promoDialog([]));
		navigate(-1);
	};
	const addData = () => {
		if (promo.isFormValid) {
			if (promo.forUpdate) {
				dispatch(
					updatePromoById({
						payload: {
							var_promocode: promo.promo_code,
							no_of_time: promo.apply_no_time,
							expiry_date: promo.expiry_date,
							var_percentage: promo.discount_percent,
							min_order: promo.min_order_price,
							txt_description: promo.description,
							max_discount_price: promo.max_discount_price
						},
						id: promo.promo.int_glcode
					})
				);
			} else {
				dispatch(
					addPromo({
						payload: {
							var_promocode: promo.promo_code,
							no_of_time: promo.apply_no_time,
							expiry_date: promo.expiry_date,
							var_percentage: promo.discount_percent,
							min_order: promo.min_order_price,
							txt_description: promo.description,
							max_discount_price: promo.max_discount_price
						}
					})
				);
			}
		}
	};
	
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
									Promo Codes
								</Button>
								<Typography className="mt-10 text-2xl font-extrabold leading-tight tracking-tight ">
									New Promo
								</Typography>
							</div>
							<div className="grow-0">
								<div className="flex  items-center ">
									{promo.isFormValid ? (
										<EscButton
											variant="contained"
											color="secondary"
											className=" w-min   "
											aria-label="Sign in"
											onClick={addData}
											size="large"
											buttonStyle={escGradientAndShadowButtonStyle}
										>
											{promo.isLoading ? <CircularProgress color="inherit" /> : buttonText}
										</EscButton>
									) : (
										<EscButton
											variant="contained"
											className=" w-min   "
											aria-label="Sign in"
											size="large"
											buttonStyle={escDisabledButtonStyle}
										>
											{buttonText}
										</EscButton>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="flex grow min-h-max">
						<EscPageCarded
							content={
								<Box
									sx={{
										flexGrow: 0,
										padding: '1.5rem 1rem 1rem 0'
									}}
								>
									<div className="pt-10 sm:p-24 max-w-3xl m-10">
										<TextField
											id="outlined-basic"
											label="Promo Code"
											value={promo.promo_code}
											error={promo.error_promo_code !== ''}
											helperText={promo.error_promo_code}
											onChange={(e) => {
												dispatch(setPromoCode(e.target.value));
											}}
											fullWidth
											className="mt-20"
											required
											inputProps={{ maxLength: 100 }}
											variant="outlined"
										/>
										<TextField
											id="outlined-basic"
											label="Discount Percent"
											value={promo.discount_percent}
											error={promo.error_discount_percent !== ''}
											helperText={promo.error_discount_percent}
											onChange={(e) => {
												dispatch(setDiscountPercent(e.target.value));
											}}
											fullWidth
											className="mt-20"
											required
											inputProps={{ maxLength: 100 }}
											variant="outlined"
										/>
										<TextField
											id="outlined-basic"
											label="Max Discount Price"
											value={promo.max_discount_price}
											error={promo.error_max_discountprice !== ''}
											helperText={promo.error_max_discountprice}
											onChange={(e) => {
												dispatch(setMaxDiscount(e.target.value));
											}}
											fullWidth
											className="mt-20"
											required
											inputProps={{ maxLength: 100 }}
											variant="outlined"
										/>
										<TextField
											id="outlined-basic"
											label="Min. Order Price"
											value={promo.min_order_price}
											error={promo.error_min_orderprice !== ''}
											helperText={promo.error_min_orderprice}
											onChange={(e) => {
												dispatch(setMinPrice(e.target.value));
											}}
											fullWidth
											className="mt-20"
											required
											inputProps={{ maxLength: 100 }}
											variant="outlined"
										/>
										<TextField
											id="outlined-basic"
											label="Apply No. Of Time"
											value={promo.apply_no_time}
											error={promo.error_apply_time !== ''}
											helperText={promo.error_apply_time}
											onChange={(e) => {
												dispatch(setApplyNoTime(e.target.value));
											}}
											fullWidth
											className="mt-20 mb-20"
											required
											inputProps={{ maxLength: 100 }}
											variant="outlined"
										/>
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<DemoContainer components={['DatePicker', 'DatePicker']}>
												<DatePicker
												    format="DD-MM-YYYY"
													className="w-full"
													disablePast
													label="Expiry Date"
													value={dayjs(promo.expiry_date, "DD-MM-YYYY")}
													onChange={(newValue) => dispatch(setExpiryDate(newValue.format("DD-MM-YYYY")))}
												/>
											</DemoContainer>
										</LocalizationProvider>
										<TextField
											id="outlined-basic"	
											label="Description"
											value={promo.description}
											error={promo.error_description !== ''}
											helperText={promo.error_description}
											onChange={(e) => {
												dispatch(setDescription(e.target.value));
											}}
											fullWidth
											className="mt-20"
											required
											inputProps={{ maxLength: 100 }}
											variant="outlined"
										/>
									</div>
								</Box>
							}
						/>
					</div>
					<Dialog
						open={promo.dialogOpen}
						onClose={handleClose}
						aria-describedby="alert-dialog-slide-description"
					>
						<DialogContent>
							<DialogContentText id="alert-dialog-slide-description">
								<Box sx={{ width: '250px' }}>{promo.message}</Box>
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose}>OK</Button>
						</DialogActions>
					</Dialog>
				</div>
			}
		/>
	);
}
export default withSlices([addPromoSlice])(memo(AddPromoCodeTags));
