import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { ProductModel } from '../../models/products/product/ProductModel';
import { deleteProductsByIds, fetchProduct, updateProductsStatusById } from '../../respositories/product/ProductRepo';

type AppRootStateType = RootStateType<productSliceType>;
type initialStateProps = {
	products: Array<ProductModel>;
	isSelected: boolean;
	rows: Array<object>;
	searchText: string;
	page: number;
	total: number;
	selectedRows: Array<string>;
	pageSize: number;
	sort: { _id: number };
	isLoading: boolean;
	allDataSelected: boolean;
	csvRows: Array<Array<object>>;
	finalCsvRow: Array<object>;
	isDeleted: boolean;
	isStatusChange: boolean;
	forUpdate: boolean;
};
const initialState: initialStateProps = {
	products: [],
	isSelected: false,
	page: 1,
	isLoading: false,
	isDeleted: false,
	rows: [],
	allDataSelected: false,
	pageSize: 10,
	sort: { _id: -1 },
	total: 0,
	selectedRows: [],
	finalCsvRow:[],
	csvRows:[],
	searchText: '',
	isStatusChange: false,
	forUpdate: false
};
export const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProduct(state, action) {
			state.products.push(action.payload as ProductModel);
		},
		setSelected(state, action) {
			state.isSelected = action.payload as boolean;
		},
		setProducts(state, action) {
			state.products.concat(action.payload as Array<ProductModel>);
		},
		setProductSelection(state, action) {
			if (state.selectedRows.length === 0) {
				if (state.rows.length === (action.payload as []).length) {
					state.selectedRows = action.payload as [];
					state.allDataSelected = true;
				} else {
					state.selectedRows = action.payload as [];
				}
			} else if ((action.payload as []).length === 0) {
				state.allDataSelected = false;
				state.selectedRows = [];
			} else {
				state.selectedRows = action.payload as [];
			}
			state.isSelected = state.selectedRows.length > 0;
			state.isSelected = state.selectedRows.length > 0;
			state.csvRows[state.page] = state.rows.filter((row:{
				publish: any;id: string
			})=>{
				
				return state.selectedRows.indexOf(row.id) !==-1;
			})
			state.finalCsvRow = [];
			state.csvRows.forEach((data)=>{
				
				state.finalCsvRow = [...state.finalCsvRow, ...data];
				
			})
		},
		setFinalCsv(state, action){
			const products = action.payload as Array<ProductModel>;
			if(products.length>0){
			for (let i: number = 0; i < products.length; i += 1) {
				
				state.finalCsvRow.push({
					id: products[i].int_glcode ? products[i].int_glcode : i,
					image: products[i].var_image,
					name: products[i].var_title,
					category: products[i].category[0].var_title,
					brand: products[i].brand[0].var_title,
					homedisplay: products[i].home_display ? products[i].home_display : false,
					publish: (products[i].chr_publish as boolean)?"Active":"Inactive"
				}) 
			}
			}else{
				state.finalCsvRow = [];
			}
		},
		searchProduct(state, action) {
			state.searchText = action.payload as string;
		},
		setPage(state, action) {
			state.page = action.payload as number;
		},
		setPageSize(state, action) {
			state.pageSize = action.payload as number;
		},
		setSort(state, action) {
			state.sort = action.payload as { _id: -1 };
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProduct.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchProduct.fulfilled, (state, action) => {
			state.isLoading = false;
			state.products = action.payload.data;
			state.total = action.payload.total;
			state.rows = [];
		
			for (let i: number = 0; i < state.products.length; i += 1) {
				
				state.rows.push({
					id: state.products[i].int_glcode ? state.products[i].int_glcode : i,
					image: state.products[i].var_image,
					name: state.products[i].var_title,
					category: state.products[i].category[0].var_title,
					brand: state.products[i].brand[0].var_title,
					homedisplay: state.products[i].home_display ? state.products[i].home_display : false,
					publish: (state.products[i].chr_publish as boolean)?"Active":"Inactive"
				});
			}
		});
		builder.addCase(fetchProduct.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(updateProductsStatusById.pending, (state) => {
			state.isLoading = true;
			state.isStatusChange = false;
		});
		builder.addCase(updateProductsStatusById.fulfilled, (state) => {
			state.isLoading = false;
			state.isStatusChange = true;
		});
		builder.addCase(updateProductsStatusById.rejected, (state) => {
			state.isLoading = false;
			state.isStatusChange = false;
		});

		builder.addCase(deleteProductsByIds.pending, (state) => {
			state.isLoading = true;
			state.isDeleted = false;
		});
		builder.addCase(deleteProductsByIds.fulfilled, (state) => {
			state.isLoading = false;
			state.isDeleted = true;
		});
		builder.addCase(deleteProductsByIds.rejected, (state) => {
			state.isLoading = false;
			state.isDeleted = false;
		});
	}
});
export const {
	setProduct,
	setFinalCsv,
	setProducts,
	setSelected,
	searchProduct,
	setPageSize,
	setSort,
	setProductSelection,
	setPage
} = productSlice.actions;
export const selectProdictSlice = appSelector(({ products }: AppRootStateType) => products);

export type productSliceType = typeof productSlice;
export default productSlice.reducer;
