export interface AddressModel {
	address_id: number;
	int_glcode: string;
	fk_user: string;
	var_house_no: string;
	var_app_name: string;
	var_landmark: string;
	var_country: string;
	var_state: string;
	var_city: string;
	var_pincode: string;
	chr_type: string;
	default_status: string;
	chr_publish: boolean;
	chr_delete: boolean;
	dt_createddate: string;
	dt_modifydate: string;
	var_ipaddress: string;
}
