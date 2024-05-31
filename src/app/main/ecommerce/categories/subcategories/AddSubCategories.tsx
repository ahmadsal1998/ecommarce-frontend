import EscPageSimple from '@esc/core/EscPageSimple';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import EscPageCarded from '@esc/core/EscPageCarded';
import withSlices from 'app/store/withSlices';
import Box from '@mui/material/Box';
import { useAppDispatch } from 'app/store/store';
import { useSelector } from 'react-redux';
import React, { memo, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escDisabledButtonStyle, escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';
import DialogContent from '@mui/material/DialogContent';
import {
	addSubCategorySlice,
	selectAddSubCategorySlice,
	setImagePicked,
	setName,
	setHomeDisplay,
	selectParantCats,
	categoryDialogOpen,
	validateForm,
	cleanForm
} from '../../stores/categories/AddSubCategoryStore';
import { fetchCategories } from '../../respositories/categories/CategoriesRepo';
import { baseUrl } from '../../respositories/urls';
import { addSubCategory, updateSubCategoryById } from '../../respositories/categories/SubCategoriesRepo';

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
	const category = useSelector(selectAddSubCategorySlice);
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
	useEffect(() => {
		dispatch(
			fetchCategories({
				forAll: true,
				payload: {
					limit: 0,
					page: 0,
					sort: {},
					search: ''
				}
			})
		);
	}, []);
	const handleClose = () => {
		dispatch(categoryDialogOpen());
		navigate(-1);
	};

	useEffect(() => {
		if (category.isCategoryCreated) {
			setFile(undefined);
			dispatch(setImagePicked(false));
			if (category.homeDisplay) {
				dispatch(setHomeDisplay());
			}
		}
	}, [category.isCategoryCreated]);
	useEffect(() => {
		if (category.forUpdate) {
			setButtonText('Update');
		} else {
			dispatch(cleanForm());
		}
	}, []);
	const addCat = () => {
		if (category.isFormValid && !category.isLoading) {
			if (category.forUpdate) {
				dispatch(
					updateSubCategoryById({
						id: category.category.int_glcode,
						payload: {
							title: category.name,
							file: file || '',
							is_home_active: category.homeDisplay ? 'true' : 'false'
						}
					})
				);
			} else {
				dispatch(
					addSubCategory({
						payload: {
							title: category.name,
							fk_parent: category.selectedParentCats,
							file,
							is_home_active: category.homeDisplay ? 'true' : 'false'
						}
					})
				);
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
									Sub Categories
								</Button>
								<Typography className="mt-10 text-2xl font-extrabold leading-tight tracking-tight ">
									{category.forUpdate ? 'Update Sub Category' : 'New Sub Category'}
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
										<FormControl fullWidth>
											<InputLabel id="demo-simple-select-label">Parent Categories</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												label="Parent Categories"
												value={category.selectedParentCats}
												onChange={(e) => {
													dispatch(selectParantCats(e.target.value));
												}}
											>
												{category.parentsCats
													.filter((data) => data.is_active)
													.map((data, index) => (
														<MenuItem
															value={data.int_glcode}
															key={index}
														>
															<div className="flex flex-start gap-10">
																<img
																	src={`${baseUrl}/images/${data.var_icon}`}
																	alt=""
																	style={{ width: 20, height: 20 }}
																/>
																{data.var_title}
															</div>
														</MenuItem>
													))}
											</Select>
										</FormControl>

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
										<div className="flex w-full mt-20 mb-10">
											<FormControlLabel
												value="Y"
												color="secondary"
												control={
													<Switch
														color="secondary"
														checked={category.homeDisplay}
														onChange={() => {
															dispatch(setHomeDisplay());
														}}
													/>
												}
												label="Home Display"
												labelPlacement="start"
											/>
										</div>
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
export default withSlices([addSubCategorySlice])(memo(AddCategory));
