import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { EscButtonProps } from '../EscButtonsProps';

const EscButton = styled(Button)<ButtonProps & EscButtonProps>((props) => ({
	background: props.buttonStyle.backgroundColor,
	borderRadius: props.buttonStyle.radius,
	border: props.buttonStyle.border,
	'&:hover': {
		backgroundColor: props.buttonStyle.backgroundColor,
		boxShadow: props.buttonStyle.focusBoxSadow
	},
	'&:focus': {
		backgroundColor: props.buttonStyle.backgroundColor,
		boxShadow: props.buttonStyle.focusBoxSadow
	},
	color: props.buttonStyle.textColor, // #00000
	padding: props.buttonStyle.padding, // 5
	height: 40,
	boxShadow: props.buttonStyle.boxSadow // '0 3px 5px 2px rgba(255, 105, 135, .3)' or put '' empty string for without sadow,
}));
export default EscButton;
