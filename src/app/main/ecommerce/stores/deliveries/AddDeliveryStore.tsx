import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { regEmail, regPassword } from '../../constants/AppConstants';
import {
	addDeliveryBoy,
	fetchDeliveryBoyById,
	updateDeliveryById
} from '../../respositories/deliveries/DeliveryBoyListRepo';
import { DeliveryBoyModel } from '../../models/delivery/DeliveryBoyModel';

type AppRootStateType = RootStateType<addDeliverySliceType>;
type initialStateProps = {
	deliveryBoy: DeliveryBoyModel;
	name: string;
	email: string;
	password: string;
	mobile_no: string;
	profilePic: string;
	nationalId_one: string;
	nationId_two: string;
	vehicleImage: string;
	error_name: string;
	error_email: string;
	error_password: string;
	error_mobile: string;
	isFormValid: boolean;
	isLoading: boolean;
	message: string;
	dialogOpen: boolean;
	forUpdate: boolean;
	isCategoryCreated: boolean;
};
const initialState: initialStateProps = {
	deliveryBoy: null,
	name: '',
	email: '',
	password: '',
	mobile_no: '',
	error_name: '',
	error_email: '',
	error_password: '',
	error_mobile: '',
	isFormValid: false,
	isLoading: false,
	message: '',
	forUpdate: false,
	dialogOpen: false,
	isCategoryCreated: false,
	profilePic: '',
	nationalId_one: '',
	nationId_two: '',
	vehicleImage: ''
};
export const addDeliverySlice = createSlice({
	name: 'addDelivery',
	initialState,
	reducers: {
		setName(state, action) {
			state.name = action.payload as string;
			if (state.name === '') {
				state.error_name = 'Name is require field';
			} else {
				state.error_name = '';
			}
		},
		setProfilePic(state, action) {
			state.profilePic = action.payload as string;
		},
		deliveryBoyDialogOpen(state, action) {
			state.dialogOpen = !state.dialogOpen;
		},
		deliveryBoySetForUpdate(state, action) {
			state.forUpdate = !state.forUpdate;
		},
		setNationalIdOne(state, action) {
			state.nationalId_one = action.payload as string;
		},
		setNationIdTwo(state, action) {
			state.nationId_two = action.payload as string;
		},
		setVehicleImage(state, action) {
			state.vehicleImage = action.payload as string;
		},
		setEmail(state, action) {
			state.email = action.payload as string;
			if (state.email === '') {
				state.error_email = 'Email is require field';
			} else if (!regEmail.test(state.email)) {
				state.error_email = 'Enter valid email address';
			} else {
				state.error_email = '';
			}
		},
		setPassword(state, action) {
			state.password = action.payload as string;
			if (state.password === '') {
				state.error_password = 'Password is required field';
			} else if (!regPassword.test(state.password)) {
				state.error_password =
					'Your password must contains at least 8 digit, at least one lowercase letter, one uppercase letter, one number, and one special character';
			} else {
				state.error_password = '';
			}
		},
		setMobile(state, action) {
			state.mobile_no = action.payload as string;
			if (state.mobile_no === '') {
				state.error_mobile = 'mobile no. is required field';
			} else if (!/^([0-9]{10,10})$/.test(state.mobile_no)) {
				state.error_mobile = 'Enter valid Mobile number';
			} else {
				state.error_mobile = '';
			}
		},
		checkformValidation(state) {
			if (
				state.name !== '' &&
				state.email !== '' &&
				state.forUpdate  &&
				state.profilePic !== '' &&
				state.nationalId_one !== '' &&
				state.nationId_two !== '' &&
				state.vehicleImage !== '' &&
				state.error_name === '' &&
				state.error_email === '' &&
				state.error_mobile === ''
			) {
				state.isFormValid = true;
			} else if (
				state.name !== '' &&
				state.email !== '' &&
				state.password !== '' &&
				state.profilePic !== '' &&
				state.nationalId_one !== '' &&
				state.nationId_two !== '' &&
				state.vehicleImage !== '' &&
				state.error_name === '' &&
				state.error_email === '' &&
				state.error_mobile === '' &&
				state.error_password === ''
			) {
				state.isFormValid = true;
			} else {
				state.isFormValid = false;
			}
		},
		clearForm(state) {
			state.email = '';
			state.name = '';
			state.mobile_no = '';
			state.password = '';
			state.profilePic = '';
			state.nationalId_one = '';
			state.nationId_two = '';
			state.vehicleImage = '';
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addDeliveryBoy.pending, (state) => {
			state.isLoading = true;
			state.isCategoryCreated = false;
		});
		builder.addCase(addDeliveryBoy.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
			state.name = '';
			state.isCategoryCreated = true;
		});
		builder.addCase(addDeliveryBoy.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
			state.isCategoryCreated = false;
		});
		builder.addCase(fetchDeliveryBoyById.fulfilled, (state, action) => {
			state.deliveryBoy = action.payload.data;
			state.email = state.deliveryBoy.var_email;
			state.name = state.deliveryBoy.var_name;
			state.mobile_no = state.deliveryBoy.var_mobile_no;
			state.profilePic = state.deliveryBoy.var_profile;
			state.nationalId_one = state.deliveryBoy.nation_id;
			state.nationId_two = state.deliveryBoy.var_aadharcard;
			state.vehicleImage = state.deliveryBoy.vehicle_image;
			state.forUpdate = true;
			state.isFormValid = true;
			state.isLoading = false;
		});

		builder.addCase(updateDeliveryById.pending, (state) => {
			state.isLoading = true;
			state.isCategoryCreated = false;
		});
		builder.addCase(updateDeliveryById.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
			state.isCategoryCreated = true;
		});
		builder.addCase(updateDeliveryById.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
			state.isCategoryCreated = false;
		});
	}
});
export const {
	setName,
	setEmail,
	setPassword,
	setMobile,
	checkformValidation,
	clearForm,
	setProfilePic,
	deliveryBoySetForUpdate,
	setNationalIdOne,
	setNationIdTwo,
	setVehicleImage,
	deliveryBoyDialogOpen
} = addDeliverySlice.actions;
export const selectAddDeliverySlice = appSelector(({ addDelivery }: AppRootStateType) => addDelivery);

export type addDeliverySliceType = typeof addDeliverySlice;
export default addDeliverySlice.reducer;
