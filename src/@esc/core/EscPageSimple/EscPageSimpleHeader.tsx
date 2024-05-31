import clsx from 'clsx';
import { ReactNode } from 'react';

/**
 * Props for the EscPageSimpleHeader component.
 */
type EscPageSimpleHeaderProps = {
	className?: string;
	header?: ReactNode;
};

/**
 * The EscPageSimpleHeader component is a sub-component of the EscPageSimple layout component.
 * It provides a header area for the layout.
 */
function EscPageSimpleHeader(props: EscPageSimpleHeaderProps) {
	const { header = null, className } = props;
	return (
		<div className={clsx('EscPageSimple-header', className)}>
			<div className="container">{header}</div>
		</div>
	);
}

export default EscPageSimpleHeader;
