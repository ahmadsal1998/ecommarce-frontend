import { BrandModel } from '../../brands/BrandModel';
import { CategoryModel } from '../../categories/Category';
import { VarientModel } from '../verient/VarientModel';

export interface ProductModel {
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
	sku_id: string;
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
	dt_modifydate: string;
	var_ipaddress: string;
	view_count: number;
	sold_count: number;
	variants: Array<VarientModel>;
}


export interface OrderProductModel {
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
	sku_id: string;
	var_short_description: string;
	txt_description: string;
	var_offer: string;
	var_price: string;
	var_quantity: string;
	txt_nutrition: string;
	display_order: string;
	tax_amount: string;
	var_unit: string
	total_amount: string;
	chr_publish: boolean;
	home_display: string;
	chr_delete: boolean;
	dt_createddate: string;
	dt_modifydate: string;
	var_ipaddress: string;
	view_count: number;
	sold_count: number;
	variants: VarientModel;
}
