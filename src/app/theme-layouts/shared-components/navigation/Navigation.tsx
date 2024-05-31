import EscNavigation from '@esc/core/EscNavigation';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { useAppDispatch } from 'app/store/store';
import useThemeMediaQuery from '@esc/hooks/useThemeMediaQuery';
import { EscNavigationProps } from '@esc/core/EscNavigation/EscNavigation';
import { useSelector } from 'react-redux';
import withSlices from 'app/store/withSlices';
import { navigationSlice, selectNavigation } from './store/navigationSlice';
import { navbarCloseMobile } from '../navbar/store/navbarSlice';
import { changePasswordSlice } from './store/chagePasswordSlice';

/**
 * Navigation
 */

type NavigationProps = Partial<EscNavigationProps>;

function Navigation(props: NavigationProps) {
	const { className = '', layout = 'vertical', dense, active } = props;

	const navigation = useSelector(selectNavigation);

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const dispatch = useAppDispatch();

	return useMemo(() => {
		function handleItemClick() {
			if (isMobile) {
				dispatch(navbarCloseMobile());
			}
		}

		return (
			<EscNavigation
				className={clsx('navigation flex-1', className)}
				navigation={navigation}
				layout={layout}
				dense={dense}
				active={active}
				onItemClick={handleItemClick}
				checkPermission
			/>
			
		);
	}, [dispatch, isMobile, navigation, active, className, dense, layout]);
}

export default withSlices<NavigationProps>([navigationSlice, changePasswordSlice])(Navigation);
