import EscPageSimple from '@esc/core/EscPageSimple';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import withSlices from 'app/store/withSlices';
import TextField from '@mui/material/TextField';
import EscPageCarded from '@esc/core/EscPageCarded';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { useSelector } from 'react-redux';
import React, { memo, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useAppDispatch } from 'app/store/store';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escDisabledButtonStyle, escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import axios from 'axios';
import {
	addDeliverySlice,
	checkformValidation,
	clearForm,
	deliveryBoyDialogOpen,
	selectAddDeliverySlice,
	setEmail,
	setMobile,
	setName,
	setNationalIdOne,
	setNationIdTwo,
	setPassword,
	setProfilePic,
	setVehicleImage
} from '../stores/deliveries/AddDeliveryStore';
import { baseUrl, imageUrl } from '../respositories/urls';
import { addDeliveryBoy, updateDeliveryById } from '../respositories/deliveries/DeliveryBoyListRepo';

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

function AddDelivery() {
	const navigate = useNavigate();
	const delivery = useSelector(selectAddDeliverySlice);
	const dispatch = useAppDispatch();
	const [buttonText, setButtonText] = useState('Create');
	const handleClose = () => {
		dispatch(deliveryBoyDialogOpen([]));
		navigate(-1);
	};
	const handleFile = async (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement & {
			files: FileList;
		};
		try {
			const formData = new FormData();
			formData.append('image', target.files[0]);
			const config = {
				headers: {
					'content-type': 'multipart/form-data'
				}
			};
			const response: { data: { image: string } } = await axios.post(`${baseUrl}${imageUrl}`, formData, config);
			dispatch(setProfilePic(response.data.image));
		} catch (e) {
			/* empty */
		}
	};
	const handleFileIdOne = async (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement & {
			files: FileList;
		};
		try {
			const formData = new FormData();
			formData.append('image', target.files[0]);
			const config = {
				headers: {
					'content-type': 'multipart/form-data'
				}
			};
			const response: { data: { image: string } } = await axios.post(`${baseUrl}${imageUrl}`, formData, config);
			dispatch(setNationIdTwo(response.data.image));
		} catch (e) {
			/* empty */
		}
	};
	const handleFileTwo = async (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement & {
			files: FileList;
		};
		try {
			const formData = new FormData();
			formData.append('image', target.files[0]);
			const config = {
				headers: {
					'content-type': 'multipart/form-data'
				}
			};
			const response: { data: { image: string } } = await axios.post(`${baseUrl}${imageUrl}`, formData, config);
			dispatch(setNationalIdOne(response.data.image));
		} catch (e) {
			/* empty */
		}
	};
	const handleFileVihicle = async (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement & {
			files: FileList;
		};
		try {
			const formData = new FormData();
			formData.append('image', target.files[0]);
			const config = {
				headers: {
					'content-type': 'multipart/form-data'
				}
			};
			const response: { data: { image: string } } = await axios.post(`${baseUrl}${imageUrl}`, formData, config);
			dispatch(setVehicleImage(response.data.image));
		} catch (e) {
			/* empty */
		}
	};
	useEffect(() => {
		dispatch(checkformValidation());
	}, [
		delivery.name,
		delivery.email,
		delivery.password,
		delivery.mobile_no,
		delivery.profilePic,
		delivery.nationalId_one,
		delivery.nationId_two,
		delivery.vehicleImage
	]);
	const addcnts = () => {
		if (!delivery.isLoading && delivery.isFormValid) {
			if (delivery.forUpdate) {
				dispatch(
					updateDeliveryById({
						id: delivery.deliveryBoy.int_glcode,
						payload: {
							var_name: delivery.name,
							var_email: delivery.email,
							var_mobile_no: delivery.mobile_no,
							var_password: delivery.password,
							var_profile: delivery.profilePic,
							nation_id: delivery.nationId_two,
							var_aadharcard: delivery.nationalId_one,
							vehicle_image: delivery.vehicleImage,
							var_pancard: ''
						}
					})
				);
			} else {
				dispatch(
					addDeliveryBoy({
						payload: {
							var_name: delivery.name,
							var_email: delivery.email,
							var_mobile_no: delivery.mobile_no,
							var_password: delivery.password,
							var_profile: delivery.profilePic,
							nation_id: delivery.nationId_two,
							var_aadharcard: delivery.nationalId_one,
							vehicle_image: delivery.vehicleImage,
							var_pancard: ''
						}
					})
				);
			}
		}
	};
	useEffect(() => {
		if (!delivery.forUpdate) {
			dispatch(clearForm());
		} else {
			setButtonText('Update');
		}
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
									Delivery Boy List
								</Button>
								<Typography className="mt-10 text-2xl font-extrabold leading-tight tracking-tight ">
									New Delivery Boy
								</Typography>
							</div>
							<div className="grow-0">
								<div className="flex  items-center ">
									{delivery.isFormValid ? (
										<EscButton
											variant="contained"
											color="secondary"
											className=" w-min   "
											aria-label="Sign in"
											onClick={addcnts}
											size="large"
											buttonStyle={escGradientAndShadowButtonStyle}
										>
											{delivery.isLoading ? <CircularProgress color="inherit" /> : buttonText}
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
					<div className="flex grow min-h-max ">
						<EscPageCarded
							content={
								<Box
									sx={{
										flexGrow: 0,
										padding: '1.5rem 1rem 1rem 0'
									}}
									className="m-20 max-w-3xl"
								>
									<TextField
										id="outlined-basic"
										label="Name"
										fullWidth
										value={delivery.name}
										error={delivery.error_name !== ''}
										helperText={delivery.error_name}
										onChange={(e) => {
											dispatch(setName(e.target.value));
										}}
										className="mt-20"
										required
										inputProps={{ maxLength: 100 }}
										variant="outlined"
									/>
									<TextField
										id="outlined-basic"
										label="Email"
										type="email"
										value={delivery.email}
										error={delivery.error_email !== ''}
										helperText={delivery.error_email}
										onChange={(e) => {
											dispatch(setEmail(e.target.value));
										}}
										className="mt-20"
										fullWidth
										required
										inputProps={{ maxLength: 100 }}
										variant="outlined"
									/>
									<TextField
										id="outlined-basic"
										label="Mobile No."
										type="text"
										className="mt-20"
										value={delivery.mobile_no}
										error={delivery.error_mobile !== ''}
										helperText={delivery.error_mobile}
										onChange={(e) => {
											dispatch(setMobile(e.target.value));
										}}
										inputProps={{ maxLength: 100 }}
										fullWidth
										required
										variant="outlined"
									/>
									{!delivery.forUpdate ? (
										<TextField
											id="outlined-basic"
											label="Password"
											type="password"
											className="mt-20"
											inputProps={{ maxLength: 100 }}
											fullWidth
											required
											value={delivery.password}
											error={delivery.error_password !== ''}
											helperText={delivery.error_password}
											onChange={(e) => {
												dispatch(setPassword(e.target.value));
											}}
											variant="outlined"
										/>
									) : null}
									<Button
										variant="contained"
										component="label"
										fullWidth
										sx={{ minHeight: 170, maxWidth: 170 }}
										className="min-h-100 mt-20 me-20"
									>
										{delivery.profilePic === '' ? <FileDownloadOutlinedIcon /> : null}
										{delivery.profilePic === '' ? 'Profile Picture' : ''}
										{delivery.profilePic === '' ? null : (
											<img
												src={`${baseUrl}/images/${delivery.profilePic}`}
												alt=""
												style={{ height: '160px' }}
											/>
										)}
										<input
											type="file"
											accept="image/*"
											hidden
											multiple={false}
											onInput={handleFile}
										/>
									</Button>

									<Button
										variant="contained"
										component="label"
										fullWidth
										sx={{ minHeight: 170, maxWidth: 170 }}
										className="min-h-100 mt-20 me-20"
									>
										{delivery.nationId_two === '' ? <FileDownloadOutlinedIcon /> : null}
										{delivery.nationId_two === '' ? 'National Id 2' : ''}
										{delivery.nationId_two === '' ? null : (
											<img
												src={`${baseUrl}/images/${delivery.nationId_two}`}
												alt=""
												style={{ height: '160px' }}
											/>
										)}
										<input
											type="file"
											accept="image/*"
											hidden
											multiple={false}
											onInput={handleFileIdOne}
										/>
									</Button>
									<Button
										variant="contained"
										component="label"
										fullWidth
										sx={{ minHeight: 170, maxWidth: 170 }}
										className="min-h-100 mt-20 me-20"
									>
										{delivery.nationalId_one === '' ? <FileDownloadOutlinedIcon /> : null}
										{delivery.nationalId_one === '' ? 'National Id 1' : ''}
										{delivery.nationalId_one === '' ? null : (
											<img
												src={`${baseUrl}/images/${delivery.nationalId_one}`}
												alt=""
												style={{ height: '160px' }}
											/>
										)}
										<input
											type="file"
											accept="image/*"
											hidden
											multiple={false}
											onInput={handleFileTwo}
										/>
									</Button>
									<Button
										variant="contained"
										component="label"
										fullWidth
										sx={{ minHeight: 170, maxWidth: 170 }}
										className="min-h-100 mt-20"
									>
										{delivery.vehicleImage === '' ? <FileDownloadOutlinedIcon /> : null}
										{delivery.vehicleImage === '' ? 'Profile Vehicle image with number plate' : ''}
										{delivery.vehicleImage === '' ? null : (
											<img
												src={`${baseUrl}/images/${delivery.vehicleImage}`}
												alt=""
												style={{ height: '160px' }}
											/>
										)}
										<input
											type="file"
											accept="image/*"
											hidden
											multiple={false}
											onInput={handleFileVihicle}
										/>
									</Button>
								</Box>
							}
						/>
					</div>
					<Dialog
						onClose={handleClose}
						open={delivery.dialogOpen}
					>
						<DialogContent>
							<DialogContentText>
								<Box sx={{ width: '250px', fontSize: 16 }}>{delivery.message}</Box>
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
export default withSlices([addDeliverySlice])(memo(AddDelivery));
