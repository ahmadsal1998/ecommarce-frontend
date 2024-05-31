import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';

type AppRootStateType = RootStateType<dashboardUserSliceType>;
type initialStateProps = {
	isSelected: boolean;
};
const initialState: initialStateProps = {
	isSelected: false
};
export const dashboardUserSlice = createSlice({
	name: 'dashboardUser',
	initialState,
	reducers: {
		setSelected(state, action) {
			state.isSelected = action.payload as boolean;
		}
	}
});
export const { setSelected } = dashboardUserSlice.actions;
export const selectDashboardUserSlice = appSelector(({ dashboardUser }: AppRootStateType) => dashboardUser);

export type dashboardUserSliceType = typeof dashboardUserSlice;
export default dashboardUserSlice.reducer;
