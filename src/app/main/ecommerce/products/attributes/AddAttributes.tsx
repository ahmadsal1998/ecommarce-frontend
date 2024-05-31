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
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escDisabledButtonStyle, escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import CircularProgress from '@mui/material/CircularProgress';
import {
	addAttributesSlice,
	atributeDialogOpen,
	cleanForm,
	selectAddAttributesSlice,
	setName,
	validateForm
} from '../../stores/attributes/AddAttributeStore';
import { addAttribute, updateAttributeById } from '../../respositories/attributes/attributeRepo';

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

function AddAttributes() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const attributes = useSelector(selectAddAttributesSlice);
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
		dispatch(atributeDialogOpen());
		navigate(-1);
	};
	const addAttribts = () => {
		if (attributes.isFormValid && !attributes.isLoading) {
			if (attributes.forUpdate) {
				dispatch(
					updateAttributeById({
						id: attributes.attribute.int_glcode,
						payload: { var_title: attributes.name }
			})
				);
			} else {
				dispatch(addAttribute({ payload: { var_title: attributes.name } }));
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
									Attributes
								</Button>
								<Typography className="mt-10 text-2xl font-extrabold leading-tight tracking-tight ">
									{attributes.forUpdate ? 'Update Attribute ' : 'New Attribute '}
								</Typography>
							</div>
							<div className="grow-0">
								<div className="flex  items-center ">
									{attributes.isFormValid ? (
										<EscButton
											variant="contained"
											color="secondary"
											className=" w-min   "
											aria-label="Sign in"
											onClick={addAttribts}
											size="large"
											buttonStyle={escGradientAndShadowButtonStyle}
										>
										{attributes.isLoading ? <CircularProgress color="inherit" /> : buttonText}
										</EscButton>
									) : (
										<EscButton
											variant="contained"
											className=" w-min   "
											aria-label="Sign in"
											size="large"
											buttonStyle={escDisabledButtonStyle}
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
										<TextField
											id="outlined-basic"
											label="Name"
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
								<Box sx={{ width: '250px', fontSize:16 }}>{attributes.message}</Box>
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
export default withSlices([addAttributesSlice])(memo(AddAttributes));
