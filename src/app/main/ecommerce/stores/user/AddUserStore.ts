/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import {UserModel} from '../../models/users/UsersModel';
import { regEmail, regPassword } from '../../constants/AppConstants';
import { addUser, getUserById, updateUserById } from '../../respositories/users/UsersRepo';


type AppRootStateType = RootStateType<addUserSliceType>;
type initialStateProps = {
	user: UserModel;
	name: string;
	user_id: string;
	email: string;
	mobile_no: string;
	password: string;
	error_name: string;
	error_email: string;
	error_mobile: string;
	error_password: string;
	forUpdate: boolean;
	userAdding: boolean;
	isFormValid: boolean;
	error_message: string;
	userCreated: boolean;
	message: string;
	isLoading: boolean;
	dialogOpen:boolean;
};
const initialState: initialStateProps = {
	user: null,
	name: '',
	email: '',
	mobile_no: '',
	password: '',
	error_email: '',
	user_id: '',
	userAdding: false,
	error_name: '',
	error_mobile: '',
	error_password: '',
	forUpdate: false,
	error_message: '',
	isFormValid: true,
	userCreated: false,
	message:'',
	dialogOpen:false,
	isLoading: false
};

export const addUserSlice = createSlice({
	name: 'adduser',
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload as UserModel;
		},
		setName(state, action) {
			state.name = action.payload as string;
			if (state.name === '') {
				state.error_name = 'Name is required field';
			} else {
				state.error_name = '';
			}
		},
		forUserUpdate(state, action){
			state.forUpdate = action.payload as boolean;
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
		setMobile(state, action) {
			state.mobile_no = action.payload as string;
			if (state.mobile_no === '') {
				state.error_mobile = 'Mobile Number is required field';
			} else if (!/^([0-9]{10,10})$/.test(state.mobile_no)) {
				state.error_mobile = 'Enter valid Mobile Number';
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
		addNewUser(state, action){
			if(state.forUpdate){
				if (
					state.name !== '' &&
					state.email !== '' &&
					state.error_name === '' &&
					state.error_email === '' &&
					state.error_mobile === ''
				) {
					state.userAdding = action.payload as boolean;
				} 
			}else if (
				state.name !== '' &&
				state.email !== '' &&
				state.password !== '' &&
				state.error_name === '' &&
				state.error_email === '' &&
				state.error_mobile === '' &&
                state.error_password === ''
			) {
				state.userAdding = action.payload as boolean;
			}
		},
		userDialogOpen(state){
			state.dialogOpen = !state.dialogOpen;
		},
		checkformValidation(state) {
			if(state.forUpdate){
				if (
					state.name !== '' &&
					state.email !== '' &&
					state.error_name === '' &&
					state.error_email === '' &&
					state.error_mobile === ''
				) {
					state.isFormValid = true;
				} else {
					state.isFormValid = false;
				}
			}else if (
				state.name !== '' &&
				state.email !== '' &&
				state.password !== '' &&
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
			state.error_name= ''
			state.error_email= '';
			state.error_mobile= '';
			state.error_password='';
			state.mobile_no = '';
			state.password = '';
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addUser.pending, (state) => {
			state.isLoading =true;
		});
		builder.addCase(addUser.fulfilled, (state,action) => {
			state.message = action.payload.message;
			state.userAdding = false;
			state.isLoading =false;
			state.email = '';
			state.name = '';
			state.mobile_no = '';
			state.password = '';
			state.userCreated = true;
			state.dialogOpen = true;
		});
		builder.addCase(addUser.rejected, (state, action) => {
			state.userCreated = false;
			state.isLoading =false;
			if(action.error.message !== undefined){
				if(action.error.message.includes('Email')){
					state.error_email = action.error.message;
				}
				else if(action.error.message.includes('Mobile')){
					state.error_mobile = action.error.message;
				}else{
					state.error_message = action.error.message;
				}
			}
			state.userAdding = false;
		});

		builder.addCase(getUserById.fulfilled, (state, action) => {
			try{
				
			
				state.email  =action.payload.data.var_email;
				state.name  = action.payload.data.var_name;
				state.mobile_no  = action.payload.data.var_mobile_no;
				state.isFormValid =true;
				state.user = action.payload.data;
			
			}catch(e){ /* empty */ }
		});
		builder.addCase(updateUserById.pending, (state) => {
			state.isLoading =true;
			
		})
		builder.addCase(updateUserById.fulfilled, (state, action) => {
			state.userAdding = false;
			state.userCreated = true;
			state.message = action.payload.message;
			state.isLoading =false;
			state.dialogOpen = true;
		})
		builder.addCase(updateUserById.rejected, (state, action) => {
			state.userAdding = false;
			state.isLoading =false;
			state.userCreated = false;
			state.error_message = action.error.message;
		})
	}
});

export const { setUser, setName, setEmail, setMobile, setPassword, checkformValidation, forUserUpdate, clearForm, addNewUser, userDialogOpen  } = addUserSlice.actions;
export const selectAdUserLice = appSelector(({ adduser }: AppRootStateType) => adduser);

export type addUserSliceType = typeof addUserSlice;
export default addUserSlice.reducer;
