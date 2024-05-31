import EscPageSimple from '@esc/core/EscPageSimple';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import EscPageCarded from '@esc/core/EscPageCarded';
import withSlices from 'app/store/withSlices';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { useAppDispatch } from 'app/store/store';
import Tab from '@mui/material/Tab';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escDisabledButtonStyle, escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import UserDetails from './UserDetails';
import AddressDetail from './AddressDetails';
import { addAddressSlice, selectAddAddressLice, deleteAllAddress, clearAddressForm } from '../../stores/user/AddAddressStore';
import { addUser, updateUserById } from '../../respositories/users/UsersRepo';
import { addNewUser, addUserSlice, clearForm, selectAdUserLice, userDialogOpen } from '../../stores/user/AddUserStore';

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

function AddUser() {
	const navigate = useNavigate();
	const address = useSelector(selectAddAddressLice);
	const [tabIndex, setTabIndex] = React.useState(0);
	const [buttonText, setButtonText] = useState('Create');
	const user = useSelector(selectAdUserLice);
	const dispatch = useAppDispatch();
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabIndex(newValue);
	};
	const changeTabIndex = (newValue: number) => {
		setTabIndex(newValue);
	};
	const handleClose = () => {
		dispatch(userDialogOpen());
		dispatch(clearAddressForm());
		dispatch(clearForm());
		navigate(-1);
	};
	const [file, setFile] = useState<File | undefined>();
	const handleFile = (file: File) => {
		setFile(file);
	};
	useEffect(() => {
		if (user.userAdding && user.isFormValid) {
			if (user.forUpdate) {
				dispatch(
					updateUserById({
						payload: {
							id: user.user.user_id,
							name: user.name,
							email: user.email,
							mobile_no: user.mobile_no,
							password: user.password,
							file,
							adress: address.address
						}
					})
				);
			} else {
				dispatch(
					addUser({
						payload: {
							name: user.name,
							email: user.email,
							mobile_no: user.mobile_no,
							password: user.password,
							file,
							adress: address.address
						}
					})
				);
			}
		}
	}, [user.userAdding]);

	useEffect(() => {
		if (user.userCreated) {
			setFile(undefined);
			dispatch(deleteAllAddress());
			setTabIndex(0);
		}
	}, [user.userCreated]);
	useEffect(() => {
		if (!user.isLoading) {
			setTabIndex(0);
		}
	}, [user.isLoading]);
	useEffect(() => {
		if (!user.forUpdate) {
			dispatch(clearForm());
			dispatch(clearAddressForm());
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
									Users
								</Button>
								<Typography className="mt-10 text-2xl font-extrabold leading-tight tracking-tight ">
									{user.forUpdate ? 'User details' : 'New User'}
								</Typography>
							</div>
							<div className="grow-0">
								<div className="flex  items-center ">
									{user.isFormValid ? (
										<EscButton
											variant="contained"
											color="secondary"
											buttonStyle={escGradientAndShadowButtonStyle}
											className=" w-min   "
											size="large"
											onClick={() => dispatch(addNewUser(true))}
										>
											{user.isLoading ? <CircularProgress color="inherit" /> : buttonText}
										</EscButton>
									) : (
										<EscButton
											variant="contained"
											className=" w-min   "
											buttonStyle={escDisabledButtonStyle}
											size="large"
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
										<Tab label="User Details" />
										<Tab label="Address Details" />
									</Tabs>
									{tabIndex === 0 ? (
										<UserDetails
											onSelectFile={handleFile}
											onChagedTab={changeTabIndex}
										/>
									) : (
										<AddressDetail />
									)}
								</Box>
							}
						/>
					</div>
					<Dialog
						open={user.dialogOpen}
						onClose={handleClose}
						aria-describedby="alert-dialog-slide-description"
					>
						<DialogContent>
							<DialogContentText id="alert-dialog-slide-description">
								<Box sx={{ width: '250px' }}>{user.message}</Box>
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
export default withSlices([addAddressSlice, addUserSlice])(memo(AddUser));
