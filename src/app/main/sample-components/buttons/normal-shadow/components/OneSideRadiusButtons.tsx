import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { OneSideRadiusButtonStyle } from '../configs/OneSideRadiusButtonStyle';

function OneSideRadiusButtons() {
	return (
		<EscButton
			size="large"
			variant="contained"
			className=" w-max   sm:flex "
			aria-label="Sign in"
			buttonStyle={OneSideRadiusButtonStyle}
		>
			2 Side Radius Button
		</EscButton>
	);
}
export default OneSideRadiusButtons;
