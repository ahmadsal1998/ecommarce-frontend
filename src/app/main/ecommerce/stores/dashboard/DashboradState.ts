import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import moment from 'moment';

type AppRootStateType = RootStateType<dashboardSliceType>;
type initialStateProps = {
	fromDate: string;
    toDate:string;
};

const initialState: initialStateProps = {
    fromDate: `01-01-${new Date().getFullYear()}`,
    toDate: `31-12-${new Date().getFullYear()}`
};

export const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
        setFromDate(state, action){
            state.fromDate = action.payload;
           
        },
        setToDate(state, action){
            state.toDate = action.payload as string;
        }
    }
});

export const {
	setFromDate,
    setToDate
} = dashboardSlice.actions;
export const selectdashboardSLice = appSelector(({ dashboard }: AppRootStateType) => dashboard);

export type dashboardSliceType = typeof dashboardSlice;
export default dashboardSlice.reducer;
