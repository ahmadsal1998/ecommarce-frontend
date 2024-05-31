import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { OutlineButtonStyle } from '../configs/OutlineButtonStyle';

function OutlineButton() {
	return (
		<EscButton
			size="large"
			variant="contained"
			className=" w-max   sm:flex "
			aria-label="Sign in"
			buttonStyle={OutlineButtonStyle}
		>
			Outline Button
		</EscButton>
	);
}
export default OutlineButton;
