import Button from '@mui/material/Button';
import clsx from 'clsx';
import EscSvgIcon from '@esc/core/EscSvgIcon';

type PurchaseButtonProps = {
	className?: string;
};

/**
 * The purchase button.
 */
function PurchaseButton(props: PurchaseButtonProps) {
	const { className = '' } = props;

	return (
		<Button
			component="a"
			href=""
			target="_blank"
			rel="noreferrer noopener"
			role="button"
			className={clsx('', className)}
			variant="contained"
			color="secondary"
			startIcon={<EscSvgIcon size={16}>heroicons-outline:shopping-cart</EscSvgIcon>}
		>
			Purchase esc React
		</Button>
	);
}

export default PurchaseButton;
