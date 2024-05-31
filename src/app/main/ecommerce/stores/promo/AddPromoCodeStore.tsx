import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import moment from 'moment';
import { addPromo, fetchPromoById, updatePromoById } from '../../respositories/promocodes/PromocodeRepo';
import { PromoModel } from '../../models/promo/PromoMode';

const currentDate = new Date();
type AppRootStateType = RootStateType<addPromoSliceType>;
type initialStateProps = {
	promo: PromoModel;
	promo_code: string;
	discount_percent: string;
	max_discount_price: string;
	min_order_price: string;
	apply_no_time: string;
	expiry_date: string;
	description: string;
	error_promo_code: string;
	error_discount_percent: string;
	error_max_discountprice: string;
	error_min_orderprice: string;
	error_apply_time: string;
	error_expiry_date: string;
	error_description: string;
	forUpdate: boolean;
	isLoading: boolean;
	isFormValid: boolean;
	error_message: string;
	hasRoleCreated: boolean;
	dialogOpen: boolean;
	message: string;
};
const initialState: initialStateProps = {
	promo: null,
	promo_code: '',
	discount_percent: '',
	max_discount_price: '',
	min_order_price: '',
	apply_no_time: '',
	expiry_date: moment().format('DD-MM-YYYY'),
	description: '',
	error_promo_code: '',
	error_discount_percent: '',
	error_max_discountprice: '',
	error_min_orderprice: '',
	error_apply_time: '',
	error_expiry_date: '',
	error_description: '',
	forUpdate: false,
	isFormValid: false,
	error_message: '',
	hasRoleCreated: false,
	dialogOpen: false,
	message: '',
	isLoading: false
};
export const addPromoSlice = createSlice({
	name: 'addPromo',
	initialState,
	reducers: {
		setPromoCode(state, action) {
			state.promo_code = action.payload as string;
			if (state.promo_code === '') {
				state.error_promo_code = 'Promo code is required field';
			} else {
				state.error_promo_code = '';
			}
		},
		setDiscountPercent(state, action) {
			state.discount_percent = action.payload as string;
			if (state.discount_percent === '') {
				state.error_discount_percent = 'Discount Percent is required field';
			} else if (!/^\d+$/.test(state.discount_percent)) {
				state.error_discount_percent = 'Enter valid Discount Percent';
			} else {
				state.error_discount_percent = '';
			}
		},
		setMaxDiscount(state, action) {
			state.max_discount_price = action.payload as string;
			if (state.max_discount_price === '') {
				state.error_max_discountprice = 'Max discount price is required field';
			} else if (!/^\d+$/.test(state.max_discount_price)) {
				state.error_max_discountprice = 'Enter valid Max discount price ';
			} else {
				state.error_max_discountprice = '';
			}
		},
		setMinPrice(state, action) {
			state.min_order_price = action.payload as string;
			if (state.min_order_price === '') {
				state.error_min_orderprice = 'Min Order price is required field';
			} else if (!/^\d+$/.test(state.min_order_price)) {
				state.error_min_orderprice = 'Enter valid Min Order price ';
			} else {
				state.error_min_orderprice = '';
			}
		},
		setApplyNoTime(state, action) {
			state.apply_no_time = action.payload as string;
			if (state.min_order_price === '') {
				state.error_apply_time = 'Apply No. Time is required field';
			} else if (!/^\d+$/.test(state.apply_no_time)) {
				state.error_apply_time = 'Enter valid Apply No. Time';
			} else {
				state.error_apply_time = '';
			}
		},
		setExpiryDate(state, action) {
			
	
			state.expiry_date = action.payload as string;
			
			if (state.expiry_date === '') {
				state.error_expiry_date = 'Expiry Date is required field';
			} else {
				state.error_expiry_date = '';
			}
		},
		setDescription(state, action) {
			state.description = action.payload as string;
			if (state.description === '') {
				state.error_description = 'Description is required field';
			} else {
				state.error_description = '';
			}
		},
		cleanForm(state) {
			state.promo_code = '';
			state.discount_percent = '';
			state.max_discount_price = '';
			state.min_order_price = '';
			state.apply_no_time = '';
			state.expiry_date = moment().format('DD-MM-YYYY');
			state.description = '';
		},
		forPromoUpdate(state, action) {
			state.forUpdate = action.payload as boolean;
		},
		promoDialog(state, action) {
			state.dialogOpen = !state.dialogOpen;
		},
		validateForm(state) {
			if (
				state.promo_code !== '' &&
				state.discount_percent !== '' &&
				state.max_discount_price !== '' &&
				state.min_order_price !== '' &&
				state.apply_no_time !== '' &&
				state.expiry_date !== '' &&
				state.description !== '' &&
				state.error_promo_code === '' &&
				state.error_discount_percent === '' &&
				state.error_max_discountprice === '' &&
				state.error_min_orderprice === '' &&
				state.error_apply_time === '' &&
				state.error_expiry_date === '' &&
				state.error_description === ''
			) {
				state.isFormValid = true;
			} else {
				state.isFormValid = false;
			}
		}
	},

	extraReducers: (builder) => {
		builder.addCase(addPromo.pending, (state) => {
			state.hasRoleCreated = false;
			state.isLoading = true;
		});
		builder.addCase(addPromo.fulfilled, (state, action) => {
			console.log(action)
			if(action.payload.message.includes("Promocode already exist")){
				state.error_promo_code = action.payload.message;
				state.isLoading = false;
			}else{
				state.hasRoleCreated = true;
				state.isLoading = false;
				state.dialogOpen = true;
				state.isFormValid = false;
				state.message = action.payload.message;
				state.forUpdate = false;
				state.promo_code = '';
				state.discount_percent = '';
				state.max_discount_price = '';
				state.min_order_price = '';
				state.apply_no_time = '';
				state.expiry_date = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
				state.description = '';
			}
		});
		builder.addCase(addPromo.rejected, (state) => {
			state.hasRoleCreated = false;
			state.isLoading = false;
		});
		builder.addCase(updatePromoById.pending, (state) => {
			state.hasRoleCreated = false;
			state.isLoading = true;
		});
		builder.addCase(updatePromoById.fulfilled, (state, action) => {
			state.hasRoleCreated = true;
			state.isLoading = false;
			state.dialogOpen = true;
			state.message = action.payload.message;
			state.isFormValid = false;
			state.forUpdate = false;
			state.promo_code = '';
			state.discount_percent = '';
			state.max_discount_price = '';
			state.min_order_price = '';
			state.apply_no_time = '';
			state.expiry_date = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
			state.description = '';
		});
		builder.addCase(updatePromoById.rejected, (state) => {
			state.hasRoleCreated = false;
			state.isLoading = false;
		});

		builder.addCase(fetchPromoById.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchPromoById.fulfilled, (state, action) => {
			state.promo = action.payload.data;
			state.isLoading = false;
			state.promo_code = state.promo.var_promocode;
			state.discount_percent = state.promo.var_percentage.toFixed(2);
			state.max_discount_price = state.promo.max_discount_price.toFixed(2);
			state.min_order_price = state.promo.max_discount_price.toFixed(2);
			state.apply_no_time = state.promo.no_of_time;
			state.expiry_date = state.promo.expiry_date;
			state.description = state.promo.txt_description;
		});
		builder.addCase(fetchPromoById.rejected, (state) => {
			state.isLoading = false;
		});
	}
});
export const {
	setPromoCode,
	setDiscountPercent,
	setMaxDiscount,
	setApplyNoTime,
	setMinPrice,
	setExpiryDate,
	setDescription,
	cleanForm,
	validateForm,
	promoDialog
} = addPromoSlice.actions;
export const selectAddPromoSlice = appSelector(({ addPromo }: AppRootStateType) => addPromo);

export type addPromoSliceType = typeof addPromoSlice;
export default addPromoSlice.reducer;
