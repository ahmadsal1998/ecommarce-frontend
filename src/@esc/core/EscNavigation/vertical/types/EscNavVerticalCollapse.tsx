import NavLinkAdapter from '@esc/core/NavLinkAdapter';
import { alpha, styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import List, { ListProps } from '@mui/material/List';
import isUrlInChildren from '@esc/core/EscNavigation/isUrlInChildren';
import type { Location } from 'history';
import { ListItemButton } from '@mui/material';
import EscNavBadge from '../../EscNavBadge';
import EscNavItem, { EscNavItemComponentProps } from '../../EscNavItem';
import EscSvgIcon from '../../../EscSvgIcon';
import { EscNavItemType } from '../../types/EscNavItemType';
import { selectEscNavbar, setNavItem } from 'app/theme-layouts/shared-components/navbar/store/navbarSlice';
import { useAppDispatch } from 'app/store/store';


type ListComponentProps = ListProps & {
	itempadding: number;
};

const Root = styled(List)<ListComponentProps>(({ theme, ...props }) => ({
	padding: 0,
	'&.open': {},
	'.icon-only':{
		position:'absolute',
		right:15
	},
	'& > .esc-list-item': {
		minHeight: 44,
		width: '100%',
		borderRadius: '6px',
		margin: '0 0 4px 0',
		paddingRight: 16,
		paddingLeft: props.itempadding > 80 ? 80 : props.itempadding,
		paddingTop: 10,
		paddingBottom: 10,
		color: alpha(theme.palette.text.primary, 0.7),
		'&:hover': {
			color: theme.palette.text.primary
		},
		'& > .esc-list-item-icon': {
			marginRight: 16,
			color: 'inherit'
		}
	}
}));

function needsToBeOpened(location: Location, item: EscNavItemType) {
	return location && isUrlInChildren(item, location.pathname);
}

/**
 * EscNavVerticalCollapse component used for vertical navigation items with collapsible children.
 */
function EscNavVerticalCollapse(props: EscNavItemComponentProps) {
	const location = useLocation();
	const { item, nestedLevel = 0, onItemClick, checkPermission } = props;

	const [open, setOpen] = useState(() => needsToBeOpened(location, item));
	const navbar = useSelector(selectEscNavbar);
	const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;

	useEffect(() => {
		if (needsToBeOpened(location, item)) {
			if (!open) {
				setOpen(true);
			}
		}
		// eslint-disable-next-line
	}, [location, item]);

	const component = item.url ? NavLinkAdapter : 'li';

	let itemProps = {};

	if (typeof component !== 'string') {
		itemProps = {
			disabled: item.disabled,
			to: item.url,
			end: item.end,
			role: 'button'
		};
	}

	if (checkPermission && !item?.hasPermission) {
		return null;
	}

	
	return useMemo(
		() => (
			<Root
				className={clsx(open && 'open')}
				itempadding={itempadding}
				sx={item.sx}
			>
				
				<ListItemButton
					component={component}
					className="esc-list-item"
					onClick={() => {
						setOpen(!open);
					}}
					{...itemProps}
				>
					{item.icon && (
						<EscSvgIcon
							className={clsx(!navbar.open?nestedLevel>0?'esc-list-item-icon shrink-0 icon-only-nest':'esc-list-item-icon shrink-0 icon-only':'esc-list-item-icon shrink-0', item.iconClass)}
							color="action"
							
						>
							{item.icon}
						</EscSvgIcon>
					)}
				{navbar.open?
					<ListItemText
						className="esc-list-item-text"
						primary={item.title}
						secondary={item.subtitle}
						classes={{
							primary: 'text-13 font-medium esc-list-item-text-primary truncate',
							secondary: 'text-11 font-medium esc-list-item-text-secondary leading-normal truncate'
						}}
					/>
					:null
				}
					{item.badge && (
						<EscNavBadge
							className="mx-4"
							badge={item.badge}
						/>
					)}

					{navbar.open?<IconButton
						disableRipple
						className="-mx-12 h-20 w-20 p-0 hover:bg-transparent focus:bg-transparent"
						onClick={(ev) => {
							ev.preventDefault();
							ev.stopPropagation();
							setOpen(!open);
						}}
						size="large"
					>
						<EscSvgIcon
							size={16}
							className="arrow-icon"
							color="inherit"
						>
							{open ? 'heroicons-solid:chevron-down' : 'heroicons-solid:chevron-right'}
						</EscSvgIcon>
					</IconButton>
						:null
					}
				</ListItemButton>
			

				{item.children && (
					<Collapse
						in={open}
						className="collapse-children"
					>
						{item.children.map((_item) => (
							<EscNavItem
								key={_item.id}
								type={`vertical-${_item.type}`}
								item={_item}
								nestedLevel={nestedLevel + 1}
								onItemClick={onItemClick}
								checkPermission={checkPermission}
							/>
						))}
					</Collapse>
				)}
			</Root>
		),
		[
			item.badge,
			item.children,
			item.icon,
			item.iconClass,
			item.title,
			item.url,
			itempadding,
			nestedLevel,
			onItemClick,
			open,
			navbar
		]
	);
}

const NavVerticalCollapse = EscNavVerticalCollapse;

export default NavVerticalCollapse;
