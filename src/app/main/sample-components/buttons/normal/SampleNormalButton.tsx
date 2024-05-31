import OneSideRadiusButtons from './components/OneSideRadiusButtons';
import OutlineButton from './components/OutlineButton';
import RadiusButton from './components/RadiusButton';
import RadiusOutlineButton from './components/RadiusOutlinebutton';
import SquareButton from './components/SquareButton';

function SampleNormalButton() {
	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full items-baseline gap-20 space-y-8 sm:space-y-0 py-10 sm:py-24 px-24 md:px-24">
			<SquareButton />
			<RadiusButton />
			<OutlineButton />
			<OneSideRadiusButtons />
			<RadiusOutlineButton />
		</div>
	);
}
export default SampleNormalButton;
