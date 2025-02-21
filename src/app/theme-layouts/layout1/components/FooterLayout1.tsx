import AppBar from '@mui/material/AppBar';
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectFooterTheme } from '@esc/core/EscSettings/store/escSettingsSlice';
import clsx from 'clsx';

type FooterLayout1Props = { className?: string };

/**
 * The footer layout 1.
 */
function FooterLayout1(props: FooterLayout1Props) {
	const { className } = props;

	const footerTheme = useSelector(selectFooterTheme);

	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar
				id="esc-footer"
				className={clsx('relative z-20 shadow', className)}
				color="default"
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === 'light'
							? footerTheme.palette.background.paper
							: footerTheme.palette.background.default
				}}
				elevation={0}
			>
				<Toolbar className="min-h-48 md:min-h-64 px-8 sm:px-12 py-0 flex items-center overflow-x-auto">
					Footer
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default memo(FooterLayout1);
