import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { AttributeModel } from '../../models/products/attributes/AttributeModel';
import { VarientModel } from '../../models/products/verient/VarientModel';
import { fetchProductById } from '../../respositories/product/ProductRepo';
import { AttributeValueModel } from '../../models/products/attributes/AttributeValueModel';

const attribute: Array<AttributeModel> = [];

type AppRootStateType = RootStateType<addProductVarientSliceType>;
type initialStateProps = {
	gst: string;
	offer: string;
	haveGst: string;
	error_gst: string;
	error_offer: string;
	attributes: Array<AttributeModel>;
	isValidForm: boolean;
	varients: Array<VarientModel>;
};
const initialState: initialStateProps = {
	gst: '0',
	offer: '',
	error_gst: '',
	haveGst: 'Yes',
	error_offer: '',
	isValidForm: false,
	attributes: attribute,
	varients: []
};
export const addProductVarientSlice = createSlice({
	name: 'addProductVarient',
	initialState,
	reducers: {
		clearVarientForm(state, action) {
			state.gst = '0';
			state.offer = '';
			state.error_gst = '';
			state.haveGst = 'Yes';
			state.error_offer = '';
			state.isValidForm = false;
			state.varients = [];
		},
		setGst(state, action) {
			state.gst = action.payload as string;
			if (state.haveGst === 'Yes' && state.gst === '') {
				state.error_gst = 'Gst is require field';
			} else if (state.haveGst === 'Yes' && !/^\d+$/.test(state.gst)) {
				state.error_gst = 'Invalid gst';
			} else {
				state.error_gst = '';
			}
		},
		setVariantAttribute(state, action) {
			const varient: { index: number; atIndex: number; value: AttributeValueModel; attribute: AttributeModel } =
				action.payload as {
					index: number;
					atIndex: number;
					attribute: AttributeModel;
					value: AttributeValueModel;
				};
			state.varients[varient.index].attributes[varient.atIndex].value = varient.value;
		},
		updateVariantAttribute(state, action) {
			const attrs = action.payload as Array<AttributeModel>;

			state.varients.forEach((vari) => {
				vari.attributes.forEach((attr) => {
					if (attrs.find((attf) => attf.int_glcode === attr.int_glcode)) {
						attr.values = attrs.find((attf) => attf.int_glcode === attr.int_glcode).values;
					}
				});
			});
		},
		setHaveGst(state, action) {
			state.haveGst = action.payload as string;
		},
		setOffer(state, action) {
			state.offer = action.payload as string;
			if (state.offer === '') {
				state.error_offer = 'Offer is required field';
			} else if (!/^\d+$/.test(state.offer)) {
				state.error_offer = 'Invalid offer';
			} else {
				state.error_offer = '';
			}
		},
		setImageUrl(state, action) {
			const payload: { pIndex: number; image: string } = action.payload as { pIndex: number; image: string };
			state.varients[payload.pIndex].image.push(payload.image);
		},
		deleteImage(state, action) {
			const payload: { pIndex: number; index: number } = action.payload as { pIndex: number; index: number };
			state.varients[payload.pIndex].image.splice(payload.index, 1);
		},
		deletVarient(state, action) {
			state.varients = [];
		},
		addVarient(state, action) {
			const atr: Array<AttributeModel> = action.payload as Array<AttributeModel>;
			const varient: VarientModel = {
				price: '',
				selling_price: '',
				stock: '',
				error_price: '',
				error_selling_price: '',
				error_stock: '',
				isFormValid: false,
				image: [],
				attributes: atr
			};
			
			state.varients.push(varient);
		},
		deleteVarient(state, action) {
			state.varients.splice(action.payload as number, 1);
		},
		setVarientPrice(state, action) {
			const payl: { index: number; price: string } = action.payload as { index: number; price: string };
			state.varients[payl.index].price = payl.price;

			state.varients[payl.index].selling_price =
				payl.price === ''
					? '0'
					: (
							parseInt(payl.price, 10) -
							parseInt(payl.price, 10) * (parseInt(state.offer === '' ? '0' : state.offer, 10) / 100)
						).toFixed(0);
			if (state.varients[payl.index].price === '') {
				state.varients[payl.index].error_price = 'Price is required field';
			} else if (!/^\d+$/.test(state.varients[payl.index].price)) {
				state.varients[payl.index].error_price = 'Invalid price';
			} else {
				state.varients[payl.index].error_price = '';
			}
		},
		setSellingPrice(state, action) {
			const paySell: { index: number; sellingprice: string } = action.payload as {
				index: number;
				sellingprice: string;
			};

			state.varients[paySell.index].selling_price = paySell.sellingprice;
			if (state.varients[paySell.index].selling_price === '') {
				state.varients[paySell.index].error_selling_price = 'Selling price is required field';
			} else if (!/^\d+$/.test(state.varients[paySell.index].selling_price)) {
				state.varients[paySell.index].error_selling_price = 'Invalid Selling price';
			} else {
				state.varients[paySell.index].error_selling_price = '';
			}
		},
		setStock(state, action) {
			const payStock: { index: number; stock: string } = action.payload as {
				index: number;
				stock: string;
			};
			state.varients[payStock.index].stock = payStock.stock;
			if (state.varients[payStock.index].stock === '') {
				state.varients[payStock.index].error_stock = 'Stock is required field';
			} else if (!/^\d+$/.test(state.varients[payStock.index].stock)) {
				state.varients[payStock.index].error_stock = 'Invalid stock';
			} else {
				state.varients[payStock.index].error_stock = '';
			}
		},
		clearAttributes(state, action) {
			state.attributes.forEach((e) => {
				e.isChecked = false;
			});
		},
		setAttribute(state, action) {
			state.attributes[action.payload as number].isChecked =
				!state.attributes[action.payload as number].isChecked;
		},
		setAttributes(state, action) {
			state.attributes = [];
			(action.payload as Array<AttributeModel>).forEach((data) => {
				state.attributes.push({
					values: data.values,
					int_glcode: data.int_glcode,
					var_title: data.var_title,
					created_date: data.created_date,
					updated_date: data.updated_date,
					is_active: data.is_active,
					isChecked: false
				} as AttributeModel);
			});
		},
		setVarientImage(state, action) {
			const avimage: { index: number; image: string } = action.payload as {
				index: number;
				image: string;
			};

			state.varients[avimage.index].image.push(avimage.image);
		},
		formValid(state) {
			let isVarientValid = false;
			
			state.varients.forEach((data) => {
				
				if (
					data.price !== '' &&
					data.selling_price !== '' &&
					data.stock !== '' &&
					data.image.length >0&&
					(data.error_price === undefined ? '' : data.error_price) === '' &&
					(data.error_stock === undefined ? '' : data.error_stock) === '' &&
					(data.error_price === undefined ? '' : data.error_selling_price) === ''
				) {
					isVarientValid = true;
				} else {
					isVarientValid = false;
				}
			});

			if (state.error_gst === '' && state.error_offer === '' && isVarientValid) {
				state.isValidForm = true;
			} else {
				state.isValidForm = false;
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProductById.fulfilled, (state, action) => {
			state.gst = action.payload.data.var_gst;
			state.offer = action.payload.data.var_offer;
			state.isValidForm = true;
			state.varients = [];
			action.payload.data.variants.forEach((data) => {
				const varient: VarientModel = {
					price: data.price,
					selling_price: data.selling_price,
					stock: data.stock,
					error_price: '',
					error_selling_price: '',
					error_stock: '',
					isFormValid: true,
					image: data.image,
					attributes: data.attributes
				};
				state.varients.push(varient);
			});
		});
	}
});
export const {
	setGst,
	setOffer,
	updateVariantAttribute,
	setHaveGst,
	setAttribute,
	setVariantAttribute,
	clearVarientForm,
	setAttributes,
	clearAttributes,
	formValid,
	addVarient,
	deleteVarient,
	setVarientPrice,
	setSellingPrice,
	setStock,
	setImageUrl,
	deleteImage,
	deletVarient,
	setVarientImage
} = addProductVarientSlice.actions;
export const selectAddProductVarientSlice = appSelector(({ addProductVarient }: AppRootStateType) => addProductVarient);

export type addProductVarientSliceType = typeof addProductVarientSlice;
export default addProductVarientSlice.reducer;
