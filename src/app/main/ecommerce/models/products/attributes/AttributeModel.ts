import { AttributeValueModel } from './AttributeValueModel';

export interface AttributeModel {
	values: Array<AttributeValueModel>;
	int_glcode: string;
	var_title: string;
	attribute_id: string;
	created_date: string;
	updated_date: string;
	is_active: boolean;
	isChecked: boolean;
	var_type: string;
	colorCode: string;
	is_deletable: boolean;
	value: AttributeValueModel;
}
	