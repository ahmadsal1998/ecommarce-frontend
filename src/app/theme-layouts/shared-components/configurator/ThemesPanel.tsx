import EscScrollbars from '@esc/core/EscScrollbars';
import IconButton from '@mui/material/IconButton';
import EscSvgIcon from '@esc/core/EscSvgIcon';
import Typography from '@mui/material/Typography';
import EscThemeSelector from '@esc/core/EscThemeSelector/EscThemeSelector';
import { changeEscTheme } from '@esc/core/EscSettings/store/escSettingsSlice';
import { styled, useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { forwardRef } from 'react';
import Slide from '@mui/material/Slide';
import { useAppDispatch } from 'app/store/store';
import { SwipeableHandlers } from 'react-swipeable';
import themeOptions from 'app/configs/themeOptions';

const StyledDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialog-paper': {
		position: 'fixed',
		width: 380,
		maxWidth: '90vw',
		backgroundColor: theme.palette.background.paper,
		top: 0,
		height: '100%',
		minHeight: '100%',
		bottom: 0,
		right: 0,
		margin: 0,
		zIndex: 1000,
		borderRadius: 0
	}
}));

type TransitionProps = {
	children?: React.ReactElement;
};

const Transition = forwardRef((props: TransitionProps, ref) => {
	const { children, ...other } = props;

	const theme = useTheme();

	if (!children) {
		return null;
	}

	return (
		<Slide
			direction={theme.direction === 'ltr' ? 'left' : 'right'}
			ref={ref}
			{...other}
		>
			{children}
		</Slide>
	);
});

type ThemesPanelProps = {
	schemesHandlers: SwipeableHandlers;
	onClose: () => void;
	open: boolean;
};

function ThemesPanel(props: ThemesPanelProps) {
	const { schemesHandlers, onClose, open } = props;

	const dispatch = useAppDispatch();

	return (
		<StyledDialog
			TransitionComponent={Transition}
			aria-labelledby="schemes-panel"
			aria-describedby="schemes"
			open={open}
			onClose={onClose}
			BackdropProps={{ invisible: true }}
			classes={{
				paper: 'shadow-lg'
			}}
			{...schemesHandlers}
		>
			<EscScrollbars className="p-16 sm:p-32">
				<IconButton
					className="fixed top-0 z-10 ltr:right-0 rtl:left-0"
					onClick={onClose}
					size="large"
				>
					<EscSvgIcon>heroicons-outline:x</EscSvgIcon>
				</IconButton>

				<Typography
					className="mb-32"
					variant="h6"
				>
					Theme Color Options
				</Typography>

				<Typography
					className="mb-24 text-justify text-12 italic"
					color="text.secondary"
				>
					* Selected option will be applied to all layout elements (navbar, toolbar, etc.). You can also
					create your own theme options and color schemes.
				</Typography>

				<EscThemeSelector
					options={themeOptions}
					onSelect={(_theme) => {
						dispatch(changeEscTheme(_theme.section));
					}}
				/>
			</EscScrollbars>
		</StyledDialog>
	);
}

export default ThemesPanel;
