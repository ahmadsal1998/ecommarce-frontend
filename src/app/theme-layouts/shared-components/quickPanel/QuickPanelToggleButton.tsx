import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'app/store/store';
import EscSvgIcon from '@esc/core/EscSvgIcon';
import { toggleQuickPanel } from './store/stateSlice';

type QuickPanelToggleButtonProps = {
	children?: React.ReactNode;
};

/**
 * The quick panel toggle button.
 */
function QuickPanelToggleButton(props: QuickPanelToggleButtonProps) {
	const { children = <EscSvgIcon>heroicons-outline:bookmark</EscSvgIcon> } = props;
	const dispatch = useAppDispatch();

	return (
		<IconButton
			className="h-40 w-40"
			onClick={() => dispatch(toggleQuickPanel())}
			size="large"
		>
			{children}
		</IconButton>
	);
}

export default QuickPanelToggleButton;
