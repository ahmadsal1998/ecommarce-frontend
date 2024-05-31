import Divider from '@mui/material/Divider';
import { memo } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import EscNavHorizontalLayout1 from './horizontal/EscNavHorizontalLayout1';
import EscNavVerticalLayout1 from './vertical/EscNavVerticalLayout1';
import EscNavVerticalLayout2 from './vertical/EscNavVerticalLayout2';
import EscNavHorizontalCollapse from './horizontal/types/EscNavHorizontalCollapse';
import EscNavHorizontalGroup from './horizontal/types/EscNavHorizontalGroup';
import EscNavHorizontalItem from './horizontal/types/EscNavHorizontalItem';
import EscNavHorizontalLink from './horizontal/types/EscNavHorizontalLink';
import EscNavVerticalCollapse from './vertical/types/EscNavVerticalCollapse';
import EscNavVerticalGroup from './vertical/types/EscNavVerticalGroup';
import EscNavVerticalItem from './vertical/types/EscNavVerticalItem';
import EscNavVerticalLink from './vertical/types/EscNavVerticalLink';
import { registerComponent } from './EscNavItem';
import { EscNavItemType } from './types/EscNavItemType';

const inputGlobalStyles = (
	<GlobalStyles
		styles={() => ({
			'.popper-navigation-list': {
				'& .esc-list-item': {
					padding: '8px 12px 8px 12px',
					height: 40,
					minHeight: 40,
					'& .esc-list-item-text': {
						padding: '0 0 0 8px'
					}
				},
				'&.dense': {
					'& .esc-list-item': {
						minHeight: 32,
						height: 32,
						'& .esc-list-item-text': {
							padding: '0 0 0 8px'
						}
					}
				}
			}
		})}
	/>
);

/*
Register Esc Navigation Components
 */
registerComponent('vertical-group', EscNavVerticalGroup);
registerComponent('vertical-collapse', EscNavVerticalCollapse);
registerComponent('vertical-item', EscNavVerticalItem);
registerComponent('vertical-link', EscNavVerticalLink);
registerComponent('horizontal-group', EscNavHorizontalGroup);
registerComponent('horizontal-collapse', EscNavHorizontalCollapse);
registerComponent('horizontal-item', EscNavHorizontalItem);
registerComponent('horizontal-link', EscNavHorizontalLink);
registerComponent('divider', () => <Divider className="my-16" />);
registerComponent('vertical-divider', () => <Divider className="my-16" />);
registerComponent('horizontal-divider', () => <Divider className="my-16" />);

export type EscNavigationProps = {
	className?: string;
	dense?: boolean;
	active?: boolean;
	onItemClick?: (T: EscNavItemType) => void;
	navigation?: EscNavItemType[];
	layout?: 'horizontal' | 'vertical' | 'vertical-2';
	firstLevel?: boolean;
	selectedId?: string;
	checkPermission?: boolean;
};

/**
 * EscNavigation
 * Component for displaying a navigation bar which contains EscNavItem components
 * and acts as parent for providing props to its children components
 */
function EscNavigation(props: EscNavigationProps) {
	const { navigation, layout = 'vertical' } = props;

	if (!navigation || navigation.length === 0) {
		return null;
	}

	return (
		<>
			{inputGlobalStyles}
			{layout === 'horizontal' && (
				<EscNavHorizontalLayout1
					checkPermission={false}
					{...props}
				/>
			)}
			{layout === 'vertical' && (
				<EscNavVerticalLayout1
					checkPermission={false}
					{...props}
				/>
			)}
			{layout === 'vertical-2' && (
				<EscNavVerticalLayout2
					checkPermission={false}
					{...props}
				/>
			)}
		</>
	);
}

export default memo(EscNavigation);
