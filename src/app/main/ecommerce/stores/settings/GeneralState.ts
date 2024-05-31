import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { GeneralModel } from '../../models/settings/GeneralModel';
import { addGeneral, fetchGeneral, updateGeneralById } from '../../respositories/settings/GeneralRepo';

type AppRootStateType = RootStateType<addGeneralType>;
type initialStateProps = {
	metaContent: GeneralModel;
	id: string;
	site_name: string;
	footer_copyright: string;
	currency: string;
	site_logo: string;
	fav_icon: string;
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
	site_name: '',
	isLoading: false,
	message: '',
	dialogOpen: false,
	footer_copyright: '',
	currency: '',
	site_logo: '',
	fav_icon: ''
};
export const addGeneralSlice = createSlice({
	name: 'addGeneral',
	initialState,
	reducers: {
		setFooter(state, action) {
			state.footer_copyright = action.payload as string;
		},
		setSiteName(state, action) {
			state.site_name = action.payload as string;
		},
		setCurrency(state, action) {
			state.currency = action.payload as string;
		},
		setSiteLogo(state, action) {
			state.site_logo = action.payload as string;
		},
		setFabIcon(state, action) {
			state.fav_icon = action.payload as string;
		},
		toggleGeneralDailog(state) {
			state.dialogOpen = !state.dialogOpen;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchGeneral.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchGeneral.fulfilled, (state, action) => {
			if (action.payload.data.length > 0) {
				state.id = action.payload.data[0].int_glcode;
				state.site_name = action.payload.data[0].site_name;
				state.footer_copyright = action.payload.data[0].footer_copyright;
				state.currency = action.payload.data[0].currency;
				state.site_logo = action.payload.data[0].site_logo;
				state.fav_icon = action.payload.data[0].fav_icon;
			}
			state.isFormValid = true;
			state.isLoading = false;
		});
		builder.addCase(fetchGeneral.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
		});
		builder.addCase(addGeneral.pending, (state) => {
			state.isLoading = true;
		});

		builder.addCase(addGeneral.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
		});
		builder.addCase(addGeneral.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
		});
		builder.addCase(updateGeneralById.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(updateGeneralById.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
		});
		builder.addCase(updateGeneralById.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
		});
	}
});
export const { setFooter, setCurrency, setSiteLogo, setFabIcon, toggleGeneralDailog, setSiteName } = addGeneralSlice.actions;
export const selectGeneralSlice = appSelector(({ addGeneral }: AppRootStateType) => addGeneral);

export type addGeneralType = typeof addGeneralSlice;
export default addGeneralSlice.reducer;
