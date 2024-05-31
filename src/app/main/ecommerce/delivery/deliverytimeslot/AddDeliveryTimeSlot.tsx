import EscPageSimple from '@esc/core/EscPageSimple';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import withSlices from 'app/store/withSlices';
import EscPageCarded from '@esc/core/EscPageCarded';
import { useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { memo, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { useAppDispatch } from 'app/store/store';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escDisabledButtonStyle, escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import {
	addTimeSlotSlice,
	cleanForm,
	selectAddTimeSlotSlice,
	setDeliveryType,
	setEndTime,
	setSlotEndTime,
	setStartTime,
	timeSlotdialogOpen,
	validateForm
} from '../../stores/timeslots/AddTimeSlotsStore';
import { addDeliveryTimeSlot, updateDeliveryTimeSlotById } from '../../respositories/deliveries/DeliveryTimeSlotRepo';

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

function AddDeliveryTimeSlot() {
	const navigate = useNavigate();
	const timeslot = useSelector(selectAddTimeSlotSlice);
	const dispatch = useAppDispatch();
	const [buttonText, setButtonText] = useState('Create');
	useEffect(() => {
		dispatch(validateForm());
	}, [timeslot.startTime, timeslot.endTime, timeslot.slotEndTime, timeslot.chr_type]);
	const handleClose = () => {
		dispatch(timeSlotdialogOpen([]));
		navigate(-1);
	};
	const addcnts = () => {
		if (!timeslot.isLoading && timeslot.isFormValid) {
			if (timeslot.forUpdate) {
				dispatch(
					updateDeliveryTimeSlotById({
						id: timeslot.timeSlotModel.int_glcode,
						payload: {
							dt_start_time: timeslot.startTime,
							dt_end_time: timeslot.endTime,
							dt_slot_end_time: timeslot.slotEndTime,
							chr_type: timeslot.chr_type
						}
					})
				);
			} else {
				dispatch(
					addDeliveryTimeSlot({
						payload: {
							dt_start_time: timeslot.startTime,
							dt_end_time: timeslot.endTime,
							dt_slot_end_time: timeslot.slotEndTime,
							chr_type: timeslot.chr_type
						}
					})
				);
			}
		}
	};
	useEffect(() => {
		if (!timeslot.forUpdate) {
			dispatch(cleanForm());
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
									Delivery Boy List
								</Button>
								<Typography className="mt-10 text-2xl font-extrabold leading-tight tracking-tight ">
									New Delivery Boy
								</Typography>
							</div>
							<div className="grow-0">
								<div className="flex  items-center ">
									{timeslot.isFormValid ? (
										<EscButton
											variant="contained"
											color="secondary"
											className=" w-min   "
											aria-label="Sign in"
											size="large"
											onClick={addcnts}
											buttonStyle={escGradientAndShadowButtonStyle}
										>
											{timeslot.isLoading ? <CircularProgress color="inherit" /> : buttonText}
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
					<div className="flex grow min-h-max ">
						<EscPageCarded
							content={
								<Box
									sx={{
										flexGrow: 0,
										padding: '1.5rem 1rem 1rem 0'
									}}
									className="m-20 max-w-2xl "
								>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DemoContainer components={['TimePicker']}>
											<TimePicker
												className="w-full"
												label="Start time"
												value={dayjs(timeslot.startTime)}
												onChange={(newValue) =>
													dispatch(
														setStartTime(
															`${dayjs(newValue).hour()}:${dayjs(newValue).minute()}:${dayjs(newValue).second()}`
														)
													)
												}
											/>
										</DemoContainer>
									</LocalizationProvider>
									<div className="mt-20" />
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DemoContainer components={['TimePicker']}>
											<TimePicker
												className="w-full "
												label="End time"
												value={dayjs(timeslot.endTime)}
												onChange={(newValue) =>
													dispatch(
														setEndTime(
															`${dayjs(newValue).hour()}:${dayjs(newValue).minute()}:${dayjs(newValue).second()}`
														)
													)
												}
											/>
										</DemoContainer>
									</LocalizationProvider>
									<div className="mt-20" />
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DemoContainer components={['TimePicker']}>
											<TimePicker
												className="w-full"
												label="Start Slot time"
												value={dayjs(timeslot.slotEndTime)}
												onChange={(newValue) =>
													dispatch(
														setSlotEndTime(
															`${dayjs(newValue).hour()}:${dayjs(newValue).minute()}:${dayjs(newValue).second()}`
														)
													)
												}
											/>
										</DemoContainer>
									</LocalizationProvider>
									<div className="mt-20" />
									<FormControl>
										<FormLabel id="demo-row-radio-buttons-group-label">Delivery Type</FormLabel>
										<RadioGroup
											row
											aria-labelledby="demo-row-radio-buttons-group-label"
											name="row-radio-buttons-group"
											onChange={(e) => dispatch(setDeliveryType(e.target.value))}
											value={timeslot.chr_type}
										>
											<FormControlLabel
												value="Superfast"
												control={<Radio />}
												label="Superfast"
											/>
											<FormControlLabel
												value="Ultrafast"
												control={<Radio />}
												label="Ultrafast"
											/>
										</RadioGroup>
									</FormControl>
								</Box>
							}
						/>
					</div>
					<Dialog
						onClose={handleClose}
						open={timeslot.dialogOpen}
					>
						<DialogContent>
							<DialogContentText>
								<Box sx={{ width: '250px', fontSize: 16 }}>{timeslot.message}</Box>
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
export default withSlices([addTimeSlotSlice])(memo(AddDeliveryTimeSlot));
