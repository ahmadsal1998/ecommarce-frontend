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
import { useSelector } from 'react-redux';
import { memo, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { HexColorPicker } from 'react-colorful';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import { escDisabledButtonStyle, escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import {
	attributeValueDialogOpen,
	cleanForm,
	selectAddAttributesValueSlice,
	setName,
	setColor,
	validateForm
} from '../../../stores/attributesvalue/AddAttrutesValueStore';
import { addAttributesValue, updateAttributeValueById } from '../../../respositories/attributes/attributeValueRepo';

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

function AddAttributeValue() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const attributes = useSelector(selectAddAttributesValueSlice);
	const [buttonText, setButtonText] = useState('Create');

	useEffect(() => {
		dispatch(validateForm());
	}, [attributes.name]);
	useEffect(() => {
		if (attributes.isAttributeCreated) {
			dispatch(cleanForm());
		}
	}, [attributes.isAttributeCreated]);
	

	useEffect(() => {
		if (!attributes.forUpdate) {
			dispatch(cleanForm());
			
		} else {
			setButtonText('Update');
		}
		
	},[]);
	const handleClose = () => {
		dispatch(attributeValueDialogOpen());
		navigate(-1);
	};
	const addAttribts = () => {
		if (attributes.isFormValid && !attributes.isLoading) {
			if (attributes.forUpdate) {
				dispatch(
					updateAttributeValueById({
						id: attributes.attributeValue.int_glcode,
						payload: {
							var_title: attributes.name,
							attribute_id: attributes.attributeId,
							colorCode: attributes.attributeType === 'color' ? attributes.colorCode : ''
						}
					})
				);
			} else {
				dispatch(
					addAttributesValue({
						payload: {
							var_title: attributes.name,
							attribute_id: attributes.attributeId,
							colorCode: attributes.attributeType === 'color' ? attributes.colorCode : ''
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
									Attributes Value
								</Button>
								<Typography className="mt-10 text-2xl font-extrabold leading-tight tracking-tight ">
									{attributes.forUpdate ? 'Attribute Value Details' : 'New Attribute Value '}
								</Typography>
							</div>
							<div className="grow-0">
								<div className="flex  items-center ">
									{attributes.isFormValid ? (
										<EscButton
											variant="contained"
											color="secondary"
											className=" w-min   "
											onClick={addAttribts}
											aria-label="Sign in"
											buttonStyle={escGradientAndShadowButtonStyle}
											size="large"
										>
											{attributes.isLoading ? <CircularProgress color="inherit" /> : buttonText}
										</EscButton>
									) : (
										<EscButton
											variant="contained"
											className=" w-min   "
											aria-label="Sign in"
											buttonStyle={escDisabledButtonStyle}
											size="large"
										>
											{attributes.forUpdate ? 'Update' : 'Create'}
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
										{attributes.attributeType === 'color' ? (
											<div>
												<h4 className="mb-10">Select color</h4>
												<HexColorPicker
													style={{ width: 100, height: 100 }}
													color={attributes.colorCode}
													onChange={(e) => {
														dispatch(setColor(e));
													}}
												/>
												<p className="mt-10">{attributes.colorCode}</p>
											</div>
										) : null}
										<TextField
											id="outlined-basic"
											label={
												attributes.attributeType === 'color'
													? 'Set color name'
													: 'Variant value name'
											}
											value={attributes.name}
											error={attributes.error_name !== ''}
											helperText={attributes.error_name}
											onChange={(e) => {
												dispatch(setName(e.target.value));
											}}
											fullWidth
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
						open={attributes.dialogOpen}
						onClose={handleClose}
					>
						<DialogContent>
							<DialogContentText>
								<Box sx={{ width: '250px', fontSize: 16 }}>{attributes.message}</Box>
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
export default withSlices([])(memo(AddAttributeValue));
