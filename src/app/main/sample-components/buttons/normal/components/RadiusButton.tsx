import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { NormalRadiusButtonStyle } from '../configs/RadiusButtonStyle';

function RadiusButton() {
	return (
		<EscButton
			size="large"
			variant="contained"
			className=" w-max   sm:flex "
			aria-label="Sign in"
			buttonStyle={NormalRadiusButtonStyle}
		>
			Radius Button
		</EscButton>
	);
}
export default RadiusButton;
