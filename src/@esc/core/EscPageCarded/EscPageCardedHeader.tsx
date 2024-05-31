import clsx from 'clsx';
import { ReactNode } from 'react';

/**
 * Props for the EscPageCardedHeader component.
 */
type EscPageCardedHeaderProps = {
	header?: ReactNode;
};

/**
 * The EscPageCardedHeader component is a header for the EscPageCarded component.
 */
function EscPageCardedHeader(props: EscPageCardedHeaderProps) {
	const { header = null } = props;

	return <div className={clsx('EscPageCarded-header', 'container')}>{header}</div>;
}

export default EscPageCardedHeader;
