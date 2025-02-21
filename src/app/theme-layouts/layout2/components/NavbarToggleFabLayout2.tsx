import { useAppDispatch } from 'app/store/store';
import useThemeMediaQuery from '@esc/hooks/useThemeMediaQuery';
import NavbarToggleFab from 'app/theme-layouts/shared-components/navbar/NavbarToggleFab';
import { navbarToggle, navbarToggleMobile } from 'app/theme-layouts/shared-components/navbar/store/navbarSlice';

type NavbarToggleFabLayout2Props = {
	className?: string;
};

/**
 * The navbar toggle fab layout 2.
 */
function NavbarToggleFabLayout2(props: NavbarToggleFabLayout2Props) {
	const { className } = props;

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const dispatch = useAppDispatch();

	return (
		<NavbarToggleFab
			className={className}
			onClick={() => {
				dispatch(isMobile ? navbarToggleMobile() : navbarToggle());
			}}
		/>
	);
}

export default NavbarToggleFabLayout2;
