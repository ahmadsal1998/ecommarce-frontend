import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';

type AppRootStateType = RootStateType<addReasonSliceType>;
type initialStateProps = {
	name: string;
	error_name: string;
	forUpdate: boolean;
	isFormValid: boolean;
};
const initialState: initialStateProps = {
	name: '',
	error_name: '',
	forUpdate: false,
	isFormValid: false
};
export const addReasonSlice = createSlice({
	name: 'addreason',
	initialState,
	reducers: {
		setName(state, action) {
			state.name = action.payload as string;
		},
		cleanForm(state) {
			state.name = '';
		},
		validateForm(state) {
			if (state.name !== '' && state.error_name === '') {
				state.isFormValid = true;
			} else {
				state.isFormValid = false;
			}
		}
	}
});
export const { setName, cleanForm, validateForm } = addReasonSlice.actions;
export const selectAddReasonSlice = appSelector(({ addreason }: AppRootStateType) => addreason);

export type addReasonSliceType = typeof addReasonSlice;
export default addReasonSlice.reducer;
