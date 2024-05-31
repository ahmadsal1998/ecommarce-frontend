import EscSidePanel from '@esc/core/EscSidePanel';
import { memo } from 'react';
import NavigationShortcuts from '../../shared-components/navigation/NavigationShortcuts';

/**
 * The left side layout 3.
 */
function LeftSideLayout3() {
	return (
		<EscSidePanel>
			<NavigationShortcuts
				className="px-8 py-16"
				variant="vertical"
			/>
		</EscSidePanel>
	);
}

export default memo(LeftSideLayout3);
