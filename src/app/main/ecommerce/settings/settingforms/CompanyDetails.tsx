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

import { addCompanyDetails, fetchCompanyDetails, updateCompanyDetailById } from '../../respositories/settings/CompanyDetailRepo';
import { addCompanyDetailsSlice, selectAddCompanyDetailsSlice, setAddress, setCompanyName, setEmail, setGst, setMobile, toggleMetaDailog } from '../../stores/settings/CompanyDetailState';



function CompanyDetails() {
	const dispatch = useAppDispatch();
	const companyDetail = useSelector(selectAddCompanyDetailsSlice);
	const handleClose = () => {
		dispatch(toggleMetaDailog());
	};
	const addcnts = () => {
		if (!companyDetail.isLoading) {
			if (companyDetail.id !== '') {
				dispatch(
					updateCompanyDetailById({
						id: companyDetail.id,
						payload: {
                            companyName: companyDetail.companyName,
                            mobile:  companyDetail.mobile,
                            email:  companyDetail.email,
                            gst:  companyDetail.gst,
                            address:  companyDetail.address
						}
					})
				);
			} else {
				dispatch(
					addCompanyDetails({
						payload: {
                            companyName: companyDetail.companyName,
                            mobile:  companyDetail.mobile,
                            email:  companyDetail.email,
                            gst:  companyDetail.gst,
                            address:  companyDetail.address
						}
					})
				);
			}
		}
	};
	useEffect(()=>{
		dispatch(fetchCompanyDetails({}))
	},[])

	return (
		<div className="pt-10 sm:p-24 max-w-3xl m-10">
			<TextField
				id="outlined-basic"
				label="Company Name"
				fullWidth
				className="mt-20"
				required
				onChange={(e) => {
					dispatch(setCompanyName(e.target.value));
				}}
				value = {companyDetail.companyName}
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>
            <TextField
				id="outlined-basic"
				label="GST No."
				fullWidth
				className="mt-20"
				required
				onChange={(e) => {
					dispatch(setGst(e.target.value));
				}}
				value = {companyDetail.gst}
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>
            <TextField
				id="outlined-basic"
				label="Mobile"
				fullWidth
				className="mt-20"
				required
				onChange={(e) => {
					dispatch(setMobile(e.target.value));
				}}
				value = {companyDetail.mobile}
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>
            <TextField
				id="outlined-basic"
				label="Email"
				fullWidth
				className="mt-20"
				required
				onChange={(e) => {
					dispatch(setEmail(e.target.value));
				}}
				value = {companyDetail.email}
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>
			<TextField
				id="outlined-basic"
				label="Address"
				type="text"
				multiline
				className="mt-20"
				fullWidth
				onChange={(e) => {
					dispatch(setAddress(e.target.value));
				}}
				rows={3}
				required
				value = {companyDetail.address}
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
			{companyDetail.isLoading ? <CircularProgress color="inherit" /> : 'save'}
			</EscButton>
			<Dialog
				open={companyDetail.dialogOpen}
				onClose={handleClose}
			>
				<DialogContent>
					<DialogContentText>
						<Box sx={{ width: '250px', fontSize: 16 }}>{companyDetail.message}</Box>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>OK</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default  withSlices([addCompanyDetailsSlice])(memo(CompanyDetails));
