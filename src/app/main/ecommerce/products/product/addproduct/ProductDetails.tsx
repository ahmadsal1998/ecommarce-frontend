/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Button from '@mui/material/Button';
import React, { memo, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { ContentState, convertToRaw } from 'draft-js';
import { useAppDispatch } from 'app/store/store';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import htmlToDraft from 'html-to-draftjs';
import { Theme, useTheme } from '@mui/material/styles';
import axios from 'axios';
import {
	formValid,
	selectAddProductDetailtSlice,
	setBrand,
	setCategory,
	setDetails,
	setHomepageShow,
	setImage,
	setImageUrl,
	setLongDesc,
	setName,
	setShortDesc,
	setSkuId,
	setSubCategory,
	setTag
} from '../../../stores/product/AddProductDetailStore';
import { selectCategorySlice } from '../../../stores/categories/CategoryStore';
import { fetchSubCategoriesParentById } from '../../../respositories/categories/SubCategoriesRepo';
import { selectSubCategorySlice } from '../../../stores/categories/SubCategoryStore';
import { selectBrandsSlice } from '../../../stores/brands/BrandStore';
import { selectTagsSlice } from '../../../stores/tags/TagsStore';
import { baseUrl, imageUrl } from '../../../respositories/urls';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};
function getStyles(name: string, personName: readonly string[], theme: Theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
	};
}

function ProductDetails({ onSetProductImage, changeTabIndex, images }) {
	const dispatch = useAppDispatch();
	const theme = useTheme();
	const product = useSelector(selectAddProductDetailtSlice);
	const subCategories = useSelector(selectSubCategorySlice);
	const brands = useSelector(selectBrandsSlice);
	const categories = useSelector(selectCategorySlice);
	const [files, setFiles] = useState<Array<File>>([]);

	const tags = useSelector(selectTagsSlice);
	const deleteFile = (index: number) => {
		
		setFiles((data) => {
			const dt = [...data];
			dt.splice(index, 1);
			onSetProductImage(dt);
			return dt;
		});
	};
	const addImage = async (file: File) => {
		try {
			const formData = new FormData();
			formData.append('image', file);
			const config = {
				headers: {
					'content-type': 'multipart/form-data'
				}
			};
			const response: { data: { image: string } } = await axios.post(`${baseUrl}${imageUrl}`, formData, config);
			dispatch(setImageUrl(response.data.image));
		} catch (e) {
			/* empty */
		}
	};


	const handleFile = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement & {
			files: FileList;
		};
		if (target.files.length > 0) {
			dispatch(setImage(true));
		} else {
			dispatch(setImage(false));
		}

		setFiles((d) => [...d, target.files[0]]);
		onSetProductImage([target.files[0], ...files]);
		addImage(target.files[0]);
	};
	const handleChange = (event: SelectChangeEvent<typeof product.tag>) => {
		const {
			target: { value }
		} = event;
		dispatch(setTag(typeof value === 'string' ? value.split(',') : value));
	};

	useEffect(() => {
		dispatch(formValid());
	}, [
		product.brand,
		product.category,
		product.subCategory,
		product.price,
		product.longDesc,
		product.shortDesc,
		product.showHomepage,
		product.imageSelected
	]);
	useEffect(() => {
		dispatch(
			fetchSubCategoriesParentById({
				fk_parent: product.category
			})
		);
	}, [product.category]);

	return (
		<div className="pt-10 sm:p-24 max-w-3xl m-10">
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Select Category</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					label="Select Category"
					value={product.category}
					onChange={(e) => {
						dispatch(setCategory(e.target.value));
					}}
				>
					{categories.categories.filter((data) => data.is_active).map((data) => (
						<MenuItem value={data.int_glcode}>{data.var_title}</MenuItem>
					))}
				</Select>
			</FormControl>

			<FormControl
				fullWidth
				className="mt-20"
			>
				<InputLabel id="demo-simple-select-label">Select Sub Category</InputLabel>

				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					label="Select Category"
					value={product.subCategory}
					onChange={(e) => {
						dispatch(setSubCategory(e.target.value));
					}}
				>
					{subCategories.categories
						.filter((data) => data.is_active)
						.map((data) => (
						<MenuItem value={data.int_glcode}>{data.var_title}</MenuItem>
					))}
				</Select>
			</FormControl>

			<FormControl
				fullWidth
				className="mt-20"
			>
				<InputLabel id="demo-simple-select-label">Select Brand</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					label="Select Brand"
					value={product.brand}
					onChange={(e) => {
						dispatch(setBrand(e.target.value));
					}}
				>
					{brands.brands.map((data) => (
						<MenuItem value={data.int_glcode}>{data.var_title}</MenuItem>
					))}
				</Select>
			</FormControl>

			<TextField
				id="outlined-basic"
				label="Name"
				fullWidth
				className="mt-20"
				required
				value={product.name}
				error={product.error_name !== ''}
				helperText={product.error_name}
				onChange={(e) => {
					dispatch(setName(e.target.value));
				}}
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>

			<TextField
				id="outlined-basic"
				label="Short Description"
				fullWidth
				className="mt-20"
				required
				value={product.shortDesc}
				error={product.error_short_desc !== ''}
				helperText={product.error_short_desc}
				onChange={(e) => {
					dispatch(setShortDesc(e.target.value));
				}}
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>
			<TextField
				id="outlined-basic"
				label="Long Description"
				fullWidth
				className="mt-20"
				required
				multiline
				minRows={5}
				value={product.longDesc}
				error={product.error_long_desc !== ''}
				helperText={product.error_long_desc}
				onChange={(e) => {
					dispatch(setLongDesc(e.target.value));
				}}
				variant="outlined"
			/>

			<p className="mt-20"> Specification</p>
			{(product.forUpdate && product.details !== '') || !product.forUpdate ? (
				<Editor
					toolbarClassName="toolbarClassName"
					defaultContentState={convertToRaw(
						// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
						ContentState.createFromBlockArray(htmlToDraft(product.details).contentBlocks)
					)}
					onContentStateChange={(e) => dispatch(setDetails(draftToHtml(e)))}
					wrapperClassName="wrapperClassName border-1 border-gray-400 mt-10 rounded p-5"
					editorClassName="editorClassName"
				/>
			) : null}
			<FormControl className="w-full mt-20">
				<InputLabel id="demo-multiple-chip-label">Tag</InputLabel>
				<Select
					labelId="demo-multiple-chip-label"
					id="demo-multiple-chip"
					multiple
					value={product.tag}
					label="Tag"
					placeholder="Tag"
					onChange={handleChange}
					input={
						<OutlinedInput
							id="select-multiple-chip"
							label="Chip"
						/>
					}
					renderValue={(selected) => (
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
							{selected.map((value) => (
								<Chip
									key={value}
									label={value}
								/>
							))}
						</Box>
					)}
					MenuProps={MenuProps}
				>
					{tags.tags.map((data, index) => (
						<MenuItem
							key={data.int_glcode}
							value={data.var_title}
							style={getStyles(data.var_title, product.tag, theme)}
						>
							{data.var_title}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<TextField
				id="outlined-basic"
				label="Sku Id"
				fullWidth
				className="mt-20"
				required
				value={product.sku_id}
				error={product.sku_id !== ''}
				helperText={product.error_sku}
				onChange={(e) => {
					dispatch(setSkuId(e.target.value));
				}}
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>

			<div className="flex w-full mt-20 mb-10">
				<FormControlLabel
					checked={product.showHomepage === 'Y'}
					onChange={() => dispatch(setHomepageShow())}
					color="secondary"
					control={<Switch color="secondary" />}
					label="Show on homepage"
					labelPlacement="start"
				/>
			</div>
			<Button
				variant="contained"
				component="label"
				fullWidth
				sx={{ minHeight: 100, maxWidth: 100 }}
				className="min-h-100 mt-20"
			>
				{product.images !== '' ? (
					<img
						src={`${baseUrl}/images/${product.images}`}
						alt=""
						style={{ height: '60px', marginTop: '10px', marginLeft: '5px' }}
					/>
				) : (
					<FileDownloadOutlinedIcon />
				)}
				<input
					type="file"
					accept="image/*"
					hidden
					multiple={false}
					onInput={handleFile}
				/>
			</Button>

			<div className="w-full mt-20">
				<EscButton
					variant="contained"
					onClick={() => {
						changeTabIndex(1);
					}}
					color="secondary"
					buttonStyle={escGradientAndShadowButtonStyle}
					className=" w-min   "
					aria-label="Sign in"
					size="large"
				>
					Next
				</EscButton>
			</div>
		</div>
	);
}
export default memo(ProductDetails);
