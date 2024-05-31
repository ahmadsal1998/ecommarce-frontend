import { RoleModel } from "./RoleModel";

export interface UserModel {
	user_id: string;
	var_email: string;
	var_mobile_no: string;
	var_name: string;
	var_alt_mobile: string;
	var_default_no: string;
	var_password: string;
	var_image: string;
	chr_verify: string;
	role: Array<RoleModel>;
	var_device_token: string;
	refferal_code: string;
	created_date: string;
	updated_date: string;
	is_active: boolean;
	role_id: string;
	user_type: string;
	accessToken: string;
}
