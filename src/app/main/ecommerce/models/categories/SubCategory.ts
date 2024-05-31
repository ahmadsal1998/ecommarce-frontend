import { CategoryModel } from "./Category";

export interface SubCategoryModel {
	int_glcode: string;
	fk_parent: string;
	var_title: string;
	var_slug: string;
	var_icon: string;
	searchCount: number;
	viewCount: number;
	category: Array<CategoryModel>;
	created_date: string;
	updated_date: string;
	is_home_active: boolean;
	is_active: boolean;
}
