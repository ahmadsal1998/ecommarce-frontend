import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect, memo } from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/store/store';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Card from '@mui/material/Card';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import InputAdornment from '@mui/material/InputAdornment';
import {
	selectAddProductVarientSlice,
	setGst,
	setOffer,
	setHaveGst,
	setAttribute,
	updateVariantAttribute,
	addVarient,
	deleteVarient,
	setVarientPrice,
	setSellingPrice,
	setStock,
	setAttributes,
	deleteImage,
	setImageUrl,
	setVariantAttribute,
	formValid
} from '../../../stores/product/AddProductVarient';
import { selectAttributeSlice } from '../../../stores/attributes/AttributeStore';
import { fetchAttributsWithValues } from '../../../respositories/attributes/attributeRepo';
import { baseUrl, imageUrl } from '../../../respositories/urls';
import { selectAddProductDetailtSlice } from '../../../stores/product/AddProductDetailStore';

export type selectedImages = {
	images: Array<File | undefined>;
	index: number;
};
function ProductVarient() {
	const dispatch = useAppDispatch();
	const varient = useSelector(selectAddProductVarientSlice);
	const attributes = useSelector(selectAttributeSlice);
	const product = useSelector(selectAddProductDetailtSlice);

	const deleteFile = (pindex: number, index: number) => {
		dispatch(deleteImage({ pIndex: pindex, index }));
		
	};

	const addImage = async (indexx: number, file: File) => {
		try {
			const formData = new FormData();
			formData.append('image', file);
			const config = {
				headers: {
					'content-type': 'multipart/form-data'
				}
			};
			const response: { data: { image: string } } = await axios.post(`${baseUrl}${imageUrl}`, formData, config);
			dispatch(setImageUrl({ pIndex: indexx, image: response.data.image }));
		} catch (e) {
			/* empty */
		}
	};
	
	const handleFile = (e: React.FormEvent<HTMLInputElement>, indexx: number) => {
		const target = e.target as HTMLInputElement & {
			files: FileList;
		};

		addImage(indexx, target.files[0]);
	};

	useEffect(() => {
		dispatch(fetchAttributsWithValues());
	}, []);
	useEffect(() => {
		dispatch(setAttributes(attributes.attributes));
		if (product.forUpdate) {
			dispatch(updateVariantAttribute(attributes.attributes));
		}
	}, [attributes.isLoading]);
	useEffect(() => {
		dispatch(formValid());
	}, [varient.attributes, varient.gst, varient.haveGst, varient.offer, varient.varients]);

	return (
		<div className="pt-10 sm:p-24 max-w-6xl m-10">
			<div className="flex w-full grid grid-cols-1">
				<div className=" pt-10 sm:p-24  m-10 max-w-3xl  ">
					<FormControl className="mt-20">
						<FormLabel id="demo-row-radio-buttons-group-label">Including gst?</FormLabel>
						<RadioGroup
							row
							value={varient.haveGst}
							onChange={(e) => dispatch(setHaveGst(e.target.value))}
							aria-labelledby="demo-row-radio-buttons-group-label"
							name="row-radio-buttons-group"
						>
							<FormControlLabel
								value="Yes"
								control={<Radio />}
								label="Yes"
							/>
							<FormControlLabel
								value="No"
								control={<Radio />}
								label="No"
							/>
						</RadioGroup>
					</FormControl>
					<div>
						{varient.haveGst === 'No' ? (
							<TextField
								id="outlined-basic"
								label="Gst"
								fullWidth
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<p>%</p>
										</InputAdornment>
									)
								}}
								value={varient.gst}
								error={varient.error_gst !== ''}
								helperText={varient.error_gst}
								onChange={(e) => {
									dispatch(setGst(e.target.value));
								}}
								className="mt-20"
								required
								variant="outlined"
							/>
						) : null}
					</div>
					<TextField
						id="outlined-basic"
						label="Offer"
						fullWidth
						className="mt-20"
						required
						value={varient.offer}
						error={varient.error_offer !== ''}
						helperText={varient.error_offer}
						onChange={(e) => {
							dispatch(setOffer(e.target.value));
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<p>%</p>
								</InputAdornment>
							)
						}}
						variant="outlined"
					/>
				</div>
				<div className="flex m-20 w-full">
					<Typography
						className="mt-10"
						color="text.secondary"
					>
						Attribute
					</Typography>
					<div className="ms-20 w-full">
						{varient.attributes.map((data, index) => (
							<FormControlLabel
								label={data.var_title}
								key={index}
								control={
									<Checkbox
										checked={data.isChecked}
										onChange={() => dispatch(setAttribute(index))}
									/>
								}
							/>
						))}
						{varient.varients.map((varient, indexx) => (
							<Card
								key={indexx}
								className={
									varient.attributes.filter((value) => value.values).length > 0
										? 'p-20 row max-w-6xl mt-20'
										: 'p-20 row max-w-3xl mt-20'
								}
							>
								<div className="flex flex-col sm:flex-row flex-1 w-full items-baseline justify-between ">
									<div className="">
										<Typography className="mt-10 text-1xl font-extrabold leading-tight tracking-tight">
											Variant {indexx + 1}
										</Typography>
									</div>
									<div className="grow-0">
										<Button
											variant="contained"
											color="error"
											className="w-min "
											aria-label="Sign in"
											size="large"
											onClick={() => dispatch(deleteVarient(indexx))}
										>
											<ClearIcon />
										</Button>
									</div>
								</div>
								<div className="flex flex-col md:flex-row flex-1 w-full ">
									{varient.attributes.filter((value) => value.values).length > 0 ? (
										<div className="flex-1">
											{varient.attributes
												.filter((value) => value.values)
												.map((data, index) => (
													<FormControl
														fullWidth
														key={index}
														className="mt-20"
													>
														<InputLabel id="demo-simple-select-label">
															{data.var_title}
														</InputLabel>
														<Select
															labelId="demo-simple-select-label"
															id="demo-simple-select"
															label={data.var_title}
															value={
																varient.attributes[index] === null ||
																varient.attributes[index].value === undefined ||
																varient.attributes[index].value.int_glcode === undefined
																	? ''
																	: varient.attributes[index].value.int_glcode
															}
															onChange={(v) => {
																dispatch(
																	setVariantAttribute({
																		index: indexx,
																		atIndex: index,
																		attribute: varient.attributes[index],
																		value: varient.attributes[index].values.find(
																			(data) =>
																				data.int_glcode ===
																				(v.target.value as unknown as string)
																		)
																	})
																);
															}}
														>
															{data.values.map((data, index) => (
																<MenuItem
																	value={data.int_glcode}
																	key={index}
																>
																	<div className="flex flex-start gap-10">
																		{data.var_title}
																	</div>
																</MenuItem>
															))}
														</Select>
													</FormControl>
												))}
										</div>
									) : null}
									<div className="flex-1  ms-20">
										<TextField
											id="outlined-basic"
											label="Price"
											className="mt-20"
											required
											fullWidth
											value={varient.price}
											error={varient.error_price !== ''}
											helperText={varient.error_price}
											onChange={(e) => {
												dispatch(setVarientPrice({ price: e.target.value, index: indexx }));
											}}
											inputProps={{ maxLength: 100 }}
											variant="outlined"
										/>
										<TextField
											id="outlined-basic"
											label="Selling Price"
											fullWidth
											className="mt-20"
											required
											disabled
											value={varient.selling_price}
											error={varient.error_selling_price !== ''}
											helperText={varient.error_selling_price}
											onChange={(e) => {
												dispatch(
													setSellingPrice({ sellingprice: e.target.value, index: indexx })
												);
											}}
											inputProps={{ maxLength: 100 }}
											variant="outlined"
										/>
										<TextField
											id="outlined-basic"
											label="Stock"
											fullWidth
											className="mt-20"
											required
											value={varient.stock}
											error={varient.error_stock !== ''}
											helperText={varient.error_stock}
											onChange={(e) => {
												dispatch(setStock({ stock: e.target.value, index: indexx }));
											}}
											inputProps={{ maxLength: 100 }}
											variant="outlined"
										/>
									</div>
								</div>
								<div className="flex mt-20">
									<Button
										variant="contained"
										component="label"
										fullWidth
										sx={{ minHeight: 60, maxWidth: 170 }}
										className="min-h-100"
									>
										<FileDownloadOutlinedIcon />
										Select Image
										<input
											type="file"
											accept="image/*"
											hidden
											multiple={false}
											onInput={(e) => handleFile(e, indexx)}
										/>
									</Button>
									{varient.image.map((imag, index) => (
										<div
											style={{ position: 'relative' }}
											key={index}
										>
											<img
												src={`${baseUrl}/images/${imag}`}
												alt=""
												style={{ height: '60px', marginTop: '10px', marginLeft: '5px' }}
											/>
											<ClearIcon
												style={{
													position: 'absolute',
													top: 0,
													right: 0,
													background: 'grey',
													borderRadius: 10,
													color: 'white'
												}}
												onClick={() => deleteFile(indexx, index)}
											/>
										</div>
									))}
								</div>
							</Card>
						))}
					</div>
				</div>
				<div className="flex-1 m-20">
					<Button
						variant="contained"
						color="secondary"
						aria-label="Sign in"
						size="large"
						onClick={() => {
							dispatch(addVarient(varient.attributes.filter((value) => value.isChecked)));
						}}
						startIcon={<AddIcon />}
					>
						Add Variant
					</Button>
				</div>
			</div>
		</div>
	);
}
export default memo(ProductVarient);
