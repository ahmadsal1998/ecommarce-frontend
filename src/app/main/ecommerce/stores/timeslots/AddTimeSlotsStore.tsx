import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import {
	addDeliveryTimeSlot,
	fetchDeliveryTimeSlotById,
	updateDeliveryTimeSlotById
} from '../../respositories/deliveries/DeliveryTimeSlotRepo';
import { DeliveryTimeSlotModel } from '../../models/delivery/DeliveryTimeSlotModel';

const currentDate = new Date();
type AppRootStateType = RootStateType<addTimeSlotSliceType>;
type initialStateProps = {
	timeSlotModel: DeliveryTimeSlotModel;
	startTime: string;
	endTime: string;
	slotEndTime: string;
	chr_type: string;
	error_starttime: string;
	error_endtime: string;
	error_slot_endtime: string;
	forUpdate: boolean;
	isFormValid: boolean;
	dialogOpen: boolean;
	isLoading: boolean;
	message: string;
};
const initialState: initialStateProps = {
	timeSlotModel: null,
	startTime: `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`,
	endTime: `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`,
	slotEndTime: `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`,
	error_starttime: '',
	error_endtime: '',
	error_slot_endtime: '',
	forUpdate: false,
	isFormValid: false,
	chr_type: 'Superfast',
	dialogOpen: false,
	message: '',
	isLoading: false
};
export const addTimeSlotSlice = createSlice({
	name: 'addTimeSlot',
	initialState,
	reducers: {
		setStartTime(state, action) {
			state.startTime = action.payload as string;
			console.log(state.startTime);
			if (state.startTime === '') {
				state.error_starttime = 'Start time is required field';
			} else {
				state.error_starttime = '';
			}
		},
		setForTimeSlotUpdate(state, action) {
			state.forUpdate = action.payload as boolean;
		},
		timeSlotdialogOpen(state, action) {
			state.dialogOpen = action.payload as boolean;
		},
		setDeliveryType(state, action) {
			state.chr_type = action.payload as string;
		},
		setEndTime(state, action) {
			state.endTime = action.payload as string;
			if (state.endTime === '') {
				state.error_endtime = 'End time is required field';
			} else {
				state.error_endtime = '';
			}
		},
		setSlotEndTime(state, action) {
			state.slotEndTime = action.payload as string;
			if (state.slotEndTime === '') {
				state.error_slot_endtime = 'End time is required field';
			} else {
				state.error_slot_endtime = '';
			}
		},
		validateForm(state) {
			if (
				state.startTime !== '' &&
				state.endTime !== '' &&
				state.slotEndTime !== '' &&
				state.chr_type !== '' &&
				state.error_starttime === '' &&
				state.error_endtime === '' &&
				state.error_slot_endtime === ''
			) {
				state.isFormValid = true;
			} else {
				state.isFormValid = false;
			}
		},
		cleanForm(state) {
			state.startTime = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
			state.endTime = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
			state.slotEndTime = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
			state.chr_type = 'Superfast';
			state.error_starttime = '';
			state.error_endtime = '';
			state.error_slot_endtime = '';
		}
	},

	extraReducers: (builder) => {
		builder.addCase(addDeliveryTimeSlot.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(addDeliveryTimeSlot.fulfilled, (state, action) => {
			state.isLoading = false;
			state.dialogOpen = true;
			state.isFormValid = false;
			state.message = action.payload.message;
			state.forUpdate = false;
			state.startTime = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
			state.endTime = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
			state.slotEndTime = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
			state.chr_type = 'Superfast';
		});
		builder.addCase(addDeliveryTimeSlot.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(updateDeliveryTimeSlotById.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(updateDeliveryTimeSlotById.fulfilled, (state, action) => {
			state.isLoading = false;
			state.dialogOpen = true;
			state.message = action.payload.message;
			state.isFormValid = false;
			state.forUpdate = false;
			state.startTime = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
			state.endTime = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
			state.slotEndTime = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
			state.chr_type = 'Superfast';
		});
		builder.addCase(updateDeliveryTimeSlotById.rejected, (state) => {
			state.isLoading = false;
		});

		builder.addCase(fetchDeliveryTimeSlotById.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchDeliveryTimeSlotById.fulfilled, (state, action) => {
			state.timeSlotModel = action.payload.data;
			state.isLoading = false;
			state.startTime = state.timeSlotModel.dt_start_time;
			state.endTime = state.timeSlotModel.dt_end_time;
			state.slotEndTime = state.timeSlotModel.dt_slot_end_time;
			state.chr_type = state.timeSlotModel.chr_type;
		});
		builder.addCase(fetchDeliveryTimeSlotById.rejected, (state) => {
			state.isLoading = false;
		});
	}
});
export const {
	setStartTime,
	setEndTime,
	setForTimeSlotUpdate,
	setSlotEndTime,
	cleanForm,
	validateForm,
	setDeliveryType,
	timeSlotdialogOpen
} = addTimeSlotSlice.actions;
export const selectAddTimeSlotSlice = appSelector(({ addTimeSlot }: AppRootStateType) => addTimeSlot);

export type addTimeSlotSliceType = typeof addTimeSlotSlice;
export default addTimeSlotSlice.reducer;
