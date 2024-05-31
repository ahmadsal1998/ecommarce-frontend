import { SxProps } from '@mui/system';
import { EscNavBadgeType } from './EscNavBadgeType';

/**
 * EscNavItemType
 * A type for Esc navigation item and its properties.
 */
export type EscNavItemType = {
	id: string;
	title?: string;
	translate?: string;
	auth?: string[] | string;
	subtitle?: string;
	icon?: string;
	iconClass?: string;
	url?: string;
	target?: string;
	type?: string;
	sx?: SxProps;
	disabled?: boolean;
	active?: boolean;
	exact?: boolean;
	end?: boolean;
	badge?: EscNavBadgeType;
	children?: EscNavItemType[];
	hasPermission?: boolean;
};

export type EscFlatNavItemType = Omit<EscNavItemType, 'children' | 'sx'> & { children?: string[]; order: string };
