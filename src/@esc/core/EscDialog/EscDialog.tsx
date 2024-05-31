import Dialog from '@mui/material/Dialog';
import { useAppDispatch } from 'app/store/store';
import { useSelector } from 'react-redux';
import withSlices from 'app/store/withSlices';
import { closeDialog, escDialogSlice, selectEscDialogProps } from '@esc/core/EscDialog/store/escDialogSlice';

/**
 * EscDialog component
 * This component renders a material UI ```Dialog``` component
 * with properties pulled from the redux store
 */
function EscDialog() {
	const dispatch = useAppDispatch();
	const options = useSelector(selectEscDialogProps);

	return (
		<Dialog
			onClose={() => dispatch(closeDialog())}
			aria-labelledby="esc-dialog-title"
			classes={{
				paper: 'rounded-8'
			}}
			{...options}
		/>
	);
}

export default withSlices([escDialogSlice])(EscDialog);
