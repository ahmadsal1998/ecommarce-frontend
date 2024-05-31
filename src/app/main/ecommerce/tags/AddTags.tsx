import EscPageSimple from '@esc/core/EscPageSimple';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import EscPageCarded from '@esc/core/EscPageCarded';
import withSlices from 'app/store/withSlices';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch } from 'app/store/store';
import { useSelector } from 'react-redux';
import React, { memo, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escDisabledButtonStyle, escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import {
	addTagsSlice,
	cleanForm,
	selectAddTagsSlice,
	setImagePicked,
	setName,
	tagDialogOpen,
	validateForm
} from '../stores/tags/AddTagsStore';
import { addTag, updateTagById } from '../respositories/tags/TagsRepo';
import { baseUrl } from '../respositories/urls';

const Root = styled(EscPageSimple)(({ theme }) => ({
	'& .EscPageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .EscPageSimple-content': {},
	'& .EscPageSimple-sidebarHeader': {},
	'& .EscPageSimple-sidebarContent': {}
}));

function AddTags() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [buttonText, setButtonText] = useState('Create');
	const tags = useSelector(selectAddTagsSlice);
	const [file, setFile] = useState<File | undefined>();
	const handleFile = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement & {
			files: FileList;
		};
		if (target.files.length > 0) {
			dispatch(setImagePicked(true));
		} else {
			dispatch(setImagePicked(false));
		}
		setFile(target.files[0]);
	};
	useEffect(() => {
		dispatch(validateForm());
	}, [tags.name, tags.imagePicked]);
	useEffect(() => {
		if (tags.isTagCreated) {
			setFile(undefined);
			dispatch(cleanForm());
			dispatch(setImagePicked(false));
		}
	}, [tags.isTagCreated]);

	useEffect(() => {
		if (!tags.forUpdate) {
			dispatch(cleanForm());
			
		} else {
			setButtonText('Update');
		}
		
	},[]);
	const handleClose = () => {
		dispatch(tagDialogOpen());
		navigate(-1);
	};
	const addTgs = () => {
		if (tags.isFormValid && !tags.isLoading) {
			if (tags.forUpdate) {
				dispatch(
					updateTagById({
						id: tags.tag.int_glcode,
						payload: { title: tags.name, file: file || '' }
					})
				);
			} else {
				dispatch(addTag({ payload: { title: tags.name, file } }));
			}
		}
	};
	return (
		<Root
			content={
				<div className=" w-full flex flex-col min-h-full">
					<div className="EscPageCarded-header container">
						<div className="flex  sm:flex-row flex-1 w-full items-end  justify-between space-y-8 sm:space-y-0 py-10 sm:py-24 px-24 md:px-24">
							<div className="grow">
								<Button
									size="large"
									onClick={() => navigate(-1)}
									startIcon={<ArrowBackIcon />}
								>
									Tags
								</Button>
								<Typography className="mt-10 text-2xl font-extrabold leading-tight tracking-tight ">
									{tags.forUpdate ? 'Tag details' : 'New Tag'}
								</Typography>
							</div>
							<div className="grow-0">
								<div className="flex  items-center ">
									{tags.isFormValid ? (
										<EscButton
											variant="contained"
											color="secondary"
											className=" w-min   "
											aria-label="Sign in"
											size="large"
											onClick={addTgs}
											buttonStyle={escGradientAndShadowButtonStyle}
										>
											{tags.isLoading ? <CircularProgress color="inherit" /> : buttonText}
										</EscButton>
									) : (
										<EscButton
											variant="contained"
											className=" w-min   "
											aria-label="Sign in"
											size="large"
											buttonStyle={escDisabledButtonStyle}
										>
											{tags.forUpdate ? 'Update' : 'Create'}
										</EscButton>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="flex grow min-h-max">
						<EscPageCarded
							content={
								<Box
									sx={{
										flexGrow: 0,
										padding: '1.5rem 1rem 1rem 0'
									}}
								>
									<div className="pt-10 sm:p-24 max-w-3xl m-10">
										<TextField
											id="outlined-basic"
											label="Name"
											value={tags.name}
											error={tags.error_name !== ''}
											helperText={tags.error_name}
											onChange={(e) => {
												dispatch(setName(e.target.value));
											}}
											fullWidth
											className="mt-20"
											required
											inputProps={{ maxLength: 100 }}
											variant="outlined"
										/>
										<Button
											variant="contained"
											component="label"
											fullWidth
											sx={{ minHeight: 170, maxWidth: 170 }}
											className="min-h-100 mt-20"
										>
											<div>
												{tags.forUpdate &&
												tags.tag &&
												tags.tag.var_icon !== '' &&
												file === undefined ? (
													<div>
														<img
															src={`${baseUrl}/images/${tags.tag.var_icon}`}
															alt=""
															style={{ height: '160px' }}
														/>
														<input
															type="file"
															accept="image/*"
															hidden
															multiple={false}
															onInput={handleFile}
														/>
													</div>
												) : (
													<div>
														{file === undefined ? <FileDownloadOutlinedIcon /> : null}
														{file === undefined ? 'Tag image' : ''}
														{file === undefined ? null : (
															<img
																src={URL.createObjectURL(file)}
																alt=""
																style={{ height: '160px' }}
															/>
														)}
														<input
															type="file"
															accept="image/*"
															hidden
															multiple={false}
															onInput={handleFile}
														/>
													</div>
												)}
											</div>
										</Button>
									</div>
								</Box>
							}
						/>
					</div>
					<Dialog
						open={tags.dialogOpen}
						onClose={handleClose}
					>
						<DialogContent>
							<DialogContentText>
								<Box sx={{ width: '250px', fontSize: 16, color: 'black' }}>{tags.message}</Box>
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose}>OK</Button>
						</DialogActions>
					</Dialog>
				</div>
			}
		/>
	);
}
export default withSlices([addTagsSlice])(memo(AddTags));
