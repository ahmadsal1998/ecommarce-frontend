import EscPageSimple from '@esc/core/EscPageSimple';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import EscPageCarded from '@esc/core/EscPageCarded';
import withSlices from 'app/store/withSlices';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch } from 'app/store/store';
import { useSelector } from 'react-redux';
import { memo, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escDisabledButtonStyle, escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import {
	addDashboardUserSlice,
	checkformValidation,
	clearForm,
	selectDashboardsSlice,
	setEmail,
	setMobile,
	setName,
	setPassword,
	setRole,
	userDialogOpen
} from '../stores/dashboard/AddDashboardUserStore';
import { fetchRoleUsers } from '../respositories/users/RoleRepo';
import { selectUserRoleSlice, userRoleSlice } from '../stores/roles/UserRolesStore';
import { addAdminUser, updateAdminUserById } from '../respositories/users/AdminUerRepo';

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

function AddDashbaordUser() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const roles = useSelector(selectUserRoleSlice);
	const [buttonText, setButtonText] = useState('Create');
	const user = useSelector(selectDashboardsSlice);
	useEffect(() => {
		dispatch(checkformValidation());
	}, [user.name, user.email, user.password, user.mobile_no, user.role]);
	const handleClose = () => {
		dispatch(userDialogOpen());
		navigate(-1);
	};
	useEffect(() => {
		dispatch(
			fetchRoleUsers({
				payload: { limit: 10000, page: 1, sort: {}, search: '' }
			})
		);
	}, []);
	useEffect(() => {
		if (!roles.isLoading && roles.roles.length > 0) {
			dispatch(setRole(roles.roles[0].int_glcode));
		}
	}, [roles.isLoading]);

	useEffect(() => {
		if (!user.forUpdate) {
			dispatch(clearForm());
		} else {
			setButtonText('Update');
		}
	}, []);
	const addUser = () => {
		if (user.isFormValid) {
			if (user.forUpdate) {
				dispatch(
					updateAdminUserById({
						id: user.user.user_id,
						payload: {
							var_name: user.name,
							var_email: user.email,
							var_mobile_no: user.mobile_no,
							role_id: user.role
						}
					})
				);
			} else {
				dispatch(
					addAdminUser({
						payload: {
							var_name: user.name,
							var_email: user.email,
							var_mobile_no: user.mobile_no,
							var_password: user.password,
							role_id: user.role
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
									Dashboard Users
								</Button>
								<Typography className="mt-10 text-2xl font-extrabold leading-tight tracking-tight ">
									
									{user.forUpdate ? 'Update Dashboard User' : 'New Dashboard User'}
								</Typography>
							</div>
							<div className="grow-0">
								<div className="flex  items-center ">
									{user.isFormValid ? (
										<EscButton
											variant="contained"
											color="secondary"
											className=" w-min   "
											aria-label="Sign in"
											onClick={addUser}
											size="large"
											buttonStyle={escGradientAndShadowButtonStyle}
										>
											{user.isLoading ? <CircularProgress color="inherit" /> : buttonText}
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
											label="Name"
											fullWidth
											value={user.name}
											error={user.error_name !== ''}
											helperText={user.error_name}
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
											value={user.email}
											disabled={user.forUpdate}
											error={user.error_email !== ''}
											helperText={user.error_email}
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
											value={user.mobile_no}
											error={user.error_mobile !== ''}
											helperText={user.error_mobile}
											onChange={(e) => {
												dispatch(setMobile(e.target.value));
											}}
											inputProps={{ maxLength: 100 }}
											fullWidth
											required
											variant="outlined"
										/>
										{!user.forUpdate ? (
											<TextField
												id="outlined-basic"
												label="Password"
												type="password"
												className="mt-20"
												inputProps={{ maxLength: 100 }}
												fullWidth
												required
												value={user.password}
												error={user.error_password !== ''}
												helperText={user.error_password}
												onChange={(e) => {
													dispatch(setPassword(e.target.value));
												}}
												variant="outlined"
											/>
										) : null}
										<FormControl
											fullWidth
											className="mt-20">
											<InputLabel id="demo-simple-select-label">User Role</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												label="User Role"
												value={user.role}
												onChange={(e) => dispatch(setRole(e.target.value))}
											>
												{roles.roles.map((data) => (
													<MenuItem value={data.int_glcode}>{data.lable}</MenuItem>
												))}
											</Select>
										</FormControl>
									</div>
								</Box>
							}
						/>
					</div>
					<Dialog
						onClose={handleClose}
						open={user.dialogOpen}
					>
						<DialogContent>
							<DialogContentText>
								<Box sx={{ width: '250px', fontSize: 16 }}>{user.message}</Box>
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
export default withSlices([addDashboardUserSlice, userRoleSlice])(memo(AddDashbaordUser));
