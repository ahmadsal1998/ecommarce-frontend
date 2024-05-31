import TextField from '@mui/material/TextField';
import { memo, useEffect } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import { useAppDispatch } from 'app/store/store';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import withSlices from 'app/store/withSlices';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import {
	addContactUsSlice,
	contactDialogOpen,
	selectAddContactUsSlice,
	setEmail,
	setFacebook,
	setGoogle,
	setInsta,
	setPhone,
	setTwittter,
	setYoutube
} from '../../stores/settings/ContactUsState';
import { addContactUs, fetchContact, updateContactById } from '../../respositories/settings/ContactUsRepo';

function ContactUs() {
	const dispatch = useAppDispatch();
	const contact = useSelector(selectAddContactUsSlice);
	const handleClose = () => {
		dispatch(contactDialogOpen());
	};
	const addcnts = () => {
		if (!contact.isLoading) {
			if (contact.id !== '') {
				dispatch(
					updateContactById({
						id: contact.id,
						payload: {
							email: contact.email,
							phone: contact.phone,
							facebook: contact.facebook,
							insta: contact.insta,
							google: contact.google,
							twitter: contact.twitter,
							youtube: contact.youtube
						}
					})
				);
			} else {
				dispatch(
					addContactUs({
						payload: {
							email: contact.email,
							phone: contact.phone,
							facebook: contact.facebook,
							insta: contact.insta,
							google: contact.google,
							twitter: contact.twitter,
							youtube: contact.youtube
						}
					})
				);
			}
		}
	};
	useEffect(()=>{
		dispatch(fetchContact({}))
	},[])
	return (
		<div className="pt-10 sm:p-24 max-w-3xl m-10">
			<TextField
				id="outlined-basic"
				label="Contact Email"
				fullWidth
				className="mt-20"
				required
				value={contact.email}
				type="email"
				inputProps={{ maxLength: 100 }}
				variant="outlined"
				onChange={(e) => {
					dispatch(setEmail(e.target.value));
				}}
			/>
			<TextField
				id="outlined-basic"
				label="Contact Number"
				type="text"
				className="mt-20"
				fullWidth
				value={contact.phone}
				required
				inputProps={{ maxLength: 100 }}
				variant="outlined"
				onChange={(e) => {
					dispatch(setPhone(e.target.value));
				}}
			/>
			<TextField
				id="outlined-basic"
				label="Facebook Link"
				fullWidth
				className="mt-20"
				required
				value={contact.facebook}
				type="text"
				onChange={(e) => {
					dispatch(setFacebook(e.target.value));
				}}
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>
			<TextField
				id="outlined-basic"
				label="Instagram Link"
				fullWidth
				className="mt-20"
				required
				type="text"
				value={contact.insta}
				onChange={(e) => {
					dispatch(setInsta(e.target.value));
				}}
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>
			<TextField
				id="outlined-basic"
				label="Google-plus Link"
				fullWidth
				className="mt-20"
				required
				value={contact.google}
				onChange={(e) => {
					dispatch(setGoogle(e.target.value));
				}}
				type="text"
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>
			<TextField
				id="outlined-basic"
				label="Twitter Link"
				fullWidth
				className="mt-20"
				required
				value={contact.twitter}
				type="text"
				onChange={(e) => {
					dispatch(setTwittter(e.target.value));
				}}
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>
			<TextField
				id="outlined-basic"
				label="Youtube Link"
				fullWidth
				className="mt-20"
				required
				value={contact.youtube}
				type="text"
				onChange={(e) => {
					dispatch(setYoutube(e.target.value));
				}}
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>
			<EscButton
				variant="contained"
				color="secondary"
				className=" w-max  mt-20  "
				aria-label="Sign in"
				size="large"
				onClick={addcnts}
				buttonStyle={escGradientAndShadowButtonStyle}
				startIcon={<SaveIcon />}
			>
				{contact.isLoading ? <CircularProgress color="inherit" /> : 'save'}
			</EscButton>
			<Dialog
				open={contact.dialogOpen}
				onClose={handleClose}
			>
				<DialogContent>
					<DialogContentText>
						<Box sx={{ width: '250px', fontSize: 16 }}>{contact.message}</Box>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>OK</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default withSlices([addContactUsSlice])(memo(ContactUs));
