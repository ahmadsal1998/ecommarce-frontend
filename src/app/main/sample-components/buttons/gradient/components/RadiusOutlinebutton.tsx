import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { RadiusOutlineButtonStyle } from '../configs/RadiusOutlilneButtonStyle';

function RadiusOutlineButton() {
	return (
		<EscButton
			size="large"
			variant="contained"
			className=" w-max   sm:flex m-5"
			aria-label="Sign in"
			buttonStyle={RadiusOutlineButtonStyle}
		>
			Outline Radius Button
		</EscButton>
	);
}
export default RadiusOutlineButton;
