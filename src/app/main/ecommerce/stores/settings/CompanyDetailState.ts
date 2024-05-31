import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { MetacontentModel } from '../../models/settings/MetaContactModel';
import { addCompanyDetails, fetchCompanyDetails, updateCompanyDetailById } from '../../respositories/settings/CompanyDetailRepo';

type AppRootStateType = RootStateType<addCompanyDetailsType>;
type initialStateProps = {
	metaContent: MetacontentModel;
	id: string;
	companyName: string;
	mobile: string;
	email: string;
	gst: string;
	address: string;
	forUpdate: boolean;
	isFormValid: boolean;
	isLoading: boolean;
	message: string;
	dialogOpen: boolean;
};
const initialState: initialStateProps = {
	metaContent: null,
	id: '',
	forUpdate: false,
	isFormValid: false,
	isLoading: false,
	message: '',
	dialogOpen: false,
	companyName: '',
	mobile: '',
	email: '',
	gst: '',
	address: ''
};
export const addCompanyDetailsSlice = createSlice({
	name: 'addCompanyDetails',
	initialState,
	reducers: {
		setCompanyName(state, action) {
			state.companyName = action.payload as string;
		},
		setMobile(state, action) {
			state.mobile = action.payload as string;
		},
		setEmail(state, action) {
			state.email = action.payload as string;
		},
		setGst(state, action) {
			state.gst = action.payload as string;
		},
		setAddress(state, action) {
			state.address = action.payload as string;
		},
		toggleMetaDailog(state) {
			state.dialogOpen = !state.dialogOpen;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCompanyDetails.fulfilled, (state, action) => {
			if (action.payload.data.length > 0) {
				state.id = action.payload.data[0].int_glcode;
				
				state.companyName = action.payload.data[0].companyName;
				state.mobile = action.payload.data[0].mobile;
				state.email = action.payload.data[0].email;
				state.gst = action.payload.data[0].gst;
				state.address = action.payload.data[0].address;
			}
			state.isFormValid = true;
			state.isLoading = false;
		});
		builder.addCase(addCompanyDetails.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(addCompanyDetails.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
		});
		builder.addCase(addCompanyDetails.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
		});
		builder.addCase(updateCompanyDetailById.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(updateCompanyDetailById.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
		});
		builder.addCase(updateCompanyDetailById.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
		});
	}
});
export const { setCompanyName, setMobile,setEmail,setGst,setAddress, toggleMetaDailog } = addCompanyDetailsSlice.actions;
export const selectAddCompanyDetailsSlice = appSelector(({ addCompanyDetails }: AppRootStateType) => addCompanyDetails);

export type addCompanyDetailsType = typeof addCompanyDetailsSlice;
export default addCompanyDetailsSlice.reducer;
