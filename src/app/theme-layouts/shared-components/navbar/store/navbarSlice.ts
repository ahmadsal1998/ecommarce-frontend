import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { EscNavItemType } from '@esc/core/EscNavigation/types/EscNavItemType';

type AppRootStateType = RootStateType<navbarSliceType>;

/**
 * The type definition for the initial state of the navbar slice.
 */
type initialStateProps = {
	open: boolean;
	mobileOpen: boolean;
	foldedOpen: boolean;
	navItem: EscNavItemType;
	navItemIsChanging: boolean;
	closeMobilePopupMenu : boolean;
};

/**
 * The initial state of the navbar slice.
 */
const initialState: initialStateProps = {
	open: true,
	mobileOpen: false,
	foldedOpen: false,
	navItem: null,
	navItemIsChanging: false,
	closeMobilePopupMenu: false

};

/**
 * The navbar slice.
 */
export const navbarSlice = createSlice({
	name: 'navbar',
	initialState,
	reducers: {
		navbarToggleFolded: (state) => {
			state.foldedOpen = !state.foldedOpen;
		},
		navbarOpenFolded: (state) => {
			state.foldedOpen = true;
		},
		setMobilePopupMenu(state, action){
			state.closeMobilePopupMenu =action.payload as boolean;
			
		},
		navbarCloseFolded: (state) => {
			state.foldedOpen = false;
		},
		setNavItem: (state, action) => {
			state.navItemIsChanging = true;
			state.navItem = action.payload;
			state.navItemIsChanging = false;
		},
		navbarToggleMobile: (state) => {
			state.mobileOpen = !state.mobileOpen;
		},
		navbarOpenMobile: (state) => {
			state.mobileOpen = true;
		},
		navbarCloseMobile: (state) => {
			state.mobileOpen = false;
		},
		navbarClose: (state) => {
			state.open = false;
		},
		navbarOpen: (state) => {
			state.open = true;
		},
		navbarToggle: (state) => {
			state.open = !state.open;
		}
	}
});

export const {
	navbarToggleFolded,
	navbarOpenFolded,
	navbarCloseFolded,
	navbarOpen,
	setNavItem,
	navbarClose,
	navbarToggle,
	navbarOpenMobile,
	navbarCloseMobile,
	navbarToggleMobile,
	setMobilePopupMenu
} = navbarSlice.actions;

export const selectEscNavbar = appSelector(({ navbar }: AppRootStateType) => navbar);

export type navbarSliceType = typeof navbarSlice;

export default navbarSlice.reducer;
