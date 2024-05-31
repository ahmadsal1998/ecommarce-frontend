import { Typography } from '@mui/material';
import Card from '@mui/material/Card/Card';
import SampleNormalButton from './normal/SampleNormalButton';
import SampleNormalShadowButton from './normal-shadow/SampleNormalShadowButton';
import SampleGradientButton from './gradient/SampleGradientButton';

function SampleButtons() {
	return (
		<Card className="m-20 p-20">
			<Typography className="text-xl font-bold">Normal</Typography>
			<SampleNormalButton />
			<Typography className="text-xl font-bold">Normal Shadow</Typography>
			<SampleNormalShadowButton />
			<Typography className="text-xl font-bold">Gradient</Typography>
			<SampleGradientButton />
		</Card>
	);
}
export default SampleButtons;
