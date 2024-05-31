import { User } from 'src/app/auth/user';
import { EscFlatNavItemType, EscNavItemType } from '@esc/core/EscNavigation/types/EscNavItemType';
import EscNavItemModel from '@esc/core/EscNavigation/models/EscNavItemModel';
import _ from '@lodash';
import { PartialDeep } from 'type-fest';

class EscNavigationHelper {
	static selectById(nav: EscNavItemType[], id: string): EscNavItemType | undefined {
		for (let i = 0; i < nav.length; i += 1) {
			const item = nav[i];
			if (item.id === id) {
				return item;
			}

			if (item.children) {
				const childItem = this.selectById(item.children, id);
				if (childItem) {
					return childItem;
				}
			}
		}

		return undefined;
	}

	static appendNavItem(
		nav: EscNavItemType[],
		item: EscNavItemType,
		parentId: string | null = null
	): EscNavItemType[] {
		if (!parentId) {
			return [...nav, item];
		}
		return nav.map((node) => {
			if (node.id === parentId) {
				const newNode = { ...node };
				newNode.children = [...(node.children || []), item];
				return newNode;
			}
			if (node.children) {
				return { ...node, children: this.appendNavItem(node.children, item, parentId) };
			}
			return { ...node };
		});
	}

	static prependNavItem(
		nav: EscNavItemType[],
		item: EscNavItemType,
		parentId: string | null = null
	): EscNavItemType[] {
		if (!parentId) {
			return [item, ...nav];
		}
		return nav.map((node) => {
			if (node.id === parentId) {
				const newNode = { ...node };
				newNode.children = [item, ...(node.children || [])];
				return newNode;
			}
			if (node.children) {
				return { ...node, children: this.prependNavItem(node.children, item, parentId) };
			}
			return { ...node };
		});
	}

	static filterNavigationByPermission(nav: EscNavItemType[], userRole: User['role']): EscNavItemType[] {
		return nav.reduce((acc: EscNavItemType[], item) => {
			// If item has children, recursively filter them
			const children = item.children ? this.filterNavigationByPermission(item.children, userRole) : [];

			if (this.hasPermission(item.auth, userRole) || children.length) {
				const newItem = { ...item };
				newItem.children = children.length ? children : undefined;
				acc.push(newItem);
			}

			return acc;
		}, []);
	}

	/**
	 * The removeNavItem function removes a navigation item by its ID.
	 */
	static removeNavItem(nav: EscNavItemType[], id: string): EscNavItemType[] {
		return nav.reduce((acc, node) => {
			if (node.id !== id) {
				if (node.children) {
					acc.push({
						...node,
						children: this.removeNavItem(node.children, id)
					});
				} else {
					acc.push(node);
				}
			}
			return acc;
		}, [] as EscNavItemType[]);
	}

	/**
	 * The updateNavItem function updates a navigation item by its ID with new data.
	 */
	static updateNavItem(nav: EscNavItemType[], id: string, item: PartialDeep<EscNavItemType>): EscNavItemType[] {
		return nav.map((node) => {
			
			if (node.id === id) {
				return _.merge({}, node, item); // merge original node data with updated item data
			}
			if (node.children) {
				return {
					...node,
					children: this.updateNavItem(node.children, id, item)
				};
			}
			return node;
		});
	}

	/**
	 *  Convert to flat navigation
	 */
	static getFlatNavigation(navigationItems: EscNavItemType[] = [], flatNavigation = []) {
		for (let i = 0; i < navigationItems.length; i += 1) {
			const navItem = navigationItems[i];

			if (navItem.type === 'item') {
				const _navtItem = EscNavItemModel(navItem);
				flatNavigation.push(_navtItem);
			}

			if (navItem.type === 'collapse' || navItem.type === 'group') {
				if (navItem.children) {
					this.getFlatNavigation(navItem.children, flatNavigation);
				}
			}
		}
		return flatNavigation as EscNavItemType[] | [];
	}

	static hasPermission(authArr: string[] | string | undefined, userRole: User['role']): boolean {
		/**
		 * If auth array is not defined
		 * Pass and allow
		 */
		
		if (authArr === null || authArr === undefined) {
			return true;
		}

		if (authArr.length === 0) {
			/**
			 * if auth array is empty means,
			 * allow only user role is guest (null or empty[])
			 */
			return !userRole || userRole.length === 0;
		}

		/**
		 * Check if user has grants
		 */
		if (userRole && Array.isArray(authArr) && Array.isArray(userRole)) {
			return authArr.some((r: string) => userRole.indexOf(r) >= 0);
		}

		/*
            Check if user role is string,
            */
		return authArr.includes(userRole as string);
	}

	static flattenNavigation(navigation: EscNavItemType[], parentOrder: string = ''): EscFlatNavItemType[] {
		return navigation.flatMap((item, index) => {
			const order = parentOrder ? `${parentOrder}.${index + 1}` : `${index + 1}`;
			let flattened: EscFlatNavItemType[] = [
				{ ...item, order, children: item.children?.map((child) => child.id) }
			];

			if (item.children) {
				flattened = flattened.concat(this.flattenNavigation(item.children, order));
			}

			return flattened;
		});
	}

	static unflattenNavigation(navigation: EscFlatNavItemType[]): EscNavItemType[] {
		const itemMap: { [id: string]: EscNavItemType } = {};
		navigation.forEach((item) => {
			itemMap[item.id] = { ...item, children: [] };
		});

		const rootItems: EscNavItemType[] = [];

		navigation.forEach((item) => {
			if (item.order.includes('.')) {
				const parentOrder = item.order.substring(0, item.order.lastIndexOf('.'));
				const parent = navigation.find((navItem) => navItem.order === parentOrder);
				if (parent) {
					itemMap[parent.id].children.push(itemMap[item.id]);
				}
			} else {
				rootItems.push(itemMap[item.id]);
			}
		});

		return rootItems.map((item) => {
			const { ...rest } = item;
			return rest;
		});
	}
}

export default EscNavigationHelper;
