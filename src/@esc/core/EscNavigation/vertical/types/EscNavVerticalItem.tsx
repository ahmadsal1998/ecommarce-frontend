import NavLinkAdapter from '@esc/core/NavLinkAdapter';
import { alpha, styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { ListItemButton, ListItemButtonProps } from '@mui/material';
import EscNavBadge from '../../EscNavBadge';
import EscSvgIcon from '../../../EscSvgIcon';
import { EscNavItemComponentProps } from '../../EscNavItem';
import { selectEscNavbar } from 'app/theme-layouts/shared-components/navbar/store/navbarSlice';


type ListItemButtonStyleProps = ListItemButtonProps & {
	itempadding: number;
};

const Root = styled(ListItemButton)<ListItemButtonStyleProps>(({ theme, ...props }) => ({
	minHeight: 44,
	width: '100%',
	borderRadius: '6px',
	margin: '0 0 4px 0',
	paddingRight: 16,
	paddingLeft: props.itempadding > 80 ? 80 : props.itempadding,
	paddingTop: 10,
	paddingBottom: 10,
	color: alpha(theme.palette.text.primary, 0.7),
	cursor: 'pointer',
	textDecoration: 'none!important',
	'&:hover': {
		color: theme.palette.text.primary
	},
	'.icon-only':{
		position:'absolute',
		right:15
	},
	'.icon-only-nest':{
		position:'absolute',
		right:10
	},
	'&.active': {
		color: theme.palette.text.primary,
		backgroundColor:
			theme.palette.mode === 'light' ? 'rgba(0, 0, 0, .05)!important' : 'rgba(255, 255, 255, .1)!important',
		pointerEvents: 'none',
		transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
		'& > .esc-list-item-text-primary': {
			color: 'inherit'
		},
		'& > .esc-list-item-icon': {
			color: 'inherit'
		}
	},
	'& >.esc-list-item-icon': {
		marginRight: 16,
		color: 'inherit'
	},
	'& > .esc-list-item-text': {}
}));

/**
 * EscNavVerticalItem is a React component used to render EscNavItem as part of the Esc navigational component.
 */
function EscNavVerticalItem(props: EscNavItemComponentProps) {
	const { item, nestedLevel = 0, onItemClick, checkPermission } = props;
	const navbar = useSelector(selectEscNavbar);
	const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;
	
	const component = item.url ? NavLinkAdapter : 'li';
	let itemProps = {};

	if (typeof component !== 'string') {
		itemProps = {
			disabled: item.disabled,
			to: item.url || '',
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
				component={component}
				className={clsx('esc-list-item', item.active && 'active')}
				onClick={() => onItemClick && onItemClick(item)}
				itempadding={itempadding}
				sx={item.sx}
				{...itemProps}
			>
				{item.icon && (
					<EscSvgIcon
						className={clsx(!navbar.open?nestedLevel>0?'esc-list-item-icon shrink-0 icon-only-nest':'esc-list-item-icon shrink-0 icon-only':'esc-list-item-icon shrink-0', item.iconClass)}
						color="action"
						size={nestedLevel>0?18:24}
					>
						{item.icon}
					</EscSvgIcon>
				)}
				{navbar.open?
				<ListItemText
					className="esc-list-item-text"
					primary={item.title }
					secondary={item.subtitle}
					classes={{
						primary: 'text-13 font-medium esc-list-item-text-primary truncate',
						secondary: 'text-11 font-medium esc-list-item-text-secondary leading-normal truncate'
					}}
				/>:null
				}
				{item.badge && <EscNavBadge badge={item.badge} />}
			</Root>
		),
		[item, itempadding, onItemClick,navbar]
	);
}

const NavVerticalItem = EscNavVerticalItem;

export default NavVerticalItem;
