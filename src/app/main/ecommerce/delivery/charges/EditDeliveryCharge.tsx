import EscPageSimple from '@esc/core/EscPageSimple';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import EscPageCarded from '@esc/core/EscPageCarded';
import withSlices from 'app/store/withSlices';
import Box from '@mui/material/Box';
import React, { memo, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escDisabledButtonStyle, escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import axios from 'axios';
import { alldeliverychargesUrl, baseUrl, deliveryChargesUrl } from '../../respositories/urls';

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

function EditDeliveryCharge() {
	const navigate = useNavigate();
	const [charge, setCharge] = useState('');
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [id, setId] = useState('');
	const [isLoading, setLoading] = useState(false);
	const [isDialogOpen, setDialogOpen] = useState(false);
	const [isValid, setValid] = useState(false);
	const handleClose = () => {
		setMessage('');
		setCharge('');
		navigate(-1);
	};
	const setData = (amount: string) => {
		setCharge(amount);
		if (amount === '') {
			setValid(false);
			setError('Delivery charge is require field');
		} else if (!/^([0-9]{1,10})$/.test(amount)) {
			setValid(false);
			setError('Enter valid delivery charge');
		} else {
			setError('');
			setValid(true);
		}
	};
	const getCharge = async () => {
		const response: { data: { data: Array<{ var_charges: string; int_glcode: string }> } } = await axios.post(
			`${baseUrl}${alldeliverychargesUrl}`,
			{}
		);
		setCharge(response.data.data[0].var_charges);
		setId(response.data.data[0].int_glcode);
		setValid(true);
	};
	const updateCharge = async () => {
		try {
			setLoading(true);
			const response: { data: { message: string } } = await axios.put(`${baseUrl}${deliveryChargesUrl}/${id}`, {
				chr_type: 'Flat',
				var_charges: charge
			});
			setLoading(false);
			setDialogOpen(true);

			setMessage(response.data.message);
		} catch (e: unknown) {
			throw (e as { response: { data: object } }).response.data;
		}
	};
	useEffect(() => {
		getCharge();
	}, []);

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
									Delivery Charge
								</Button>
								<Typography className="mt-10 text-2xl font-extrabold leading-tight tracking-tight ">
									New Delivery Charge
								</Typography>
							</div>
							<div className="grow-0">
								<div className="flex  items-center ">
									{isValid ? (
										<EscButton
											variant="contained"
											color="secondary"
											className=" w-min   "
											aria-label="Sign in"
											size="large"
											onClick={updateCharge}
											buttonStyle={escGradientAndShadowButtonStyle}
										>
											{isLoading ? <CircularProgress color="inherit" /> : 'Update'}
										</EscButton>
									) : (
										<EscButton
											variant="contained"
											className=" w-min   "
											aria-label="Sign in"
											size="large"
											buttonStyle={escDisabledButtonStyle}
										>
											Update
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
											label="Delivery Charge"
											fullWidth
											error={error !== ''}
											helperText={error}
											onChange={(e) => {
												setData(e.target.value);
											}}
											value={charge}
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
						onClose={handleClose}
						open={isDialogOpen}
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
				</div>
			}
		/>
	);
}
export default withSlices([])(memo(EditDeliveryCharge));
