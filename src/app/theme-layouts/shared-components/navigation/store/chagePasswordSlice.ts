import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';


type AppRootStateType = RootStateType<addChangePasswordSliceType>;
type initialStateProps = {
	changePassword: boolean
};
const initialState: initialStateProps = {
	changePassword: false
};
export const changePasswordSlice = createSlice({
	name: 'changePassword',
	initialState,
	reducers: {
		setChangePassword(state,action){
            state.changePassword = action.payload as boolean;
        }
	},
	
});
export const {
	setChangePassword
} = changePasswordSlice.actions;
export const selectChangePasswordSlice = appSelector(({ changePassword }: AppRootStateType) => changePassword);

export type addChangePasswordSliceType = typeof changePasswordSlice;
export default changePasswordSlice.reducer;
