import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { AddressModel } from '../../models/address/AddressModel';
import { fetchUserAddress } from '../../respositories/users/UsersRepo';

type AppRootStateType = RootStateType<addAddressSliceType>;

type initialStateProps = {
	address: Array<AddressModel>;
	house_no: string;
	appartment_no: string;
	landmark: string;
	updateIndex: number;
	city: string;
	state: string;
	country: string;
	pin_code: string;
	is_default: boolean;
	address_type: string;
	error_house: string;
	error_appartment: string;
	error_landmark: string;
	error_city: string;
	error_state: string;
	error_country: string;
	error_pin: string;
	isFormValid: boolean;
	forUpdate: boolean;
	error_message: string;
};

const initialState: initialStateProps = {
	address: [],
	house_no: '',
	appartment_no: '',
	landmark: '',
	city: '',
	state: '',
	country: '',
	updateIndex: -1,
	pin_code: '',
	is_default: false,
	address_type: 'home',
	error_house: '',
	error_appartment: '',
	error_landmark: '',
	error_city: '',
	error_state: '',
	error_country: '',
	error_pin: '',
	error_message: '',
	isFormValid: false,
	forUpdate: false
};

export const addAddressSlice = createSlice({
	name: 'addaddress',
	initialState,
	reducers: {
		setAddress(state, action) {
			if ((action.payload as AddressModel).default_status === 'Y') {
				state.address.forEach((addr) => {
					if (addr.default_status === 'Y') {
						addr.default_status = 'N';
					}
				});
			}

			state.address.push(action.payload as AddressModel);
		},
		updateAddress(state, action) {
			if (state.updateIndex > -1) {
				if ((action.payload as AddressModel).default_status === 'Y') {
					state.address.forEach((addr) => {
						if (addr.default_status === 'Y') {
							addr.default_status = 'N';
						}
					});
				}
				const addresss= action.payload as AddressModel;
				addresss.int_glcode = state.address[state.updateIndex].int_glcode;
				addresss.fk_user =state.address[state.updateIndex].fk_user;
				state.address[state.updateIndex] = addresss;
				state.updateIndex = -1;
			}
		},
		deleteAddress(state, action) {
			state.address.splice(action.payload as number, 1);
			state.error_message = '';
		},
		deleteAllAddress(state) {
			state.address = [];
			state.error_message = '';
		},
		setHouseNo(state, action) {
			state.house_no = action.payload as string;
			if (state.house_no === '') {
				state.error_house = 'House no. is required field';
			} else {
				state.error_house = '';
			}
		},
		setAppartmentNo(state, action) {
			state.appartment_no = action.payload as string;
			if (state.appartment_no === '') {
				state.error_appartment = 'Appartment no. is required field';
			} else {
				state.error_appartment = '';
			}
		},
		setLandmark(state, action) {
			state.landmark = action.payload as string;

			if (state.landmark === '') {
				state.error_landmark = 'Landmark is required field';
			} else {
				state.error_landmark = '';
			}
		},
		setCity(state, action) {
			state.city = action.payload as string;
			if (state.city === '') {
				state.error_city = 'City is required field';
			} else {
				state.error_city = '';
			}
		},
		setState(state, action) {
			state.state = action.payload as string;
			if (state.state === '') {
				state.error_state = 'State is required field';
			} else {
				state.error_state = '';
			}
		},
		setCountry(state, action) {
			state.country = action.payload as string;
			if (state.country === '') {
				state.error_country = 'Country is required field';
			} else {
				state.error_country = '';
			}
		},
		setPin(state, action) {
			state.pin_code = action.payload as string;
			if (state.pin_code === '') {
				state.error_pin = 'Pincode is required field';
			} else if (!/^([0-9]{6,6})$/.test(state.pin_code)) {
				state.error_pin = 'Invalid pincode';
			} else {
				state.error_pin = '';
			}
		},
		setDefault(state) {
			state.is_default = !state.is_default;
		},
		setType(state, action) {
			state.address_type = action.payload as string;
		},
		checkformValidation(state) {
			if (
				state.house_no !== '' &&
				state.appartment_no !== '' &&
				state.city !== '' &&
				state.country !== '' &&
				state.landmark !== '' &&
				state.pin_code !== '' &&
				state.state !== '' &&
				state.error_house === '' &&
				state.error_appartment === '' &&
				state.error_city === '' &&
				state.error_state === '' &&
				state.error_landmark === '' &&
				state.error_country === '' &&
				state.error_pin === ''
			) {
				state.isFormValid = true;
			} else {
				state.isFormValid = false;
			}
		},
		updateData(state, action) {
			state.updateIndex = (action.payload as { i: number }).i;
			const addressModel = (action.payload as { d: AddressModel }).d;
			state.house_no = addressModel.var_house_no;
			state.appartment_no = addressModel.var_app_name;
			state.city = addressModel.var_city;
			state.country = addressModel.var_country;
			state.state = addressModel.var_state;
			state.landmark = addressModel.var_landmark;
			state.pin_code = addressModel.var_pincode;
			state.is_default = addressModel.default_status === 'Y';
			state.address_type = addressModel.chr_type;
			state.isFormValid = true;
			state.forUpdate = true;
		},
		clearAddressForm(state) {
			state.house_no = '';
			state.appartment_no = '';
			state.city = '';
			state.country = '';
			state.state = '';
			state.landmark = '';
			state.pin_code = '';
			state.is_default = false;
			state.address_type = 'home';
			state.isFormValid = false;
			state.forUpdate = false;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUserAddress.fulfilled, (state, action) => {
			state.address = action.payload.data;
		});
	}
});

export const {
	setAddress,
	deleteAddress,
	setHouseNo,
	setAppartmentNo,
	setLandmark,
	setCity,
	setState,
	setCountry,
	setPin,
	setDefault,
	setType,
	checkformValidation,
	clearAddressForm,
	updateData,
	updateAddress,
	deleteAllAddress
} = addAddressSlice.actions;
export const selectAddAddressLice = appSelector(({ addaddress }: AppRootStateType) => addaddress);

export type addAddressSliceType = typeof addAddressSlice;
export default addAddressSlice.reducer;
