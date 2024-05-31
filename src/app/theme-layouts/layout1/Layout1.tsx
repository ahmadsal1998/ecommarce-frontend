import { styled } from '@mui/material/styles';
import EscMessage from '@esc/core/EscMessage';
import * as React from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import EscButton from '@esc/components/buttons/EscButton';
import { escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { selectUserRole } from 'src/app/auth/user/store/userSlice';
import { selectChangePasswordSlice, setChangePassword } from 'app/theme-layouts/shared-components/navigation/store/chagePasswordSlice';
import { useAuth } from 'src/app/auth/AuthRouteProvider'
import axios from 'axios';
import { baseUrl, changepasswordUrl } from 'src/app/main/ecommerce/respositories/urls';
import AppContext from 'app/AppContext';
import { lazy, memo, ReactNode, Suspense, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { selectEscCurrentLayoutConfig } from '@esc/core/EscSettings/store/escSettingsSlice';
import { Layout1ConfigDefaultsType } from 'app/theme-layouts/layout1/Layout1Config';
import EscSuspense from '@esc/core/EscSuspense';
import LeftSideLayout1 from './components/LeftSideLayout1';
import NavbarWrapperLayout1 from './components/NavbarWrapperLayout1';
import RightSideLayout1 from './components/RightSideLayout1';
import ToolbarLayout1 from './components/ToolbarLayout1';
import { useAppDispatch } from 'app/store/store';
import { setMobilePopupMenu } from '../shared-components/navbar/store/navbarSlice';

const EscDialog = lazy(() => import('@esc/core/EscDialog/EscDialog'));

   const Root = styled('div')(({ config }: { config: Layout1ConfigDefaultsType }) => ({
	...(config.mode === 'boxed' && {
		clipPath: 'inset(0)',
		maxWidth: `${config.containerWidth}px`,
		margin: '0 auto',
		boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
	}),
	...(config.mode === 'container' && {
		'& .container': {
			maxWidth: `${config.containerWidth}px`,
			width: '100%',
			margin: '0 auto'
		}
	})
}));

type Layout1Props = {
	children?: ReactNode;
};

/**
 * The layout 1.
 */
function Layout1(props: Layout1Props) {
	const { children } = props;
	const config = useSelector(selectEscCurrentLayoutConfig) as Layout1ConfigDefaultsType;
	const appContext = useContext(AppContext);
	const { routes } = appContext;
	const dispatch = useAppDispatch();
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
  
	const handleClickOpen = () => {
	  setOpen(true);
	};
  
	const handleClose = () => {
	  setOpen(false);
	  
	};
	const changePass = useSelector(selectChangePasswordSlice);
	const { signOut } = useAuth();
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordError, setNewPasswordError] = useState('');
	const [confirmPassword, setConfirmNewPassword] = useState('');
	const [confirmPasswordError, setConfrimPasswordError] = useState('');
	const [error, setErrors] = useState('');
	const [loading, setLoading] =  useState(false)
	const  [message, setMessage] = useState('');
	const [visiblePassword, setVisiblePassword] = useState(false);
	const [successDialog, setSuccessDialog] = useState(false);
	const [visibleNewPassword, setVisibleNewPassword] = useState(false);
	const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
	const changePassword=async()=>{
		if(newPassword !== confirmPassword){
			setConfrimPasswordError("Confirm password not matched with new password")
		}
	 	else if(password!==""&& newPassword !=="" && confirmPassword !==""&&
		 	passwordError===""&& newPasswordError ==="" && confirmPasswordError ===""
			){
				try {
					setLoading(true);
					const response = await axios.put(`${baseUrl}${changepasswordUrl}`, {
						var_password: newPassword,
						old_password: password
					});
					setLoading(false);
					setMessage(response.data.message)
					setOpen(false)
					setPassword("");
					setNewPassword("");
					setConfirmNewPassword("");
					dispatch(signOut)
					
				} catch (e: any) {
					setSuccessDialog(true)
					
					setMessage(e.response.data.message)
					setLoading(false);
					throw (e as { response: { data: object } }).response.data;
				}	

		}
	}	
	React.useEffect(()=>{
		if(changePass.changePassword){
			setOpen(true)
			dispatch(setChangePassword(false));
		}
	},[changePass.changePassword])
	return (
		<Root
			id="esc-settings-presets"
			config={config}
			className="flex w-full"
		>
			{config.leftSidePanel.display && <LeftSideLayout1 />}
			
			<div className="flex min-w-0 flex-auto">
				{config.navbar.display && config.navbar.position === 'left' && <NavbarWrapperLayout1 />}

				<main
					id="esc-main"
					className="relative z-10 flex min-h-full min-w-0 flex-auto flex-col"
				>
					{config.toolbar.display && (
						<ToolbarLayout1 className={config.toolbar.style === 'fixed' ? 'sticky top-0' : ''} />
					)}

					<div className="relative z-10 flex min-h-0 flex-auto flex-col">
						<EscSuspense>{useRoutes(routes)}</EscSuspense>

						<Suspense>
							<EscDialog />
						</Suspense>
						{children}
					</div>
				
				</main>

				{config.navbar.display && config.navbar.position === 'right' && <NavbarWrapperLayout1 />}
			</div>

						
			{config.rightSidePanel.display && <RightSideLayout1 />}
			<EscMessage />
			<Dialog
						fullScreen={fullScreen}
						open={open}
						onClose={handleClose}
						aria-labelledby="responsive-dialog-title"
					>
						<DialogTitle id="responsive-dialog-title">
						{"Change password"}
						</DialogTitle>
						<DialogContent sx={{width:500}}>
						
						<TextField
							className=" mt-20 w-full"
							label="Password"
							value={password}
							type={!visiblePassword ? 'password' : 'text'}
							error={passwordError !== ''}
							helperText={passwordError}
							onChange={(e) => {

								setErrors('')
								setPassword(e.target.value);
								if (e.target.value.length > 0) {
									setPasswordError('');
								} else {
									setPasswordError('Enter password');
								}
							}}
							variant="outlined"
							InputProps={{
								endAdornment: !visiblePassword ? (
									<RemoveRedEyeIcon
										className="remove-Eye-icon"
										onClick={() => setVisiblePassword(true)}
									/>
								) : (
									<RemoveRedEyeOutlinedIcon
										className="remove-Eye-icon"
										onClick={() => setVisiblePassword(false)}
									/>
								)
							}}
							required
							fullWidth
						/>
						<TextField
							className=" mt-20 w-full"
							label="New password"
							value={newPassword}
							type={!visibleNewPassword ? 'password' : 'text'}
							error={newPasswordError !== ''}
							helperText={newPasswordError}
							onChange={(e) => {

								setErrors('')
								setNewPassword(e.target.value);
								if (e.target.value.length > 0) {
									setNewPasswordError('');
								} else {
									setNewPasswordError('Enter new password');
								}
							}}
							variant="outlined"
							InputProps={{
								endAdornment: !visibleNewPassword ? (
									<RemoveRedEyeIcon
										className="remove-Eye-icon"
										onClick={() => setVisibleNewPassword(true)}
									/>
								) : (
									<RemoveRedEyeOutlinedIcon
										className="remove-Eye-icon"
										onClick={() => setVisibleNewPassword(false)}
									/>
								)
							}}
							required
							fullWidth
						/>
						<TextField
							className=" mt-20 w-full"
							label="Confirm Password"
							value={confirmPassword}
							type={!visibleConfirmPassword ? 'password' : 'text'}
							error={confirmPasswordError !== ''}
							helperText={confirmPasswordError}
							onChange={(e) => {

								setErrors('')
								setConfirmNewPassword(e.target.value);
								if (e.target.value.length > 0) {
									setConfrimPasswordError('');
								} else {
									setConfrimPasswordError('Enter confirm password');
								}
							}}
							variant="outlined"
							InputProps={{
								endAdornment: !visibleConfirmPassword ? (
									<RemoveRedEyeIcon
										className="remove-Eye-icon"
										onClick={() => setVisibleConfirmPassword(true)}
									/>
								) : (
									<RemoveRedEyeOutlinedIcon
										className="remove-Eye-icon"
										onClick={() => setVisibleConfirmPassword(false)}
									/>
								)
							}}
							required
							fullWidth
						/>
						
						</DialogContent>
						<DialogActions>
						
						{ 
                       loading?<CircularProgress color="inherit" />:<EscButton
							variant="contained"
							className=" w-min   mr-20 mb-20"
							aria-label="Sign in"
							size="large"
							onClick={changePassword}
							buttonStyle={escGradientAndShadowButtonStyle}
						>
							Change
						</EscButton>}
						</DialogActions>
					</Dialog>
					<Dialog
						open={successDialog}
						onClose={()=>{setSuccessDialog(false);}}
						aria-describedby="alert-dialog-slide-description"
					>
						<DialogContent>
							<DialogContentText id="alert-dialog-slide-description">
								<Box sx={{ width: '250px' }}>{message}</Box>
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={()=>{setSuccessDialog(false); }}>OK</Button>
						</DialogActions>
					</Dialog>
		</Root>
	);
}

export default memo(Layout1);
