import { memo, useEffect } from 'react';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { Editor } from 'react-draft-wysiwyg';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import { useAppDispatch } from 'app/store/store';
import Dialog from '@mui/material/Dialog';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import Box from '@mui/material/Box';
import withSlices from 'app/store/withSlices';
import { ContentState, convertToRaw } from 'draft-js';
import CircularProgress from '@mui/material/CircularProgress';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { useSelector } from 'react-redux';
import {
	addPolicySlice,
	selectPolicySlice,
	setPrivacyPolicy,
	setReturnPolicy,
	setShipingpolicy,
	setTernAndCondition,
	togglePolicyDailog
} from '../../stores/settings/PolicyState';
import { addPolicy, fetchPolicy, updatePolicyById } from '../../respositories/settings/PolicyRepo';

function PolicyManagement() {
	const dispatch = useAppDispatch();
	const policy = useSelector(selectPolicySlice);
	const handleClose = () => {
		dispatch(togglePolicyDailog());
	};
	const addcnts = () => {
		if (!policy.isLoading) {
			if (policy.id !== '') {
				dispatch(
					updatePolicyById({
						id: policy.id,
						payload: {
							tern_and_condition: policy.tern_and_condition,
							shiping_policy: policy.shiping_policy,
							privacy_policy: policy.privacy_policy,
							return_policy: policy.return_policy
						}
					})
				);
			} else {
				dispatch(
					addPolicy({
						payload: {
							tern_and_condition: policy.tern_and_condition,
							shiping_policy: policy.shiping_policy,
							privacy_policy: policy.privacy_policy,
							return_policy: policy.return_policy
						}
					})
				);
			}
		}
	};
	useEffect(() => {
		dispatch(fetchPolicy({}));
	}, []);
	return (
		<div className="pt-10 sm:p-24 max-w-3xl m-10">
			<p className="mt-20"> Terms & Condition</p>
			{!policy.isLoading ? (
				<Editor
					toolbarClassName="toolbarClassName"
					defaultContentState={convertToRaw(
						// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
						ContentState.createFromBlockArray(htmlToDraft(policy.tern_and_condition).contentBlocks)
					)}
					onContentStateChange={(e) => dispatch(setTernAndCondition(draftToHtml(e)))}
					wrapperClassName="wrapperClassName border-1 border-gray-400 mt-10 rounded p-5"
					editorClassName="editorClassName"
				/>
			) : null}

			<p className="mt-20"> Shipping Policy</p>
			{!policy.isLoading ? (
				<Editor
					toolbarClassName="toolbarClassName"
					defaultContentState={convertToRaw(
						// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
						ContentState.createFromBlockArray(htmlToDraft(policy.shiping_policy).contentBlocks)
					)}
					onContentStateChange={(e) => dispatch(setShipingpolicy(draftToHtml(e)))}
					wrapperClassName="wrapperClassName border-1 border-gray-400 mt-10 rounded p-5"
					editorClassName="editorClassName"
				/>
			) : null}

			<p className="mt-20"> Privacy Policy</p>
			{!policy.isLoading ? (
				<Editor
					toolbarClassName="toolbarClassName"
					defaultContentState={convertToRaw(
						// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
						ContentState.createFromBlockArray(htmlToDraft(policy.privacy_policy).contentBlocks)
					)}
					onContentStateChange={(e) => dispatch(setPrivacyPolicy(draftToHtml(e)))}
					wrapperClassName="wrapperClassName border-1 border-gray-400 mt-10 rounded p-5"
					editorClassName="editorClassName"
				/>
			) : null}

			<p className="mt-20"> Return Policy</p>
			{!policy.isLoading ? (
				<Editor
					toolbarClassName="toolbarClassName"
					defaultContentState={convertToRaw(
						// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
						ContentState.createFromBlockArray(htmlToDraft(policy.return_policy).contentBlocks)
					)}
					onContentStateChange={(e) => dispatch(setReturnPolicy(draftToHtml(e)))}
					wrapperClassName="wrapperClassName border-1 border-gray-400 mt-10 rounded p-5"
					editorClassName="editorClassName"
				/>
			) : null}

			<div className="w-full">
				<EscButton
					variant="contained"
					color="secondary"
					className=" mt-20  "
					aria-label="Sign in"
					size="large"
					onClick={addcnts}
					buttonStyle={escGradientAndShadowButtonStyle}
					startIcon={<SaveIcon />}
				>
					{policy.isLoading ? <CircularProgress color="inherit" /> : 'save'}
				</EscButton>
			</div>
			<Dialog
				open={policy.dialogOpen}
				onClose={handleClose}
			>
				<DialogContent>
					<DialogContentText>
						<Box sx={{ width: '250px', fontSize: 16 }}>{policy.message}</Box>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>OK</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default  withSlices([addPolicySlice])(memo(PolicyManagement));
