import { useDeepCompareEffect } from '@esc/hooks';
import _ from '@lodash';
import AppContext from 'app/AppContext';
import {
	generateSettings,
	selectEscCurrentSettings,
	selectEscDefaultSettings,
	setSettings,
	escSettingsSlice
} from '@esc/core/EscSettings/store/escSettingsSlice';
import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { useAppDispatch } from 'app/store/store';
import { matchRoutes, useLocation, RouteMatch, RouteObject } from 'react-router-dom';
import { EscSettingsConfigType } from '@esc/core/EscSettings/EscSettings';
import { themeLayoutsType } from 'app/theme-layouts/themeLayouts';
import { PartialDeep } from 'type-fest';
import { useSelector } from 'react-redux';
import withSlices from 'app/store/withSlices';
import EscLoading from '../EscLoading';

export type EscRouteObjectType = RouteObject & {
	settings?: EscSettingsConfigType;
};

export type EscRouteMatchType = RouteMatch & {
	route: EscRouteObjectType;
};

type EscLayoutProps = {
	layouts: themeLayoutsType;
	children?: React.ReactNode;
};

/**
 * EscLayout
 * React frontend component in a React project that is used for layouting the user interface. The component
 * handles generating user interface settings related to current routes, merged with default settings, and uses
 * the new settings to generate layouts.
 */
function EscLayout(props: EscLayoutProps) {
	const { layouts, children } = props;
	const dispatch = useAppDispatch();
	const settings = useSelector(selectEscCurrentSettings);
	const defaultSettings = useSelector(selectEscDefaultSettings);

	const layoutStyle = settings.layout.style;

	const appContext = useContext(AppContext);
	const { routes } = appContext;

	const location = useLocation();
	const { pathname } = location;

	const matchedRoutes = matchRoutes(routes, pathname) as EscRouteMatchType[] | null;

	const matched = matchedRoutes?.[0] || false;

	const newSettings = useRef<PartialDeep<EscSettingsConfigType>>(settings);

	const shouldAwaitRender = useCallback(() => {
		let _newSettings: EscSettingsConfigType;

		/**
		 * On Path changed
		 */
		// if (prevPathname !== pathname) {
		if (typeof matched !== 'boolean') {
			/**
			 * if matched route has settings
			 */

			const routeSettings = matched.route.settings;

			_newSettings = generateSettings(defaultSettings, routeSettings);
		} else if (!_.isEqual(newSettings.current, defaultSettings)) {
			/**
			 * Reset to default settings on the new path
			 */
			_newSettings = _.merge({}, defaultSettings);
		} else {
			_newSettings = newSettings.current as EscSettingsConfigType;
		}

		if (!_.isEqual(newSettings.current, _newSettings)) {
			newSettings.current = _newSettings;
		}
	}, [defaultSettings, matched]);

	shouldAwaitRender();

	const currentSettings = useMemo(() => newSettings.current, [newSettings.current]);

	useDeepCompareEffect(() => {
		if (!_.isEqual(currentSettings, settings)) {
			dispatch(setSettings(currentSettings as EscSettingsConfigType));
		}
	}, [dispatch, currentSettings, settings]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return useMemo(() => {
		if (!_.isEqual(currentSettings, settings)) {
			return <EscLoading />;
		}

		return Object.entries(layouts).map(([key, Layout]) => {
			if (key === layoutStyle) {
				return (
					<React.Fragment key={key}>
						<Layout>{children}</Layout>
					</React.Fragment>
				);
			}

			return null;
		});
	}, [layouts, layoutStyle, children, currentSettings, settings]);
}

export default withSlices<EscLayoutProps>([escSettingsSlice])(EscLayout);
