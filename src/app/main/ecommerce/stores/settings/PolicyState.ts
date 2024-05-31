import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { PolicyModel } from '../../models/settings/PolicyModel';
import { addPolicy, fetchPolicy, updatePolicyById } from '../../respositories/settings/PolicyRepo';

type AppRootStateType = RootStateType<addPolicyType>;
type initialStateProps = {
	metaContent: PolicyModel;
	id: string;
	tern_and_condition: string;
	shiping_policy: string;
	privacy_policy: string;
	return_policy: string;
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
	tern_and_condition: '',
	shiping_policy: '',
	privacy_policy: '',
	return_policy: ''
};
export const addPolicySlice = createSlice({
	name: 'addPoliciy',
	initialState,
	reducers: {
		setTernAndCondition(state, action) {
			state.tern_and_condition = action.payload as string;
		},
		setShipingpolicy(state, action) {
			state.shiping_policy = action.payload as string;
		},
		setPrivacyPolicy(state, action) {
			state.privacy_policy = action.payload as string;
		},
		setReturnPolicy(state, action) {
			state.return_policy = action.payload as string;
		},
		togglePolicyDailog(state) {
			state.dialogOpen = !state.dialogOpen;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPolicy.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchPolicy.fulfilled, (state, action) => {
			if (action.payload.data.length > 0) {
				state.id = action.payload.data[0].int_glcode;
				state.tern_and_condition = action.payload.data[0].tern_and_condition;
				state.shiping_policy = action.payload.data[0].shiping_policy;
				state.privacy_policy = action.payload.data[0].privacy_policy;
				state.return_policy = action.payload.data[0].return_policy;
			}
			state.isFormValid = true;
			state.isLoading = false;
		});
		builder.addCase(addPolicy.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(addPolicy.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
		});
		builder.addCase(addPolicy.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
		});
		builder.addCase(updatePolicyById.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(updatePolicyById.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
		});
		builder.addCase(updatePolicyById.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
		});
	}
});
export const { setTernAndCondition, setShipingpolicy, setReturnPolicy, setPrivacyPolicy, togglePolicyDailog } =
	addPolicySlice.actions;
export const selectPolicySlice = appSelector(({ addPoliciy }: AppRootStateType) => addPoliciy);

export type addPolicyType = typeof addPolicySlice;
export default addPolicySlice.reducer;
