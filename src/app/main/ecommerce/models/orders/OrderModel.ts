import { AddressModel } from "../address/AddressModel";
import { BrandModel } from "../brands/BrandModel";
import { CategoryModel } from "../categories/Category";
import { OrderProductModel, ProductModel } from "../products/product/ProductModel";
import { VarientModel } from "../products/verient/VarientModel";
import { UserModel } from "../users/UsersModel";

export interface OrderModel {
	int_glcode: string;
	order_id: string;
	fk_user: string;
	fk_delivery: string;
	fk_vendor: string;
	fk_product_arr: Array<OrderProduct>;
	var_payment_mode: string;
	user: UserModel;
	chr_status: string;
	var_user_address: AddressModel;
	dt_timeslot: string;
	chr_delivery_status: string;
	dt_delivery_date: string;
	delivery_date1: string;
	delivery_date2: string;
	delivery_date3: string;
	var_alternate_mobile: string;
	register_contact: string;
	var_address_type: string;
	var_delivery_charge: string;
	var_wallet_amount: string;
	var_discount_amount: string;
	var_total_amount: string;
	var_payable_amount: string;
	var_cashback: string;
	var_promocode: string;
	canceled_by: string;
	var_promo_discount: string;
	var_tax: string;
	chr_delete: string;
	dt_createddate: string;
	var_ipaddress: string;
	returnOrder: Array<ReturnOrderModel>,
	invoices: Array<InvoiceModel>;
	comments: Array<CommentModel>
}
export interface CommentModel{
	int_glcode: string;
	order_id: string;
	message: string;
	dt_createddate: string;
	status: string;
  }
export interface OrderProduct{
	int_glcode: string;
	fk_category: string;
	fk_subcategory: string;
	fk_subcategory2: string;
	category: Array<CategoryModel>;
	brand: Array<BrandModel>;
	fk_brand: string;
	fk_tags: Array<string>;
	var_title: string;
	var_image: string;
	var_gst: string;
	var_short_description: string;
	txt_description: string;
	var_offer: string;
	var_price: string;
	var_quantity: string;
	txt_nutrition: string;
	display_order: string;
	chr_publish: boolean;
	home_display: string;
	chr_delete: boolean;
	dt_createddate: string;
	tax_amount: string;
	total_amount: string;
	var_unit: string;
	dt_modifydate: string;
	var_ipaddress: string;
	view_count: number;
	sold_count: number;
	variants: VarientModel;
}

export interface InvoiceModel  {
	int_glcode: string;
	order_id: string;
	invoice_id: string;
	dt_createddate: string;
	dt_orderdate: string;
	customer: object;
	status: string;
	amount: string;
	payment_method: string;

}
export interface ReturnOrderModel{
	int_glcode: string;
  return_id: string;
  order_id: string;
  fk_user: string;
  order_inglcode: string;
  fk_product_arr: OrderProductModel;
  chr_status: string;
  var_total_amount: string;
  var_payable_amount: string;
  var_tax: string;
  paid_status: string;
  paid_amount: string;
  customer_comment: string;
  admin_comment: string;
  dt_paid: string;
  dt_createddate: string;
  var_ipaddress: string;
  cancel_status: string;
}