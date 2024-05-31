import EscScrollbars from '@esc/core/EscScrollbars';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { memo } from 'react';
import Navigation from 'app/theme-layouts/shared-components/navigation/Navigation';
import NavbarToggleButton from 'app/theme-layouts/shared-components/navbar/NavbarToggleButton';
import { selectEscNavbar } from 'app/theme-layouts/shared-components/navbar/store/navbarSlice';
import { selectEscCurrentLayoutConfig } from '@esc/core/EscSettings/store/escSettingsSlice';
import { Layout1ConfigDefaultsType } from 'app/theme-layouts/layout1/Layout1Config';
;


const Root = styled('div')(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.primary,
	'& ::-webkit-scrollbar-thumb': {
		boxShadow: `inset 0 0 0 20px ${
			theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.24)' : 'rgba(255, 255, 255, 0.24)'
		}`
	},
	'& ::-webkit-scrollbar-thumb:active': {
		boxShadow: `inset 0 0 0 20px ${
			theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.37)' : 'rgba(255, 255, 255, 0.37)'
		}`
	}
}));

const StyledContent = styled(EscScrollbars)(() => ({
	overscrollBehavior: 'contain',
	overflowX: 'hidden',
	overflowY: 'auto',
	WebkitOverflowScrolling: 'touch',
	backgroundRepeat: 'no-repeat',
	backgroundSize: '100% 40px, 100% 10px',
	backgroundAttachment: 'local, scroll'
}));

type NavbarStyle1ContentProps = {
	className?: string;
};

/**
 * The navbar style 1 content.
 */
function NavbarStyle1Content(props: NavbarStyle1ContentProps) {
	const { className = '' } = props;
	const config = useSelector(selectEscCurrentLayoutConfig) as Layout1ConfigDefaultsType;
	const navbar = useSelector(selectEscNavbar);
	return (
		<Root className={clsx('flex h-full flex-auto flex-col overflow-hidden', className)}>
			<div className="flex h-48 shrink-0 flex-row items-center px-20 md:h-72">
			<div className="mx-4 flex flex-1">
				{navbar.open?<img width='128' src={`/assets/images/logo/logo.png`} alt='logo'/>:null}
			</div>
			
			
				
			<NavbarToggleButton className={!navbar.open?'h-40 w-40 p-0 mr-10':'h-40 w-40 p-0' }/>
							
			</div>

			<StyledContent
				className="flex min-h-0 flex-1 flex-col"
				option={{ suppressScrollX: true, wheelPropagation: false }}
			>
				<Navigation layout="vertical" />

				
			</StyledContent>
		</Root>
	);
}

export default memo(NavbarStyle1Content);
