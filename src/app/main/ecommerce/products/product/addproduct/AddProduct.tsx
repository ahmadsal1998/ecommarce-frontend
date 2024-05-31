import EscPageSimple from '@esc/core/EscPageSimple';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import EscPageCarded from '@esc/core/EscPageCarded';
import withSlices from 'app/store/withSlices';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import CircularProgress from '@mui/material/CircularProgress';
import Tab from '@mui/material/Tab';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { useSelector } from 'react-redux';
import React, { memo, useEffect, useState } from 'react';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escDisabledButtonStyle, escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import { useAppDispatch } from 'app/store/store';
import ProductDetails from './ProductDetails';
import ProductVarient, { selectedImages } from './ProductVarient';
import {
	addProductDetailSlice,
	clearForm,
	productDialogOpen,
	selectAddProductDetailtSlice
} from '../../../stores/product/AddProductDetailStore';
import {
	addProductVarientSlice,
	clearAttributes,
	clearVarientForm,
	selectAddProductVarientSlice
} from '../../../stores/product/AddProductVarient';
import { categoriesSlice } from '../../../stores/categories/CategoryStore';
import { subCategoriesSlice } from '../../../stores/categories/SubCategoryStore';
import { brandsSlice } from '../../../stores/brands/BrandStore';
import { tagsSlice } from '../../../stores/tags/TagsStore';
import { attributeSlice } from '../../../stores/attributes/AttributeStore';
import { addProduct, updateProductById } from '../../../respositories/product/ProductRepo';
import { fetchCategories } from '../../../respositories/categories/CategoriesRepo';
import { fetchBrands } from '../../../respositories/brands/BrandsRepo';
import { fetchTags } from '../../../respositories/tags/TagsRepo';

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

function AddUser() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [tabIndex, setTabIndex] = React.useState(0);
	const product = useSelector(selectAddProductDetailtSlice);
	const [files, setFiles] = useState<Array<File>>([]);
	const [filess, setFiless] = useState<Array<selectedImages>>([]);
	const varient = useSelector(selectAddProductVarientSlice);
	const [buttonText, setButtonText] = useState('Create');
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabIndex(newValue);
	};
	const handleClose = () => {
		dispatch(productDialogOpen());
		navigate(-1);
		dispatch(clearForm());
		dispatch(clearVarientForm([]));
		dispatch(clearAttributes([]));
	};

	const setProductImage = (data: Array<File>) => {
		setFiles(data);
	};
	const addProdct = () => {
		if (product.isFormValid && !product.isLoading) {
			if (product.forUpdate) {
				dispatch(
					updateProductById({
						id: product.product.int_glcode,
						payload: {
							var_title: product.name,
							fk_category: product.category,
							fk_subcategory: product.subCategory,
							fk_brand: product.brand,
							fk_tags: product.tag,
							sku_id: product.sku_id,
							txt_nutrition: product.details,
							var_image: product.images,
							var_gst: varient.gst === '' ? '0' : varient.gst,
							var_short_description: product.shortDesc,
							txt_description: product.longDesc,
							var_offer: varient.offer===''?'0':varient.offer,
							var_price: product.price,
							home_display: product.showHomepage === '' ? 'N' : product.showHomepage,
							variants: varient.varients
						}
					})
				);
			} else {
				dispatch(
					addProduct({
						payload: {
							var_title: product.name,
							fk_category: product.category,
							fk_subcategory: product.subCategory,
							fk_brand: product.brand,
							fk_tags: product.tag,
							var_image: product.images,
							var_gst: varient.gst === '' ? '0' : varient.gst,
							var_short_description: product.shortDesc,
							txt_description: product.longDesc,
							var_offer: varient.offer===''?'0':varient.offer,
							sku_id: product.sku_id,
							txt_nutrition: product.details,
							var_price: product.price,
							home_display: product.showHomepage === '' ? 'N' : product.showHomepage,
							variants: varient.varients
						}
					})
				);
			}
		}
	};
	useEffect(() => {
		if (product.isProductCreated) {
			setTabIndex(0);
		}
	}, [product.isProductCreated]);
	useEffect(() => {
		if (!product.isLoading) {
			setTabIndex(0);
		}
	}, [product.isLoading]);
	useEffect(() => {
		if (!product.forUpdate) {
			dispatch(clearForm());
		dispatch(clearVarientForm([]));
		dispatch(clearAttributes([]));
			
		} else {
			setButtonText('Update');
		}
		
	},[]);
	

	useEffect(() => {
		dispatch(
			fetchCategories({
				forAll: false,
				payload: {
					limit: 10000,
					page: 1,
					sort: {},
					search: ''
				}
			})
		);
		dispatch(
			fetchBrands({
				payload: {
					limit: 10000,
					page: 1,
					sort: {},
					search: ''
				}
			})
		);
		dispatch(
			fetchTags({
				payload: {
					limit: 10000,
					page: 1,
					sort: {},
					search: ''
				}
			})
		);
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
									Products
								</Button>
								<Typography className="mt-10 text-2xl font-extrabold leading-tight tracking-tight ">
									{product.forUpdate ? 'Edit Product details' : 'New Product'}
								</Typography>
							</div>
							<div className="grow-0">
								<div className="flex  items-center ">
									{product.isFormValid && varient.isValidForm ? (
										<EscButton
											variant="contained"
											color="secondary"
											className=" w-min   "
											onClick={addProdct}
											aria-label="Sign in"
											size="large"
											buttonStyle={escGradientAndShadowButtonStyle}
										>
											{product.isLoading ? <CircularProgress color="inherit" /> : buttonText}
										</EscButton>
									) : (
										<EscButton
											variant="contained"
											className=" w-min   "
											aria-label="Sign in"
											buttonStyle={escDisabledButtonStyle}
											size="large"
										>
											{product.forUpdate ? 'Update' : 'Create'}
										</EscButton>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="flex grow min-h-max  ">
						<EscPageCarded
							content={
								<Box
									sx={{
										flexGrow: 0,

										padding: '1.5rem 1rem 1rem 0'
									}}
								>
									<Tabs
										value={tabIndex}
										onChange={handleChange}
										variant="scrollable"
										indicatorColor="secondary"
										orientation="horizontal"
										sx={{ borderBottom: 0.5, borderColor: 'primary.light' }}
										aria-label="visible arrows tabs example"
									>
										<Tab label="Product Details" />
										<Tab label="Product Variants" />
									</Tabs>
									{tabIndex === 0 ? (
										<ProductDetails
											changeTabIndex={setTabIndex}
											onSetProductImage={setProductImage}
											images={files}
										/>
									) : (
										<ProductVarient/>
									)}
								</Box>
							}
						/>
					</div>
					<Dialog
						open={product.dialogOpen}
						onClose={handleClose}
						aria-describedby="alert-dialog-slide-description"
					>
						<DialogContent>
							<DialogContentText id="alert-dialog-slide-description">
								<Box sx={{ width: '250px' }}>{product.message}</Box>
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
export default withSlices([
	addProductDetailSlice,
	tagsSlice,
	brandsSlice,
	attributeSlice,
	addProductVarientSlice,
	categoriesSlice,
	subCategoriesSlice
])(memo(AddUser));
