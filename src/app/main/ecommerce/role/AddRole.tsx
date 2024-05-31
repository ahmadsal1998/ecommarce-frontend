/* eslint-disable @typescript-eslint/no-unsafe-call */
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
import FormGroup from '@mui/material/FormGroup/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escDisabledButtonStyle, escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';

import {
	checkformValidation,
	clearForm,
	deleteSubRole,
	roleDialogToggle,
	selectAddRoleLice,
	setName,
	setSubRole
} from '../stores/roles/AddUserRoleStore';
import { addUserRole, updateUserRoleById } from '../respositories/users/RoleRepo';

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

function AddRole() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const role = useSelector(selectAddRoleLice);
	const [buttonText, setButtonText] = useState('Create');
	useEffect(() => {
		if (!role.forUpdate) {
			dispatch(clearForm());
		} else {
			setButtonText('Update');
		}
	}, []);
	useEffect(() => {
		dispatch(checkformValidation());
	}, [role.name]);

	const handleClose = () => {
		dispatch(roleDialogToggle([]));
		navigate(-1);
	};
	const updateData = () => {
		if (role.isFormValid) {
			if (role.forUpdate) {
				dispatch(
					updateUserRoleById({
						payload: {
							role: role.userRole.role,
							type: 'admin',
							desc: '',
							lable: role.name,
							subroles: role.SubRoles.filter(
								(data: { id: number; title: string; code: string; selected: boolean }) =>
									data.selected === true
							)
						},
						id: role.userRole.int_glcode
					})
				);
			} else {
				dispatch(
					addUserRole({
						payload: {
							role: 'admin',
							type: 'admin',
							desc: '',
							lable: role.name,
							subroles: role.SubRoles.filter(
								(data: { id: number; title: string; code: string; selected: boolean }) =>
									data.selected === true
							)
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
									Roles
								</Button>
								<Typography className="mt-10 text-2xl font-extrabold leading-tight tracking-tight ">
									New Role
								</Typography>
							</div>
							<div className="grow-0">
								<div className="flex  items-center ">
									{role.isFormValid ? (
										<EscButton
											variant="contained"
											color="secondary"
											className=" w-min   "
											aria-label="Sign in"
											buttonStyle={escGradientAndShadowButtonStyle}
											size="large"
											onClick={updateData}
										>
											{role.isLoading ? <CircularProgress color="inherit" /> : buttonText}
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
											value={role.name}
											error={role.error_name !== ''}
											helperText={role.error_name}
											onChange={(e) => {
												dispatch(setName(e.target.value));
											}}
											fullWidth
											className="mt-20"
											required
											inputProps={{ maxLength: 100 }}
											variant="outlined"
										/>
										<Typography className="text-xl mt-20"> Roles </Typography>
										<FormGroup>
											{role.SubRoles.map(
												(data: { title: string; id: number; selected: boolean }, index) => (
													<FormControlLabel
														key={index}
														// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
														control={
															<Checkbox
																checked={data.selected}
																onChange={(v) => {
																	if (!data.selected) {
																		dispatch(setSubRole(index));
																	} else {
																		dispatch(deleteSubRole(index));
																	}
																}}
															/>
														}
														label={data.title}
													/>
												)
											)}
										</FormGroup>
									</div>
								</Box>
							}
						/>
					</div>
					<Dialog
						open={role.dialogOpen}
						onClose={handleClose}
						aria-describedby="alert-dialog-slide-description"
					>
						<DialogContent>
							<DialogContentText id="alert-dialog-slide-description">
								<Box sx={{ width: '250px' }}>{role.message}</Box>
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
export default withSlices([])(memo(AddRole));
