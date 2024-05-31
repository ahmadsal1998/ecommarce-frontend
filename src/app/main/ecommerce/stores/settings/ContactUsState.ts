import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { ContactUsModel } from '../../models/settings/ContactUsModel';
import { addContactUs, fetchContact, updateContactById } from '../../respositories/settings/ContactUsRepo';

type AppRootStateType = RootStateType<addContactUsType>;
type initialStateProps = {
	contact: ContactUsModel;
	id: string;
	email: string;
	phone: string;
	facebook: string;
	insta: string;
	google: string;
	youtube: string;
	twitter: string;
	forUpdate: boolean;
	isFormValid: boolean;
	isLoading: boolean;
	message: string;
	dialogOpen: boolean
};
const initialState: initialStateProps = {
	contact: null,
	id: '',
	forUpdate: false,
	isFormValid: false,
	isLoading: false,
	message: '',
	dialogOpen: false,
	email: '',
	phone: '',
	facebook: '',
	insta: '',
	google: '',
	twitter: '',
	youtube: ''
};
export const addContactUsSlice = createSlice({
	name: 'addContact',
	initialState,
	reducers: {
		setEmail(state, action) {
			state.email = action.payload as string;
		},
		setPhone(state, action) {
			state.phone = action.payload as string;
		},

		setFacebook(state, action) {
			state.facebook = action.payload as string;
		},
		setInsta(state, action) {
			state.insta = action.payload as string;
		},
		setYoutube(state, action) {
			state.youtube = action.payload as string;
		},
		setGoogle(state, action) {
			state.google = action.payload as string;
		},
		contactDialogOpen(state) {
			state.dialogOpen = !state.dialogOpen;
		},
		setTwittter(state, action) {
			state.twitter = action.payload as string;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchContact.fulfilled, (state, action) => {
			if (action.payload.data.length > 0) {
				state.id = action.payload.data[0].int_glcode;
				state.email = action.payload.data[0].email;
				state.phone = action.payload.data[0].phone;
				state.facebook = action.payload.data[0].facebook;
				state.insta = action.payload.data[0].insta;
				state.google = action.payload.data[0].google;
				state.twitter = action.payload.data[0].twitter;
				state.youtube = action.payload.data[0].youtube;
			}
			state.isFormValid = true;
			state.isLoading = false;
		});
		builder.addCase(addContactUs.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(addContactUs.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
		});
		builder.addCase(addContactUs.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
		});
		builder.addCase(updateContactById.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(updateContactById.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
		});
		builder.addCase(updateContactById.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
		});
	}
});
export const { setEmail, setPhone, setYoutube, setFacebook, setInsta, setGoogle, setTwittter, contactDialogOpen } =
	addContactUsSlice.actions;
export const selectAddContactUsSlice = appSelector(({ addContact }: AppRootStateType) => addContact);

export type addContactUsType = typeof addContactUsSlice;
export default addContactUsSlice.reducer;
