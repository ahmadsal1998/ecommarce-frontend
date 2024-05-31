import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState, ReactNode } from 'react';
import { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer/SwipeableDrawer';
import EscPageCardedSidebarContent from './EscPageCardedSidebarContent';

/**
 * Props for the EscPageCardedSidebar component.
 */
type EscPageCardedSidebarProps = {
	open?: boolean;
	position?: SwipeableDrawerProps['anchor'];
	variant?: SwipeableDrawerProps['variant'];
	onClose?: () => void;
	children?: ReactNode;
};

/**
 * The EscPageCardedSidebar component is a sidebar for the EscPageCarded component.
 */
const EscPageCardedSidebar = forwardRef<{ toggleSidebar: (T: boolean) => void }, EscPageCardedSidebarProps>(
	(props, ref) => {
		const { open = true, position, variant, onClose = () => {} } = props;

		const [isOpen, setIsOpen] = useState(open);

		const handleToggleDrawer = useCallback((val: boolean) => {
			setIsOpen(val);
		}, []);

		useImperativeHandle(ref, () => ({
			toggleSidebar: handleToggleDrawer
		}));

		useEffect(() => {
			handleToggleDrawer(open);
		}, [handleToggleDrawer, open]);

		return (
			<>
				<Hidden lgUp={variant === 'permanent'}>
					<SwipeableDrawer
						variant="temporary"
						anchor={position}
						open={isOpen}
						onOpen={() => {}}
						onClose={() => onClose()}
						disableSwipeToOpen
						classes={{
							root: clsx('EscPageCarded-sidebarWrapper', variant),
							paper: clsx(
								'EscPageCarded-sidebar',
								variant,
								position === 'left' ? 'EscPageCarded-leftSidebar' : 'EscPageCarded-rightSidebar'
							)
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
						BackdropProps={{
							classes: {
								root: 'EscPageCarded-backdrop'
							}
						}}
						style={{ position: 'absolute' }}
					>
						<EscPageCardedSidebarContent {...props} />
					</SwipeableDrawer>
				</Hidden>
				{variant === 'permanent' && (
					<Hidden lgDown>
						<Drawer
							variant="permanent"
							anchor={position}
							className={clsx(
								'EscPageCarded-sidebarWrapper',
								variant,
								isOpen ? 'opened' : 'closed',
								position === 'left' ? 'EscPageCarded-leftSidebar' : 'EscPageCarded-rightSidebar'
							)}
							open={isOpen}
							onClose={onClose}
							classes={{
								paper: clsx('EscPageCarded-sidebar', variant)
							}}
						>
							<EscPageCardedSidebarContent {...props} />
						</Drawer>
					</Hidden>
				)}
			</>
		);
	}
);

export default EscPageCardedSidebar;
