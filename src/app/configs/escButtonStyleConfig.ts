import { EscButtonConfigProps } from '@esc/components/buttons/EscButtonConfigProps';

export const escWarningButtonStyle: EscButtonConfigProps = {
	backgroundColor: 'red',
	radius: '40',
	border: '0',
	focusBoxSadow: 'none',
	boxSadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
	textColor: '#fff',
	padding: '0 20'
};
export const escGradientAndShadowButtonStyle: EscButtonConfigProps = {
	radius: '40',
	backgroundColor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
	boxSadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
	textColor: '#fff',
	border: '0',
	focusBoxSadow: 'none',
	padding: '0 20'
};

export const escDisabledButtonStyle: EscButtonConfigProps = {
	radius: '40',
	backgroundColor: 'gray',
	boxSadow: 'none',
	focusBoxSadow: 'none',
	textColor: '#fff',
	border: '0',
	padding: '0 20'
};

export const escOutlineAndShadowButtonStyle: EscButtonConfigProps = {
	radius: '40',
	border: '1px solid #FF8E53',
	focusBoxSadow: 'none',
	backgroundColor: 'white',
	boxSadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
	textColor: '#FF8E53',
	padding: '0 20'
};
