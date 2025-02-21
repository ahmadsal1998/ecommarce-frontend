import EscLayout from '@esc/core/EscLayout';
import EscTheme from '@esc/core/EscTheme';
import { SnackbarProvider } from 'notistack';
import { useSelector } from 'react-redux';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache, { Options } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { selectCurrentLanguageDirection } from 'app/store/i18nSlice';
import themeLayouts from 'app/theme-layouts/themeLayouts';
import { selectMainTheme } from '@esc/core/EscSettings/store/escSettingsSlice';
import MockAdapterProvider from '@mock-api/MockAdapterProvider';

import withAppProviders from './withAppProviders';

import { AuthRouteProvider } from './auth/AuthRouteProvider';
// import axios from 'axios';
/**
 * Axios HTTP Request defaults
 */
// axios.defaults.baseURL = "";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';


const emotionCacheOptions = {
	rtl: {
		key: 'muirtl',
		stylisPlugins: [rtlPlugin],
		insertionPoint: document.getElementById('emotion-insertion-point')
	},
	ltr: {
		key: 'muiltr',
		stylisPlugins: [],
		insertionPoint: document.getElementById('emotion-insertion-point')
	}
};

/**
 * The main App component.
 */
function App() {
	/**
	 * The language direction from the Redux store.
	 */
	const langDirection = useSelector(selectCurrentLanguageDirection);

	/**
	 * The main theme from the Redux store.
	 */
	const mainTheme = useSelector(selectMainTheme);

	return (
		<MockAdapterProvider>
			<CacheProvider value={createCache(emotionCacheOptions[langDirection] as Options)}>
				<EscTheme
					theme={mainTheme}
					direction={langDirection}
				>
					<AuthRouteProvider>
						<SnackbarProvider
							maxSnack={5}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right'
							}}
							classes={{
								containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99'
							}}
						>
							<EscLayout layouts={themeLayouts} />
						</SnackbarProvider>
					</AuthRouteProvider>
				</EscTheme>
			</CacheProvider>
		</MockAdapterProvider>
	);
}

export default withAppProviders(App);
