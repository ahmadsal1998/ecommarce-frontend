import { memo } from 'react';
import ThemePreview, { EscThemeOption } from '@esc/core/EscThemeSelector/ThemePreview';

type EscThemeSchemesProps = {
	onSelect?: (t: EscThemeOption) => void;
	options: EscThemeOption[];
};

/**
 * The EscThemeSchemes component is responsible for rendering a list of theme schemes with preview images.
 * It uses the SchemePreview component to render each scheme preview.
 * The component is memoized to prevent unnecessary re-renders.
 */
function EscThemeSelector(props: EscThemeSchemesProps) {
	const { onSelect, options } = props;

	return (
		<div>
			<div className="flex flex-col w-full">
				{options.map((item) => (
					<ThemePreview
						key={item.id}
						className="mb-24"
						theme={item}
						onSelect={onSelect}
					/>
				))}
			</div>
		</div>
	);
}

export default memo(EscThemeSelector);
