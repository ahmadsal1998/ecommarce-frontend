import { AttributeModel } from '../attributes/AttributeModel';

export interface VarientModel {
	price: string;
	selling_price: string;
	stock: string;
	error_price: string;
	error_selling_price: string;
	error_stock: string;
	isFormValid: boolean;
	image: Array<string>;
	attributes: Array<AttributeModel>;
}
