import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { CategoryModel } from '../../models/categories/Category';
import { BrandModel } from '../../models/brands/BrandModel';
import { addProduct, fetchProductById, updateProductById } from '../../respositories/product/ProductRepo';
import { ProductModel } from '../../models/products/product/ProductModel';

type AppRootStateType = RootStateType<addProductDetailSliceType>;
type initialStateProps = {
	categories: Array<CategoryModel>;
	brands: Array<BrandModel>;
	name: string;
	brand: string;
	category: string;
	subCategory: string;
	shortDesc: string;
	sku_id: string;
	longDesc: string;
	images: string;
	details: string;
	tag: string[];
	showHomepage: string;
	imageSelected: boolean;
	error_name: string;
	error_price: string;
	error_sku: string;
	product: ProductModel;
	error_short_desc: string;
	error_long_desc: string;
	error_details: string;
	isFormValid: boolean;
	isLoading: boolean;
	message: string;
	forUpdate: boolean;
	dialogOpen: boolean;
	dataReceived: boolean;
	isProductCreated: boolean;
	price: string;
};
const initialState: initialStateProps = {
	categories: [],
	brands: [],
	product: null,
	name: '',
	brand: '',
	category: '',
	shortDesc: '',
	longDesc: '',
	images: '',
	details: '',
	error_sku: '',
	sku_id: '',
	error_price: '',
	dataReceived: false,
	subCategory: '',
	tag: [],
	showHomepage: 'N',
	imageSelected: false,

	forUpdate: false,
	error_name: '',
	error_short_desc: '',
	error_long_desc: '',
	isFormValid: false,
	message: '',
	dialogOpen: false,
	isProductCreated: false,
	isLoading: false,
	price: '0',
	error_details: ''
};
export const addProductDetailSlice = createSlice({
	name: 'addProductDetail',
	initialState,
	reducers: {
		setCategories(state, action) {
			state.categories = action.payload as Array<CategoryModel>;
		},
		setBrands(state, action) {
			state.brands.concat(action.payload as Array<BrandModel>);
		},
		productDialogOpen(state) {
			state.dialogOpen = !state.dialogOpen;
		},
		setSkuId(state, action) {
			state.sku_id = action.payload as string;
			if (state.sku_id === '') {
				state.error_sku = 'Sku Id is required field';
			} else {
				state.error_sku = '';
			}
		},
		setName(state, action) {
			state.name = action.payload as string;
			if (state.name === '') {
				state.error_name = 'Name is required field';
			} else {
				state.error_name = '';
			}
		},
		setProductForUpdate(state, action){
			state.forUpdate = action.payload as boolean;
		},
		setShortDesc(state, action) {
			state.shortDesc = action.payload as string;
			if (state.shortDesc === '') {
				state.error_details = 'Short description is required field';
			} else {
				state.error_details = '';
			}
		},
		setCategory(state, action) {
			state.category = action.payload as string;
		},

		setImageUrl(state, action) {
			state.images = action.payload as string;
		},
		setSubCategory(state, action) {
			state.subCategory = action.payload as string;
		},
		setBrand(state, action) {
			state.brand = action.payload as string;
		},
		setTag(state, action) {
			state.tag = action.payload as string[];
		},
		setHomepageShow(state) {
			state.showHomepage = state.showHomepage === 'Y' ? 'N' : 'Y';
		},
		setImage(state, action) {
			state.imageSelected = action.payload as boolean;
		},
		clearForm(state) {
			state.name = '';
			state.brand = '';
			state.category = '';
			state.subCategory = '';
			state.shortDesc = '';
			state.longDesc = '';
			state.details = '';
			state.tag = [];
			state.sku_id = '';
			state.showHomepage = 'N';
			state.imageSelected = false;
			state.error_name = '';
			state.error_short_desc = '';
			state.error_long_desc = '';
			state.isFormValid = false;
			state.isLoading = false;
			state.message = '';
			state.images = '';
			state.price = '0';
			state.dialogOpen = false;
			state.isProductCreated = false;
		},
		setLongDesc(state, action) {
			state.longDesc = action.payload as string;
			if (state.longDesc === '') {
				state.error_long_desc = 'Long Description is require field';
			} else {
				state.error_long_desc = '';
			}
		},
		setDetails(state, action) {
			state.details = action.payload as string;
			if (state.details === '') {
				state.error_details = 'Details is require field';
			} else {
				state.error_long_desc = '';
			}
		},
		formValid(state) {
			
			if (
				state.brand !== '' &&
				state.category !== '' &&
				state.name !== '' &&
				state.shortDesc !== '' &&
				state.longDesc !== '' &&
				state.error_price === '' &&
				state.imageSelected &&
				state.error_details ===''&&
				state.details !=='' &&
				state.sku_id !== ''&&
				state.error_sku ===''&&
				state.error_name === '' &&
				state.error_short_desc === '' &&
				state.error_long_desc === ''
			) {
				state.isFormValid = true;
			} else {
				state.isFormValid = false;
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addProduct.pending, (state) => {
			state.isLoading = true;
			state.isProductCreated = false;
		});
		builder.addCase(addProduct.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
			state.name = '';
			state.isProductCreated = true;
		});
		builder.addCase(addProduct.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
			state.isProductCreated = false;
		});
		builder.addCase(fetchProductById.fulfilled, (state, action) => {
			state.product = action.payload.data;
			state.name = state.product.var_title;
			state.brand = state.product.fk_brand;
			state.category = state.product.fk_category;
			state.price = state.product.var_price;
			state.shortDesc = state.product.var_short_description;
			state.longDesc = state.product.txt_description;
			state.details = state.product.txt_nutrition;
			state.images = state.product.var_image;
			state.subCategory = state.product.fk_subcategory;
			state.tag = state.product.fk_tags;
			state.sku_id = state.product.sku_id;
			state.showHomepage = state.product.home_display;
			state.isFormValid = true;
			state.isLoading = false;
			state.dataReceived = true;
			state.imageSelected = true;
		});

		builder.addCase(fetchProductById.pending, (state) => {
			state.isLoading = true;
			state.dataReceived = false;
			state.isProductCreated = false;
		});
		builder.addCase(updateProductById.fulfilled, (state, action) => {
			state.message = action.payload.message;
			state.dialogOpen = true;
			state.isLoading = false;
			state.isProductCreated = true;
		});
		builder.addCase(updateProductById.rejected, (state) => {
			state.dialogOpen = false;
			state.isLoading = false;
			state.isProductCreated = false;
		});
	}
});
export const {
	setCategories,
	setBrands,
	setName,
	setHomepageShow,
	setLongDesc,
	setShortDesc,
	setImageUrl,
	formValid,
	setImage,
	setCategory,
	setDetails,
	setBrand,
	setSkuId,
	setProductForUpdate,
	productDialogOpen,
	setTag,
	setSubCategory,
	clearForm
} = addProductDetailSlice.actions;
export const selectAddProductDetailtSlice = appSelector(({ addProductDetail }: AppRootStateType) => addProductDetail);

export type addProductDetailSliceType = typeof addProductDetailSlice;
export default addProductDetailSlice.reducer;
