import EscScrollbars from '@esc/core/EscScrollbars';
import { ReactNode } from 'react';

/**
 * Props for the EscPageCardedSidebarContent component.
 */
type ESCPageCardedSidebarContentProps = {
	innerScroll?: boolean;
	children?: ReactNode;
};

/**
 * The EscPageCardedSidebarContent component is a content container for the EscPageCardedSidebar component.
 */
function EscPageCardedSidebarContent(props: ESCPageCardedSidebarContentProps) {
	const { innerScroll, children } = props;

	if (!children) {
		return null;
	}

	return (
		<EscScrollbars enable={innerScroll}>
			<div className="EscPageCarded-sidebarContent">{children}</div>
		</EscScrollbars>
	);
}

export default EscPageCardedSidebarContent;
