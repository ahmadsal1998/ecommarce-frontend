export interface PromoModel {
	int_glcode: string;
	fk_user: string;
	var_promocode: string;
	no_of_time: string;
	expiry_date: string;
	var_price: number;
	var_percentage: number;
	min_order: number;
	txt_description: string;
	max_discount_price: number;
	chr_publish: boolean;
	chr_delete: boolean;
	dt_createddate: string;
	dt_modifydate: string;
	var_ipaddress: string;
}
