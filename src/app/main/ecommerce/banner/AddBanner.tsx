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
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import React, { memo, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escDisabledButtonStyle, escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import axios from 'axios';
import {
	addBannerSlice,
	bannerDialogOpenClose,
	cleanForm,
	selectAddBannerSlice,
	setDesc,
	setImage,
	setName,
	validateForm
} from '../stores/banners/AddBannerStore';
import { addBanner, updateBannerById } from '../respositories/banners/BannerRepo';
import { baseUrl, imageUrl } from '../respositories/urls';

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

function AddBanner() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [buttonText, setButtonText] = useState('Create');
	const banner = useSelector(selectAddBannerSlice);

	const handleFile = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement & {
			files: FileList;
		};
	
		addImage(target.files[0]);
	};
	useEffect(() => {
		dispatch(validateForm());
	}, [banner.name, banner.desc, banner.image]);

	const handleClose = () => {
		dispatch(bannerDialogOpenClose([]));
		dispatch(cleanForm());
		navigate(-1);
	};
	const addBnr = () => {
		if (banner.isFormValid && !banner.isLoading) {
			if (banner.forUpdate) {
				dispatch(
					updateBannerById({
						id: banner.banner.int_glcode,
						payload: {
							var_title: banner.name,
							txt_description: banner.desc,
							var_image: banner.image
						}
					})
				);
			} else {
				dispatch(
					addBanner({
						payload: {
							var_title: banner.name,
							txt_description: banner.desc,
							var_image: banner.image
						}
					})
				);
			}
		}
	};

	const addImage = async (file: File) => {
		try {
			const formData = new FormData();
			formData.append('image', file);
			const config = {
				headers: {
					'content-type': 'multipart/form-data'
				}
			};
			const response: { data: { image: string } } = await axios.post(`${baseUrl}${imageUrl}`, formData, config);
			dispatch(setImage(response.data.image));
		} catch (e) {
			/* empty */
		}
	};
	

	useEffect(() => {
		if (!banner.forUpdate) {
			dispatch(cleanForm());
			
		} else {
			setButtonText('Update');
		}
		
	},[]);
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
									Banner Images
								</Button>
								<Typography className="mt-10 text-2xl font-extrabold leading-tight tracking-tight ">
									{banner.forUpdate ? 'Banner Image detail' : 'New Banner Image'}
								</Typography>
							</div>
							<div className="grow-0">
								<div className="flex  items-center ">
									{banner.isFormValid ? (
										<EscButton
											variant="contained"
											color="secondary"
											className=" w-min   "
											onClick={addBnr}
											aria-label="Sign in"
											size="large"
											buttonStyle={escGradientAndShadowButtonStyle}
										>
											{banner.isLoading ? <CircularProgress color="inherit" /> : buttonText}
										</EscButton>
									) : (
										<EscButton
											variant="contained"
											className=" w-min   "
											buttonStyle={escDisabledButtonStyle}
											aria-label="Sign in"
											size="large"
										>
											{banner.forUpdate ? 'Update' : 'Create'}
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
											label="Title"
											value={banner.name}
											error={banner.error_name !== ''}
											helperText={banner.error_name}
											onChange={(e) => {
												dispatch(setName(e.target.value));
											}}
											fullWidth
											className="mt-20"
											required
											inputProps={{ maxLength: 100 }}
											variant="outlined"
										/>
										<TextField
											id="outlined-basic"
											label="Description"
											value={banner.desc}
											multiline
											rows={3}
											error={banner.error_desc !== ''}
											helperText={banner.error_desc}
											onChange={(e) => {
												dispatch(setDesc(e.target.value));
											}}
											fullWidth
											className="mt-20"
											required
											inputProps={{ maxLength: 100 }}
											variant="outlined"
										/>
										<Button
											variant="contained"
											component="label"
											fullWidth
											sx={{ minHeight: 170, maxWidth: 170 }}
											className="min-h-100 mt-20"
										>
											{banner.image === '' ? <FileDownloadOutlinedIcon /> : null}
											{banner.image === '' ? 'Banner Image' : ''}
											{banner.image === '' ? null : (
												<img
													src={`${baseUrl}/images/${banner.image}`}
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
									</div>
								</Box>
							}
						/>
					</div>
					<Dialog
						open={banner.dialogOpen}
						onClose={handleClose}
						aria-describedby="alert-dialog-slide-description"
					>
						<DialogContent>
							<DialogContentText id="alert-dialog-slide-description">
								<Box sx={{ width: '250px' }}>{banner.message}</Box>
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
export default withSlices([addBannerSlice])(memo(AddBanner));
