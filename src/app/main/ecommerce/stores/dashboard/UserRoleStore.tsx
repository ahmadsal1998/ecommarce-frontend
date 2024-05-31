import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';

type AppRootStateType = RootStateType<userRoleSliceType>;
type initialStateProps = {
	isSelected: boolean;
};
const initialState: initialStateProps = {
	isSelected: false
};
export const userRoleSlice = createSlice({
	name: 'userRole',
	initialState,
	reducers: {
		setSelected(state, action) {
			state.isSelected = action.payload as boolean;
		}
	}
});
export const { setSelected } = userRoleSlice.actions;
export const selectUserRoleSliceSlice = appSelector(({ userRole }: AppRootStateType) => userRole);

export type userRoleSliceType = typeof userRoleSlice;
export default userRoleSlice.reducer;
