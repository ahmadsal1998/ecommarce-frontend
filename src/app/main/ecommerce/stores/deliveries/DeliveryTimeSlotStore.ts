import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';

type AppRootStateType = RootStateType<deliveryBoyTimeSlotSliceType>;
type initialStateProps = {
	isSelected: boolean;
};
const initialState: initialStateProps = {
	isSelected: false
};
export const deliveryTimeSlotSlice = createSlice({
	name: 'deliveryTime',
	initialState,
	reducers: {
		setSelected(state, action) {
			state.isSelected = action.payload as boolean;
		}
	}
});
export const { setSelected } = deliveryTimeSlotSlice.actions;
export const selectDeliveryTimeSlotSlice = appSelector(({ deliveryTime }: AppRootStateType) => deliveryTime);

export type deliveryBoyTimeSlotSliceType = typeof deliveryTimeSlotSlice;
export default deliveryTimeSlotSlice.reducer;
