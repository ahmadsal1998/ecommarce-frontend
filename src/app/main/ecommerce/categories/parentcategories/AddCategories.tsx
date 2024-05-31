import EscPageSimple from '@esc/core/EscPageSimple';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import EscPageCarded from '@esc/core/EscPageCarded';
import CircularProgress from '@mui/material/CircularProgress';
import withSlices from 'app/store/withSlices';
import Box from '@mui/material/Box';
import { useAppDispatch } from 'app/store/store';
import { useSelector } from 'react-redux';
import React, { memo, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { escDisabledButtonStyle, escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {
	addCategorySlice,
	selectAddCategorySlice,
	setName,
	validateForm,
	setImagePicked,
	cleanForm,
	userDialogOpen
} from '../../stores/categories/AddCategoryStore';
import { addCategory, updateCategoryById } from '../../respositories/categories/CategoriesRepo';
import { baseUrl } from '../../respositories/urls';

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

function AddCategory() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [buttonText, setButtonText] = useState('Create');
	const category = useSelector(selectAddCategorySlice);
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
	}, [category.name, category.imagePicked]);
	const addCat = () => {
		if (category.isFormValid && !category.isLoading) {
			if (category.forUpdate) {
				dispatch(
					updateCategoryById({
						id: category.category.int_glcode,
						payload: { title: category.name, file: file || '' }
					})
				);
			} else {
				dispatch(addCategory({ payload: { title: category.name, file } }));
			}
		}
	};
	const handleClose = () => {
		dispatch(userDialogOpen());
		navigate(-1);
	};
	useEffect(() => {
		if (category.isCategoryCreated) {
			setFile(undefined);
			dispatch(cleanForm());
			dispatch(setImagePicked(false));
		}
	}, [category.isCategoryCreated]);
	useEffect(() => {
		if (category.forUpdate) {
			setButtonText('Update');
		} else {
			dispatch(cleanForm());
		}
	}, []);
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
									Categories
								</Button>
								<Typography className="mt-10 text-2xl font-extrabold leading-tight tracking-tight ">
									{category.forUpdate ? 'Update Category' : 'New Category'}
								</Typography>
							</div>
							<div className="grow-0">
								<div className="flex  items-center ">
									{category.isFormValid ? (
										<EscButton
											variant="contained"
											color="secondary"
											className=" w-min   "
											aria-label="Sign in"
											size="large"
											onClick={addCat}
											buttonStyle={escGradientAndShadowButtonStyle}
										>
											{category.isLoading ? <CircularProgress color="inherit" /> : buttonText}
										</EscButton>
									) : (
										<EscButton
											buttonStyle={escDisabledButtonStyle}
											variant="contained"
											className=" w-min   "
											onClick={addCat}
											aria-label="Sign in"
											size="large"
										>
											{category.forUpdate ? 'Update' : 'Create'}
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
											value={category.name}
											error={category.error_name !== ''}
											helperText={category.error_name}
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
												{category.forUpdate &&
												category.category &&
												category.category.var_icon !== '' &&
												file === undefined ? (
													<div>
														<img
															src={`${baseUrl}/images/${category.category.var_icon}`}
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
														{file === undefined ? 'Category Image' : ''}
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
						open={category.dialogOpen}
						onClose={handleClose}
					>
						<DialogContent>
							<DialogContentText>
								<Box sx={{ width: '250px' }}>{category.message}</Box>
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
export default withSlices([addCategorySlice])(memo(AddCategory));
