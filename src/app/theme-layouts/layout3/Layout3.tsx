import EscDialog from '@esc/core/EscDialog';
import { styled } from '@mui/material/styles';
import EscMessage from '@esc/core/EscMessage';
import EscSuspense from '@esc/core/EscSuspense';
import clsx from 'clsx';
import { memo, ReactNode, Suspense, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import AppContext from 'app/AppContext';
import { selectEscCurrentLayoutConfig } from '@esc/core/EscSettings/store/escSettingsSlice';
import Configurator from 'app/theme-layouts/shared-components/configurator/Configurator';
import FooterLayout3 from './components/FooterLayout3';
import LeftSideLayout3 from './components/LeftSideLayout3';
import NavbarWrapperLayout3 from './components/NavbarWrapperLayout3';
import RightSideLayout3 from './components/RightSideLayout3';
import ToolbarLayout3 from './components/ToolbarLayout3';
import { Layout3ConfigDefaultsType } from './Layout3Config';

const Root = styled('div')<{ config: Layout3ConfigDefaultsType }>(({ config }) => ({
	...(config.mode === 'boxed' && {
		clipPath: 'inset(0)',
		maxWidth: `${config.containerWidth}px`,
		margin: '0 auto',
		boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
	}),
	...(config.mode === 'container' && {
		'& .container': {
			maxWidth: `${config.containerWidth}px`,
			width: '100%',
			margin: '0 auto'
		}
	})
}));

type Layout3Props = {
	children?: ReactNode;
};

/**
 * The layout 3.
 */
function Layout3(props: Layout3Props) {
	const { children } = props;

	const config = useSelector(selectEscCurrentLayoutConfig) as Layout3ConfigDefaultsType;

	const appContext = useContext(AppContext);

	const { routes } = appContext;

	return (
		<Root
			id="esc-settings-presets"
			className="flex w-full"
			config={config}
		>
			{config.leftSidePanel.display && <LeftSideLayout3 />}

			<div className="flex min-w-0 flex-auto flex-col">
				<main
					id="esc-main"
					className="relative flex min-h-full min-w-0 flex-auto flex-col"
				>
					{config.navbar.display && (
						<NavbarWrapperLayout3
							className={clsx(config?.navbar?.style === 'fixed' ? 'sticky top-0 z-50' : '')}
						/>
					)}

					{config.toolbar.display && (
						<ToolbarLayout3
							className={clsx(
								config.toolbar.style === 'fixed' && 'sticky top-0',
								config.toolbar.position === 'above' && 'z-40 order-first'
							)}
						/>
					)}

					<div className="sticky top-0 z-99">
						<Configurator />
					</div>

					<div className="relative z-10 flex min-h-0 flex-auto flex-col">
						<EscSuspense>{useRoutes(routes)}</EscSuspense>

						<Suspense>
							<EscDialog />
						</Suspense>
						{children}
					</div>

					{config.footer.display && (
						<FooterLayout3 className={config.footer.style === 'fixed' ? 'sticky bottom-0' : ''} />
					)}
				</main>
			</div>

			{config.rightSidePanel.display && <RightSideLayout3 />}
			<EscMessage />
		</Root>
	);
}

export default memo(Layout3);
