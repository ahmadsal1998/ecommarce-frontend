import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';

type AppRootStateType = RootStateType<rejectionReasonSliceType>;
type initialStateProps = {
	isSelected: boolean;
};
const initialState: initialStateProps = {
	isSelected: false
};
export const rejectionReasonSlice = createSlice({
	name: 'rejectionReason',
	initialState,
	reducers: {
		setSelected(state, action) {
			state.isSelected = action.payload as boolean;
		}
	}
});
export const { setSelected } = rejectionReasonSlice.actions;
export const selectRejectionReasonSlice = appSelector(({ rejectionReason }: AppRootStateType) => rejectionReason);

export type rejectionReasonSliceType = typeof rejectionReasonSlice;
export default rejectionReasonSlice.reducer;
