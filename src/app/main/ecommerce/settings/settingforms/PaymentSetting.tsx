import TextField from '@mui/material/TextField';
import { memo } from 'react';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function PaymentSetting() {
	return (
		<div className="pt-10 sm:p-24 max-w-3xl m-10">
			<FormControl className="w-full">
				<FormLabel id="demo-row-radio-buttons-group-label">Cash On Delivery</FormLabel>
				<RadioGroup
					row
					aria-labelledby="demo-row-radio-buttons-group-label"
					name="row-radio-buttons-group"
				>
					<FormControlLabel
						value="yes"
						control={<Radio />}
						label="Yes"
					/>
					<FormControlLabel
						value="no"
						control={<Radio />}
						label="Yes"
					/>
				</RadioGroup>
			</FormControl>
			<FormControl className="w-full mt-20">
				<FormLabel id="demo-controlled-radio-buttons-group">Payment Mode</FormLabel>
				<RadioGroup
					row
					aria-labelledby="demo-controlled-radio-buttons-group"
					name="controlled-radio-buttons-group"
				>
					<FormControlLabel
						value="yes"
						control={<Radio />}
						label="Yes"
					/>
					<FormControlLabel
						value="no"
						control={<Radio />}
						label="No"
					/>
				</RadioGroup>
			</FormControl>
			<FormControl className="w-full mt-20">
				<FormLabel id="demo-controlled-radio-buttons-group">Payment Type</FormLabel>
				<RadioGroup
					row
					aria-labelledby="demo-controlled-radio-buttons-group"
					name="controlled-radio-buttons-group"
				>
					<FormControlLabel
						value="razorpay"
						control={<Radio />}
						label="Razorpay"
					/>
					<FormControlLabel
						value="paytm"
						control={<Radio />}
						label="Payetm"
					/>
				</RadioGroup>
			</FormControl>
			<TextField
				id="outlined-basic"
				label="Test API Key"
				fullWidth
				className="mt-20"
				required
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>
			<TextField
				id="outlined-basic"
				label="Test Secret Key"
				type="text"
				multiline
				className="mt-20"
				fullWidth
				required
				variant="outlined"
			/>
			<TextField
				id="outlined-basic"
				label="Live API Key"
				type="text"
				className="mt-20"
				fullWidth
				required
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>
			<TextField
				id="outlined-basic"
				label="Live Secret Key"
				type="text"
				className="mt-20"
				fullWidth
				required
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>
			<Button
				variant="contained"
				color="secondary"
				className=" w-max  mt-20  "
				aria-label="Sign in"
				size="large"
				startIcon={<SaveIcon />}
			>
				save
			</Button>
		</div>
	);
}

export default memo(PaymentSetting);
