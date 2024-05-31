import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from 'src/app/store/types';
import { appSelector } from 'src/app/store/store';
import { ReactElement } from 'react';

type AppRootStateType = RootStateType<dialogSliceType>;

type InitialStateProps = {
	open: boolean;
	children: ReactElement | string;
};

/**
 * The initial state of the dialog slice.
 */
const initialState: InitialStateProps = {
	open: false,
	children: ''
};

/**
 * The Esc Dialog slice
 */
export const escDialogSlice = createSlice({
	name: 'escDialog',
	initialState,
	reducers: {
		openDialog: (state, action: PayloadAction<{ children: InitialStateProps['children'] }>) => {
			state.open = true;
			state.children = action.payload.children;
		},
		closeDialog: () => initialState
	}
});

export const { closeDialog, openDialog } = escDialogSlice.actions;

export const selectEscDialogState = appSelector((state: AppRootStateType) => state.escDialog.open);

export const selectEscDialogProps = appSelector((state: AppRootStateType) => state.escDialog);

export type dialogSliceType = typeof escDialogSlice;

export default escDialogSlice.reducer;
