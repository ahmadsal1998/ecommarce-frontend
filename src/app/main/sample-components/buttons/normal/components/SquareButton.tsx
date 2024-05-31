import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { NormalSqaureButtonStyle } from '../configs/SquareButtonStyle';

function SquareButton() {
	return (
		<EscButton
			size="large"
			variant="contained"
			className=" w-max   sm:flex "
			aria-label="Sign in"
			buttonStyle={NormalSqaureButtonStyle}
		>
			Square Button
		</EscButton>
	);
}
export default SquareButton;
