import { EscNavItemType } from './types/EscNavItemType';

const components: { [key: string]: React.FC<unknown> } = {};

/**
 * Register a component to EscNavItem.
 */
export function registerComponent<T = unknown>(name: string, Component: React.FC<T>) {
	components[name] = Component as React.FC<unknown>;
}

export type EscNavItemComponentProps = {
	type: string;
	item: EscNavItemType;
	dense?: boolean;
	nestedLevel?: number;
	onItemClick?: (T: EscNavItemType) => void;
	checkPermission?: boolean;
};

/**
Component to render NavItem depending on its type.
*/
export default function EscNavItem(props: EscNavItemComponentProps) {
	const { type } = props;
	
	const C = components[type];

	return C ? <C {...(props as object)} /> : null;
}
