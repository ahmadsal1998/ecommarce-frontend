import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import withRouter from '@esc/core/withRouter';
import { Link, ListItemButton, ListItemButtonProps } from '@mui/material';
import { WithRouterProps } from '@esc/core/withRouter/withRouter';
import EscNavBadge from '../../EscNavBadge';
import EscSvgIcon from '../../../EscSvgIcon';
import { EscNavItemComponentProps } from '../../EscNavItem';

const Root = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => ({
	color: theme.palette.text.primary,
	textDecoration: 'none!important',
	minHeight: 48,
	'&.active': {
		backgroundColor: `${theme.palette.secondary.main}!important`,
		color: `${theme.palette.secondary.contrastText}!important`,
		pointerEvents: 'none',
		'& .esc-list-item-text-primary': {
			color: 'inherit'
		},
		'& .esc-list-item-icon': {
			color: 'inherit'
		}
	},
	'& .esc-list-item-icon': {},
	'& .esc-list-item-text': {
		padding: '0 0 0 16px'
	}
}));

type EscNavHorizontalLinkProps = EscNavItemComponentProps & WithRouterProps;

/*
 * EscNavHorizontalLink
 * This is a component to render horizontal navigation links in the Esc navigations.
 * It receieves `EscNavItemComponentProps` and `WithRouterProps` as props.
 */
function EscNavHorizontalLink(props: EscNavHorizontalLinkProps) {
	const { item, checkPermission } = props;

	let itemProps;

	const component = item.url ? Link : 'li';

	if (typeof component !== 'string') {
		itemProps = {
			disabled: item.disabled,
			href: item.url,
			role: 'button',
			target: item.target ? item.target : '_blank'
		};
	}

	if (checkPermission && !item?.hasPermission) {
		return null;
	}

	return useMemo(
		() => (
			<Root
				component={component}
				className={clsx('esc-list-item')}
				sx={item.sx}
				{...itemProps}
			>
				{item.icon && (
					<EscSvgIcon
						className={clsx('esc-list-item-icon shrink-0', item.iconClass)}
						color="action"
					>
						{item.icon}
					</EscSvgIcon>
				)}

				<ListItemText
					className="esc-list-item-text"
					primary={item.title}
					classes={{ primary: 'text-13 esc-list-item-text-primary truncate' }}
				/>

				{item.badge && (
					<EscNavBadge
						className="ltr:ml-8 rtl:mr-8"
						badge={item.badge}
					/>
				)}
			</Root>
		),
		[item.badge, item.icon, item.iconClass, item.target, item.title, item.url]
	);
}

const NavHorizontalLink = withRouter(memo(EscNavHorizontalLink));

export default NavHorizontalLink;
