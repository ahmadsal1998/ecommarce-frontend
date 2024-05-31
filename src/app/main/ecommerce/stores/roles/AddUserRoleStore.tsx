import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { RoleModel } from '../../models/users/RoleModel';
import { addUserRole, getUserRoleById, updateUserRoleById } from '../../respositories/users/RoleRepo';

type AppRootStateType = RootStateType<addRoleSliceType>;

const subRolos = [
	{
		id: 1,
		title: 'Dashboard',
		code: 'dashboard',
		selected: false,
		routes: ['dashboard']
	},
	{
		id: 2,
		title: 'User Management',
		code: 'user-management',
		selected: false,
		routes: ['users', 'add_user', 'rols']
	},
	{
		id: 3,
		title: 'Category Management',
		code: 'category-management',
		selected: false,
		routes: ['categories', 'parentcategories', 'subcategories', 'addsubcategories']
	},
	{
		id: 4,
		title: 'Brand Management',
		code: 'brand-management',
		selected: false,
		routes: ['brands', 'addbrand']
	},
	{
		id: 5,
		title: 'Tag Management',
		code: 'tag-management',
		selected: false,
		routes: ['tags', 'addtag']
	},
	{
		id: 6,
		title: 'Attributes Management',
		code: 'attributes-management',
		selected: false,
		routes: ['attributes', 'addattribute', 'attributesvalues', 'addattributevalue']
	},
	{
		id: 7,
		title: 'Product Management',
		code: 'product-management',
		selected: false,
		routes: ['producst', 'attributes', 'plist']
	},
	{
		id: 8,
		title: 'Order List',
		code: 'orderlist',
		selected: false,
		routes: ['orders', 'olist', 'orejection']
	},
	{
		id: 9,
		title: 'Order Rejection Reasons',
		code: 'order-rejection-reasons',
		selected: false,
		routes: ['orejection']
	},
	{
		id: 10,
		title: 'Banner Image',
		code: 'banner-image',
		selected: false,
		routes: ['bannsers', 'bannerImages', 'offerbanner']
	},
	{
		id: 11,
		title: 'Offer Banner Image',
		code: 'offer-banner-image',
		selected: false,
		routes: ['offer_banners', 'add_offer_banner']
	},
	{
		id: 12,
		title: 'Delivery Boy List',
		code: 'delivery-boy-list',
		selected: false,
		routes: ['deviveries','dblist']
	},
	{
		id: 13,
		title: 'Delivery Charge',
		code: 'delivery-charge',
		selected: false,
		routes: ['deviveries', 'dvcharges']
	},
	{
		id: 14,
		title: 'Rider Withdraw Request',
		code: 'rider-withdraw-request',
		selected: false,
		routes: ['deviveries','timeslots']
	},
	{
		id: 15,
		title: 'Delivery Time Slots',
		code: 'delivery-time-slots',
		selected: false,
		routes: ['timeslots']
	},
	{
		id: 16,
		title: 'Promocode',
		code: 'promocode',
		selected: false,
		routes: ['promocode','offers']
	},
	{
		id: 17,
		title: 'Refferal Code Cashback',
		code: 'refferal-code-cashback',
		selected: false,
		
	},
	{
		id: 18,
		title: 'Newsletter Management',
		code: 'newsletter-management',
		selected: false,
		routes: ['newsletter', 'others']
	},
	{
		id: 19,
		title: 'Feedback Management',
		code: 'feedback-management',
		selected: false,
		routes: ['others','contactus']
	},
	{
		id: 20,
		title: 'Contact MAnagement',
		code: 'contact-management',
		selected: false,
		routes: ['contacts']
	},
	{
		id: 21,
		title: 'Settings',
		code: 'settings',
		selected: false,
		routes: ['setting']
	}
];
type initialStateProps = {
	roles: Array<RoleModel>;
	SubRoles: Array<object>;
	isFormValid: boolean;
	userRole: RoleModel;
	isLoading: boolean;
	name: string;
	error_name: string;
	forUpdate: boolean;
	error_message: string;
	hasRoleCreated: boolean;
	dialogOpen: boolean;
	message: string;
};

const initialState: initialStateProps = {
	roles: [],
	error_message: '',
	isFormValid: false,
	forUpdate: false,
	userRole: null,
	isLoading: false,
	SubRoles: subRolos,
	name: '',
	error_name: '',
	hasRoleCreated: false,
	dialogOpen: false,
	message: ''
};

export const addRoleSlice = createSlice({
	name: 'addRole',
	initialState,
	reducers: {
		setName(state, action) {
			state.name = action.payload as string;
			if (state.name === '') {
				state.error_name = 'Name is required field';
			} else {
				state.error_name = '';
			}
		},
		setSubRole(state, action) {
			(state.SubRoles[action.payload as number] as { selected: boolean }).selected = true;
		},
		roleDialogToggle(state, action) {
			state.dialogOpen = !state.dialogOpen;
		},
		deleteSubRole(state, action) {
			(state.SubRoles[action.payload as number] as { selected: boolean }).selected = false;
		},
		checkformValidation(state) {
			if (state.error_name === '' && state.name !== '') {
				state.isFormValid = true;
			} else {
				state.isFormValid = false;
			}
		},
		clearForm(state) {
			state.isFormValid = false;
			state.forUpdate = false;
			state.name = '';
			state.SubRoles.forEach((data: { selected: boolean }) => {
				data.selected = false;
			});
		},
		forUserRoleUpdate(state, action) {
			state.forUpdate = action.payload as boolean;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addUserRole.pending, (state) => {
			state.hasRoleCreated = false;
			state.isLoading = true;
		});
		builder.addCase(addUserRole.fulfilled, (state, action) => {
			state.hasRoleCreated = true;
			state.isLoading = false;
			state.dialogOpen = true;
			state.isFormValid = false;
			state.message = action.payload.message;
			state.forUpdate = false;
			state.name = '';
			state.SubRoles.forEach((data: { selected: boolean }) => {
				data.selected = false;
			});
		});
		builder.addCase(addUserRole.rejected, (state) => {
			state.hasRoleCreated = false;
			state.isLoading = false;
		});
		builder.addCase(updateUserRoleById.pending, (state) => {
			state.hasRoleCreated = false;
			state.isLoading = true;
		});
		builder.addCase(updateUserRoleById.fulfilled, (state, action) => {
			state.hasRoleCreated = true;
			state.isLoading = false;
			state.dialogOpen = true;
			state.message = action.payload.message;
			state.isFormValid = false;
			state.forUpdate = false;
			state.name = '';
			state.SubRoles.forEach((data: { selected: boolean }) => {
				data.selected = false;
			});
		});
		builder.addCase(updateUserRoleById.rejected, (state) => {
			state.hasRoleCreated = false;
			state.isLoading = false;
		});

		builder.addCase(getUserRoleById.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getUserRoleById.fulfilled, (state, action) => {
			state.isLoading = false;
			state.name = action.payload.data.lable;
			state.userRole = action.payload.data;
			action.payload.data.subroles.forEach((data: { selected: boolean; id: number }) => {
				state.SubRoles[data.id - 1] = data;
			});
		});
		builder.addCase(getUserRoleById.rejected, (state) => {
			state.isLoading = false;
		});
	}
});

export const {
	clearForm,
	checkformValidation,
	forUserRoleUpdate,
	deleteSubRole,
	setSubRole,
	setName,
	roleDialogToggle
} = addRoleSlice.actions;
export const selectAddRoleLice = appSelector(({ addRole }: AppRootStateType) => addRole);

export type addRoleSliceType = typeof addRoleSlice;
export default addRoleSlice.reducer;
