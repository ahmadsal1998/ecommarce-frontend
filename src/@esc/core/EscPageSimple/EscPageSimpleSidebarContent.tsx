import EscScrollbars from '@esc/core/EscScrollbars';
import { ReactNode } from 'react';

/**
 * Props for the EscPageSimpleSidebarContent component.
 */
type EscPageSimpleSidebarContentProps = {
	innerScroll?: boolean;
	children?: ReactNode;
};

/**
 * The EscPageSimpleSidebarContent component is a content container for the EscPageSimpleSidebar component.
 */
function EscPageSimpleSidebarContent(props: EscPageSimpleSidebarContentProps) {
	const { innerScroll, children } = props;

	if (!children) {
		return null;
	}

	return (
		<EscScrollbars enable={innerScroll}>
			<div className="EscPageSimple-sidebarContent">{children}</div>
		</EscScrollbars>
	);
}

export default EscPageSimpleSidebarContent;
