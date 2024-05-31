import { createTheme, getContrastRatio } from '@mui/material/styles';
import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from '@lodash';
import {
	defaultSettings,
	defaultThemeOptions,
	extendThemeWithMixins,
	getParsedQuerySettings,
	mustHaveThemeOptions
} from '@esc/default-settings';
import settingsConfig from 'app/configs/settingsConfig';
import themeLayoutConfigs from 'app/theme-layouts/themeLayoutConfigs';
import { resetUser, setUser, setUserSettings } from 'src/app/auth/user/store/userSlice';
import { darkPaletteText, lightPaletteText } from 'app/configs/themesConfig';
import { AppThunk, RootStateType } from 'app/store/types';
import { EscSettingsConfigType, EscThemesType, EscThemeType } from '@esc/core/EscSettings/EscSettings';
import { ThemeOptions } from '@mui/material/styles/createTheme';
import { PartialDeep } from 'type-fest';
import { appSelector } from 'app/store/store';
import { showMessage } from '@esc/core/EscMessage/store/escMessageSlice';

type AppRootStateType = RootStateType<settingsSliceType>;

export const changeEscTheme =
	(theme: EscThemesType): AppThunk<void> =>
	(dispatch, getState) => {
		const AppState = getState() as AppRootStateType;
		const settings = AppState.escSettings;

		const { navbar, footer, toolbar, main } = theme;

		const newSettings: EscSettingsConfigType = {
			...settings.current,
			theme: {
				main,
				navbar,
				toolbar,
				footer
			}
		};

		dispatch(setDefaultSettings(newSettings)).then(() => {
			dispatch(showMessage({ message: 'User theme selection saved with the api' }));
		});
	};

type layoutProps = {
	style: string;
	config: unknown;
};

/**
 * Gets the initial settings for the application.
 */
function getInitialSettings(): EscSettingsConfigType {
	const defaultLayoutStyle =
		settingsConfig.layout && settingsConfig.layout.style ? settingsConfig.layout.style : 'layout1';

	const layout: layoutProps = {
		style: defaultLayoutStyle,
		config: themeLayoutConfigs[defaultLayoutStyle].defaults
	};

	return _.merge({}, defaultSettings, { layout }, settingsConfig, getParsedQuerySettings());
}

/**
 * Generates the settings object by merging the default settings with the new settings.
 */
export function generateSettings(
	_defaultSettings: PartialDeep<EscSettingsConfigType>,
	_newSettings: EscSettingsConfigType
) {
	return _.merge(
		{},
		_defaultSettings,
		{ layout: { config: themeLayoutConfigs[_newSettings?.layout?.style]?.defaults } },
		_newSettings
	);
}

const initialSettings = getInitialSettings();

/**
 * The type definition for the initial state.
 */
type initialStateProps = {
	initial: EscSettingsConfigType;
	defaults: EscSettingsConfigType;
	current: EscSettingsConfigType;
};

/**
 * The initial state.
 */
const initialState: initialStateProps = {
	initial: initialSettings,
	defaults: _.merge({}, initialSettings),
	current: _.merge({}, initialSettings)
};

/**
 * Sets the default settings for the application.
 */
export const setDefaultSettings = createAsyncThunk(
	'escSettings/setDefaultSettings',
	async (val: PartialDeep<EscSettingsConfigType>, { dispatch, getState }) => {
		const AppState = getState() as AppRootStateType;

		const settings = AppState.escSettings;

		const defaults = generateSettings(settings.defaults, val as EscSettingsConfigType);

		dispatch(setUserSettings(defaults));

		return {
			...settings,
			defaults: _.merge({}, defaults),
			current: _.merge({}, defaults)
		};
	}
);

/**
 * The settings slice.
 */
export const escSettingsSlice = createSlice({
	name: 'escSettings',
	initialState,
	reducers: {
		setSettings: (state, action: PayloadAction<EscSettingsConfigType>) => {
			const current = generateSettings(state.defaults, action.payload);

			return {
				...state,
				current
			};
		},

		setInitialSettings: () => _.merge({}, initialState),
		resetSettings: (state) => ({
			...state,
			defaults: _.merge({}, state.defaults),
			current: _.merge({}, state.defaults)
		})
	},
	extraReducers: (builder) => {
		builder
			.addCase(setDefaultSettings.fulfilled, (state, action) => action.payload)
			.addCase(setUser.fulfilled, (state, action) => {
				const defaults = generateSettings(
					state.defaults,
					action.payload?.data?.settings as EscSettingsConfigType
				);
				return {
					...state,
					defaults: _.merge({}, defaults),
					current: _.merge({}, defaults)
				};
			})
			.addCase(resetUser.fulfilled, (state) => {
				return {
					...state,
					defaults: _.merge({}, initialSettings),
					current: _.merge({}, initialSettings)
				};
			});
	}
});

type directionType = 'ltr' | 'rtl';

const getDirection = appSelector((state: AppRootStateType) => state.escSettings.current.direction);
const getMainTheme = appSelector((state: AppRootStateType) => state.escSettings.current.theme.main);
const getNavbarTheme = appSelector((state: AppRootStateType) => state.escSettings.current.theme.navbar);
const getToolbarTheme = appSelector((state: AppRootStateType) => state.escSettings.current.theme.toolbar);
const getFooterTheme = appSelector((state: AppRootStateType) => state.escSettings.current.theme.footer);

/**
 * Generates the MUI theme object.
 */
function generateMuiTheme(theme: EscThemeType, direction: directionType) {
	const data = _.merge({}, defaultThemeOptions, theme, mustHaveThemeOptions) as ThemeOptions;

	return createTheme(
		_.merge({}, data, {
			mixins: extendThemeWithMixins(data),
			direction,
		} as ThemeOptions)
	);
}

/**
 * Selects the contrast theme based on the background color.
 */
export const selectContrastMainTheme = (bgColor: string) => {
	function isDark(color: string) {
		return getContrastRatio(color, '#ffffff') >= 3;
	}
	return isDark(bgColor) ? selectMainThemeDark : selectMainThemeLight;
};

/**
 * Changes the theme mode.
 */
function changeThemeMode(theme: EscThemeType, mode: 'dark' | 'light'): EscThemeType {
	const modes = {
		dark: {
			palette: {
				mode: 'dark',
				divider: 'rgba(241,245,249,.12)',
				background: {
					paper: '#1E2125',
					default: '#121212'
				},
				text: darkPaletteText
			}
		},
		light: {
			palette: {
				mode: 'light',
				divider: '#e2e8f0',
				background: {
					paper: '#FFFFFF',
					default: '#F7F7F7'
				},
				text: lightPaletteText
			}
		}
	};

	return _.merge({}, theme, modes[mode]);
}

export const selectMainTheme = createSelector([getMainTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction)
);

export const selectMainThemeDark = createSelector([getMainTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectMainThemeLight = createSelector([getMainTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectNavbarTheme = createSelector([getNavbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction)
);

export const selectNavbarThemeDark = createSelector([getNavbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectNavbarThemeLight = createSelector([getNavbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectToolbarTheme = createSelector([getToolbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction)
);

export const selectToolbarThemeDark = createSelector([getToolbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectToolbarThemeLight = createSelector([getToolbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectFooterTheme = createSelector([getFooterTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction)
);

export const selectFooterThemeDark = createSelector([getFooterTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectFooterThemeLight = createSelector([getFooterTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectEscCurrentSettings = appSelector((state: AppRootStateType) => state.escSettings.current);

export const selectEscCurrentLayoutConfig = appSelector(
	(state: AppRootStateType) => state.escSettings.current.layout.config
);

export const selectEscDefaultSettings = appSelector((state: AppRootStateType) => state.escSettings.defaults);

export const selectCustomScrollbarsEnabled = appSelector(
	(state: AppRootStateType) => state.escSettings.current.customScrollbars
);

// export const selectEseThemesSettings = (state: RootState) => state.EscSettings.themes;

export const { resetSettings, setInitialSettings, setSettings } = escSettingsSlice.actions;

export type settingsSliceType = typeof escSettingsSlice;

export default escSettingsSlice.reducer;
