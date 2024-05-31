import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { EscNavItemType } from '../types/EscNavItemType';

/**
 *  EscNavItemModel
 *  Constructs a navigation item based on EscNavItemType
 */
function EscNavItemModel(data?: PartialDeep<EscNavItemType>) {
	data = data || {};

	return _.defaults(data, {
		id: _.uniqueId(),
		title: '',
		translate: '',
		auth: null,
		subtitle: '',
		icon: '',
		iconClass: '',
		url: '',
		target: '',
		type: 'item',
		sx: {},
		disabled: false,
		active: false,
		exact: false,
		end: false,
		badge: null,
		children: []
	});
}

export default EscNavItemModel;
