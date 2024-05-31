import OneSideRadiusButtons from './components/OneSideRadiusButtons';
import OutlineButton from './components/OutlineButton';
import RadiusButton from './components/RadiusButton';
import RadiusOutlineButton from './components/RadiusOutlinebutton';
import SquareButton from './components/SquareButton';

function SampleGradientButton() {
	return (
		<div className="grid grid-cols-2 md:grid-cols-6  ">
			<SquareButton />
			<RadiusButton />
			<OutlineButton />
			<OneSideRadiusButtons />
			<RadiusOutlineButton />
		</div>
	);
}
export default SampleGradientButton;
