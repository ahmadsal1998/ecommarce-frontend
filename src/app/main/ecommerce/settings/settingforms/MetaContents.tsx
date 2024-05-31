import TextField from '@mui/material/TextField';
import { memo, useEffect } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import { useAppDispatch } from 'app/store/store';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import withSlices from 'app/store/withSlices';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { useSelector } from 'react-redux';
import {
	addMetaContactUsSlice,
	selectAddMetaContactUsSlice,
	setDesc,
	setTitle,
	toggleMetaDailog
} from '../../stores/settings/MetaContentState';
import { addMetaContact, fetchMetaContact, updateMetaContactById } from '../../respositories/settings/MetaContactRepo';

function MetaContents() {
	const dispatch = useAppDispatch();
	const metaContact = useSelector(selectAddMetaContactUsSlice);
	const handleClose = () => {
		dispatch(toggleMetaDailog());
	};
	const addcnts = () => {
		if (!metaContact.isLoading) {
			if (metaContact.id !== '') {
				dispatch(
					updateMetaContactById({
						id: metaContact.id,
						payload: {
							title: metaContact.title,
							desc: metaContact.desc
						}
					})
				);
			} else {
				dispatch(
					addMetaContact({
						payload: {
							title: metaContact.title,
							desc: metaContact.desc
						}
					})
				);
			}
		}
	};
	useEffect(()=>{
		dispatch(fetchMetaContact({}))
	},[])

	return (
		<div className="pt-10 sm:p-24 max-w-3xl m-10">
			<TextField
				id="outlined-basic"
				label="Meta Title"
				fullWidth
				className="mt-20"
				required
				onChange={(e) => {
					dispatch(setTitle(e.target.value));
				}}
				value = {metaContact.title}
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>
			<TextField
				id="outlined-basic"
				label="Meta Description"
				type="text"
				multiline
				className="mt-20"
				fullWidth
				onChange={(e) => {
					dispatch(setDesc(e.target.value));
				}}
				rows={3}
				required
				value = {metaContact.desc}
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>
			<EscButton
				variant="contained"
				color="secondary"
				className=" w-max  mt-20  "
				aria-label="Sign in"
				onClick={addcnts}
				size="large"
				buttonStyle={escGradientAndShadowButtonStyle}
				startIcon={<SaveIcon />}
			>
			{metaContact.isLoading ? <CircularProgress color="inherit" /> : 'save'}
			</EscButton>
			<Dialog
				open={metaContact.dialogOpen}
				onClose={handleClose}
			>
				<DialogContent>
					<DialogContentText>
						<Box sx={{ width: '250px', fontSize: 16 }}>{metaContact.message}</Box>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>OK</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default  withSlices([addMetaContactUsSlice])(memo(MetaContents));
