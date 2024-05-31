import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { regEmail, regPassword } from '../../constants/AppConstants';
import { addAdminUser, getAdminUserById, updateAdminUserById } from '../../respositories/users/AdminUerRepo';
import { UserModel } from '../../models/users/UsersModel';

type AppRootStateType = RootStateType<addDashboardSliceType>;
type initialStateProps = {
	name: string;
	email: string;
	user: UserModel;
	mobile_no: string;
	password: string;
	role: string;
	error_name: string;
	error_email: string;
	error_mobile: string;
	error_password: string;
	forUpdate: boolean;
	isFormValid: boolean;
	error_message: string;
	userCreated: boolean;
	message: string;
	isLoading: boolean;
	dialogOpen: boolean;
};

const initialState: initialStateProps = {
	name: '',
	email: '',
	mobile_no: '',
	role: '',
	user: null,
	password: '',
	error_email: '',
	error_name: '',
	error_mobile: '',
	error_password: '',
	forUpdate: false,
	isFormValid: true,
	error_message: '',
	userCreated: false,
	message: '',
	isLoading: false,
	dialogOpen: false
};
export const addDashboardUserSlice = createSlice({
	name: 'addDashboard',
	initialState,
	reducers: {
		setName(state, action) {
			state.name = action.payload as string;
			if (state.name === '') {
				state.error_name = 'Name is required field';
			} else {
				state.error_name = '';
			}
		},
		setRole(state, action) {
			state.role = action.payload as string;
		},
		setEmail(state, action) {
			state.email = action.payload as string;
			if (state.email === '') {
				state.error_email = 'Email is required field';
			} else if (!regEmail.test(state.email)) {
				state.error_email = 'Enter valid email address';
			} else {
				state.error_email = '';
			}
		},
		userDialogOpen(state) {
			state.dialogOpen = !state.dialogOpen;
		},
		forUserUpdate(state, action) {
			state.forUpdate = action.payload as boolean;
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
		checkformValidation(state) {
			if (forUserUpdate) {
				if (
					state.name !== '' &&
					state.email !== '' &&
					state.error_name === '' &&
					state.role !== '' &&
					state.error_email === '' &&
					state.error_mobile === '' 
				) {
					state.isFormValid = true;
				} else {
					state.isFormValid = false;
				}
			} else if (
				state.name !== '' &&
				state.email !== '' &&
				state.password !== '' &&
				state.error_name === '' &&
				state.role !== '' &&
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
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addAdminUser.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(addAdminUser.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.isLoading = false;
			state.email = '';
			state.name = '';
			state.mobile_no = '';
			state.password = '';
			state.userCreated = true;
			state.dialogOpen = true;
		});
		builder.addCase(addAdminUser.rejected, (state, action) => {
			state.userCreated = false;
			state.isLoading = false;
			if (action.error.message !== undefined) {
				if (action.error.message.includes('Email')) {
					state.error_email = action.error.message;
				} else if (action.error.message.includes('Mobile')) {
					state.error_mobile = action.error.message;
				} else {
					state.error_message = action.error.message;
				}
			}
		});

		builder.addCase(getAdminUserById.fulfilled, (state, action) => {
			try {
				state.email = action.payload.data.var_email;
				state.name = action.payload.data.var_name;
				state.mobile_no = action.payload.data.var_mobile_no;
				state.isFormValid = true;
				state.user = action.payload.data;
			} catch (e) {
				/* empty */
			}
		});
		builder.addCase(updateAdminUserById.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(updateAdminUserById.fulfilled, (state, action) => {
			state.userCreated = true;
			state.message = action.payload.message;
			state.isLoading = false;
			state.dialogOpen = true;
		});
		builder.addCase(updateAdminUserById.rejected, (state, action) => {
			state.isLoading = false;
			state.userCreated = false;
			state.error_message = action.error.message;
		});
	}
});
export const {
	setName,
	setEmail,
	setMobile,
	setPassword,
	checkformValidation,
	forUserUpdate,
	userDialogOpen,
	clearForm,
	setRole
} = addDashboardUserSlice.actions;
export const selectDashboardsSlice = appSelector(({ addDashboard }: AppRootStateType) => addDashboard);

export type addDashboardSliceType = typeof addDashboardUserSlice;
export default addDashboardUserSlice.reducer;
