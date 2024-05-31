import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { OrderModel, ReturnOrderModel } from '../../models/orders/OrderModel';
import { addOrderComment, fetchOrders, getOrderById } from '../../respositories/orders/OrderRepo';

export const getStatus = (status: unknown) => {
	switch (status) {
		case 'A':
			return 'Received';

		case 'C':
			return 'Cancelled';
		case 'D':
			return 'Delivered';
		case 'S':
			return 'Shipped';
		case 'P':
			return 'Processed';
		case 'R':
			return 'Returned';

		default:
			return '';
	}
};

type AppRootStateType = RootStateType<orderSliceType>;
type initialStateProps = {
	orders: Array<OrderModel>;
	selectedOrder: OrderModel;
	isSelected: boolean;
	isLoading: boolean;
	rows: Array<object>;
	error: string;
	allDataSelected: boolean;
	total: number;
	selectedRows: Array<string>;
	searchText: string;
	page: number;
	dialogOpen: boolean;
	toDate: string;
	fromDate: string;
	comment: string;
	status: string;
	csvRows: Array<Array<object>>;
	finalCsvRow: Array<object>;
	commentValid: boolean;
	message: string;
	commentAdding: boolean;
	pageSize: number;
	selectedReturnOrder : ReturnOrderModel;
	sort: { _id: number };
};

const initialState: initialStateProps = {
	orders: [],
	rows: [],
	isSelected: false,
	selectedOrder: null,
	isLoading: true,
	error: '',
	commentAdding: false,
	page: 1,
	fromDate: `01-01-${new Date().getFullYear()}`,
	toDate: `31-12-${new Date().getFullYear()}`,
	message: '',
	allDataSelected: false,
	pageSize: 10,
	sort: { _id: -1 },
	total: 0,
	selectedReturnOrder: null,
	dialogOpen: false,
	selectedRows: [],
	searchText: '',
	comment: '',
	status: '',
	finalCsvRow:[],
	csvRows:[],
	commentValid: false
};
export const orderSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		setOrders(state, action) {
			state.orders.concat(action.payload as Array<OrderModel>);
		},
		setOrderSelection(state, action) {
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
			state.csvRows[state.page] = state.rows.filter((row:{id: string})=>{
				return state.selectedRows.indexOf(row.id) !==-1;
			})
			state.finalCsvRow = [];
			state.csvRows.forEach((data)=>{
				state.finalCsvRow = [...state.finalCsvRow, ...data]
			})
		},
		setFinalCsv(state, action){
			const orders = action.payload as Array<OrderModel>;
			if(orders.length>0){
			for (let i: number = 0; i < orders.length; i += 1) {
				
				state.finalCsvRow.push({
					id: orders[i].int_glcode,
					order_id: orders[i].order_id,
					name: orders[i].user?orders[i].user.var_name:"",
					mobile_no: orders[i].user?orders[i].user.var_mobile_no:"",
					payable_amount: state.orders[i].var_payable_amount,
					delivery_mode: 'Company delivery mode',
					payable_mode: orders[i].var_payment_mode === 'C' ? 'Cash' : 'Online',
					date: orders[i].dt_createddate,
					status: getStatus(orders[i].chr_status)
				}) 
			}
			}else{
				state.finalCsvRow = [];
			}
		},
		orderDialogOpenClose(state, action) {
			state.dialogOpen = !state.dialogOpen;
		},
		clearCommentData(state, action) {
			state.comment = '';
			state.status = 'Select';
		},
		setToDate(state, action) {
			state.toDate = action.payload as string;
		},
		setFromDate(state, action) {
			state.fromDate = action.payload as string;
		},
		searchOrder(state, action) {
			state.searchText = action.payload as string;
		},
		setStatus(state, action) {
			state.status = action.payload as string;
		},
		setReturnOrder(state, action) {
			console.log("order return order", action.payload)
			state.selectedReturnOrder = action.payload as ReturnOrderModel;
		},
		setComment(state, action) {
			state.comment = action.payload as string;
		},
		isCommentValid(state, action) {
			if (state.comment === '' || state.status === 'Select') {
				state.commentValid = false;
			} else {
				state.commentValid = true;
			}
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
		builder.addCase(fetchOrders.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchOrders.fulfilled, (state, action) => {
			state.isLoading = false;
			console.log(action.payload)
			state.orders = action.payload.data;
			state.total = action.payload.total;
			state.rows = [];
			
			
			for (let i: number = 0; i < state.orders.length; i += 1) {
				
				state.orders[i].chr_status = getStatus(state.orders[i].chr_status);
				state.rows.push({
					id: state.orders[i].int_glcode,
					order_id: state.orders[i].order_id,
					name: state.orders[i].user?state.orders[i].user.var_name:"",
					mobile_no: state.orders[i].user?state.orders[i].user.var_mobile_no:"",
					payable_amount: state.orders[i].var_payable_amount,
					delivery_mode: 'Company delivery mode',
					payable_mode: state.orders[i].var_payment_mode === 'C' ? 'Cash' : 'Online',
					date: state.orders[i].dt_createddate,
					status: state.orders[i].chr_status
				});
			}
		});
		builder.addCase(fetchOrders.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		});
		builder.addCase(getOrderById.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getOrderById.fulfilled, (state, action) => {
			state.isLoading = false;
			state.selectedOrder = action.payload.data;
			state.selectedOrder.chr_status = getStatus(state.selectedOrder.chr_status );
		});
		builder.addCase(getOrderById.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		});

		builder.addCase(addOrderComment.pending, (state) => {
			state.commentAdding = true;
		});
		builder.addCase(addOrderComment.fulfilled, (state, action) => {
			state.commentAdding = false;
			state.dialogOpen = true;
			state.message = action.payload.message;
		});
		builder.addCase(addOrderComment.rejected, (state, action) => {
			state.commentAdding = false;
		});
	}
});
export const {
	setOrders,
	setStatus,
	orderDialogOpenClose,
	clearCommentData,
	setComment,
	isCommentValid,
	setOrderSelection,
	searchOrder,
	setFinalCsv,
	setPage,
	setReturnOrder,
	setPageSize,
	setSort,
	setToDate,
	setFromDate
} = orderSlice.actions;
export const selectOrderSlice = appSelector(({ orders }: AppRootStateType) => orders);

export type orderSliceType = typeof orderSlice;
export default orderSlice.reducer;
