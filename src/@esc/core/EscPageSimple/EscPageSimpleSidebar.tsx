import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { forwardRef, ReactNode, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer/SwipeableDrawer';
import EscPageSimpleSidebarContent from './EscPageSimpleSidebarContent';

/**
 * Props for the EscPageSimpleSidebar component.
 */
type EscPageSimpleSidebarProps = {
	open?: boolean;
	position?: SwipeableDrawerProps['anchor'];
	variant?: SwipeableDrawerProps['variant'];
	onClose?: () => void;
	children?: ReactNode;
};

/**
 * The EscPageSimpleSidebar component.
 */
const EscPageSimpleSidebar = forwardRef<{ toggleSidebar: (T: boolean) => void }, EscPageSimpleSidebarProps>(
	(props, ref) => {
		const { open = true, position, variant, onClose = () => {} } = props;

		const [isOpen, setIsOpen] = useState(open);

		useImperativeHandle(ref, () => ({
			toggleSidebar: handleToggleDrawer
		}));

		const handleToggleDrawer = useCallback((val: boolean) => {
			setIsOpen(val);
		}, []);

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
							root: clsx('EscPageSimple-sidebarWrapper', variant),
							paper: clsx(
								'EscPageSimple-sidebar',
								variant,
								position === 'left' ? 'EscPageSimple-leftSidebar' : 'EscPageSimple-rightSidebar',
								'max-w-full'
							)
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
						// container={rootRef.current}
						BackdropProps={{
							classes: {
								root: 'EscPageSimple-backdrop'
							}
						}}
						style={{ position: 'absolute' }}
					>
						<EscPageSimpleSidebarContent {...props} />
					</SwipeableDrawer>
				</Hidden>

				{variant === 'permanent' && (
					<Hidden lgDown>
						<Drawer
							variant="permanent"
							anchor={position}
							className={clsx(
								'EscPageSimple-sidebarWrapper',
								variant,
								isOpen ? 'opened' : 'closed',
								position === 'left' ? 'EscPageSimple-leftSidebar' : 'EscPageSimple-rightSidebar'
							)}
							open={isOpen}
							onClose={onClose}
							classes={{
								paper: clsx('EscPageSimple-sidebar border-0', variant)
							}}
						>
							<EscPageSimpleSidebarContent {...props} />
						</Drawer>
					</Hidden>
				)}
			</>
		);
	}
);

export default EscPageSimpleSidebar;
