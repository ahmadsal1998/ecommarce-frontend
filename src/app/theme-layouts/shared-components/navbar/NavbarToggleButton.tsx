import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'app/store/store';
import { selectEscCurrentSettings, setDefaultSettings } from '@esc/core/EscSettings/store/escSettingsSlice';
import _ from '@lodash';
import useThemeMediaQuery from '@esc/hooks/useThemeMediaQuery';
import EscSvgIcon from '@esc/core/EscSvgIcon';
import { EscSettingsConfigType } from '@esc/core/EscSettings/EscSettings';
import { useSelector } from 'react-redux';
import { navbarToggle, navbarToggleMobile } from './store/navbarSlice';

type NavbarToggleButtonProps = {
	className?: string;
	children?: React.ReactNode;
};

/**
 * The navbar toggle button.
 */
function NavbarToggleButton(props: NavbarToggleButtonProps) {
	const {
		className = '',
		children = (
			<EscSvgIcon
				size={20}
				color="action"
			>
				heroicons-outline:view-list
			</EscSvgIcon>
		)
	} = props;

	const dispatch = useAppDispatch();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const settings: EscSettingsConfigType = useSelector(selectEscCurrentSettings);
	const { config } = settings.layout;

	return (
		<IconButton
			className={className}
			color="inherit"
			size="small"
			onClick={() => {
				if (isMobile) {
					dispatch(navbarToggleMobile());
				} else if (config?.navbar?.style === 'style-2') {
					dispatch(
						setDefaultSettings(
							_.set({}, 'layout.config.navbar.folded', !settings?.layout?.config?.navbar?.folded)
						)
					);
				} else {
					dispatch(navbarToggle());
				}
			}}
		>
			{children}
		</IconButton>
	);
}

export default NavbarToggleButton;
