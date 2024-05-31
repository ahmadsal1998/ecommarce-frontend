import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/store/store';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import {
	selectAddAddressLice,
	setAddress,
	deleteAddress,
	setHouseNo,
	setAppartmentNo,
	setLandmark,
	setCity,
	setState,
	setCountry,
	setPin,
	setDefault,
	setType,
	updateAddress,
	checkformValidation,
	clearAddressForm,
	updateData
} from '../../stores/user/AddAddressStore';
import { AddressModel } from '../../models/address/AddressModel';
import { selectAdUserLice } from '../../stores/user/AddUserStore';
import { deleteAddressById } from '../../respositories/users/UsersRepo';

function AddressDetail() {
	const userD = useSelector(selectAdUserLice);
	const user = useSelector(selectAddAddressLice);
	const dispatch = useAppDispatch();
	const addAddress = () => {
		if (user.isFormValid) {
			if (user.forUpdate) {
				const address: AddressModel = {
					address_id: user.address.length,
					fk_user: '',
					int_glcode: '',
					var_house_no: user.house_no,
					var_app_name: user.appartment_no,
					var_landmark: user.landmark,
					var_city: user.city,
					var_state: user.state,
					var_country: user.country,
					var_pincode: user.pin_code,
					chr_type: user.address_type,
					default_status: user.is_default ? 'Y' : 'N',
					chr_publish: false,
					chr_delete: false,
					dt_createddate: '',
					dt_modifydate: '',
					var_ipaddress: ''
				};
				dispatch(updateAddress(address));
				dispatch(clearAddressForm());
			} else {
				const address: AddressModel = {
					address_id: user.address.length,
					fk_user: '',
					int_glcode: '',
					var_house_no: user.house_no,
					var_app_name: user.appartment_no,
					var_landmark: user.landmark,
					var_city: user.city,
					var_state: user.state,
					var_country: user.country,
					var_pincode: user.pin_code,
					chr_type: user.address_type,
					default_status: user.is_default ? 'Y' : 'N',
					chr_publish: false,
					chr_delete: false,
					dt_createddate: '',
					dt_modifydate: '',
					var_ipaddress: ''
				};
				dispatch(setAddress(address));
				dispatch(clearAddressForm());
			}
		}
	};
	useEffect(() => {
		dispatch(checkformValidation());
	}, [
		user.isFormValid,
		user.house_no,
		user.appartment_no,
		user.city,
		user.landmark,
		user.state,
		user.country,
		user.pin_code
	]);

	return (
		<div className="pt-10 sm:p-24 max-w-3xl m-10">
			<TextField
				id="outlined-basic"
				label="House No."
				fullWidth
				onChange={(e) => {
					dispatch(setHouseNo(e.target.value));
				}}
				className="mt-20"
				error={user.error_house !== ''}
				value={user.house_no}
				required
				helperText={user.error_house}
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>
			<TextField
				id="outlined-basic"
				label="Appartment No."
				value={user.appartment_no}
				fullWidth
				error={user.error_appartment !== ''}
				helperText={user.error_appartment}
				onChange={(e) => {
					dispatch(setAppartmentNo(e.target.value));
				}}
				className="mt-20"
				inputProps={{ maxLength: 100 }}
				required
				variant="outlined"
			/>
			<TextField
				id="outlined-basic"
				label="Landmark"
				fullWidth
				helperText={user.error_landmark}
				error={user.error_landmark !== ''}
				value={user.landmark}
				className="mt-20"
				required
				onChange={(e) => {
					dispatch(setLandmark(e.target.value));
				}}
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>
			<div className="flex flex-row gap-x-10">
				<TextField
					id="outlined-basic"
					label="Country"
					helperText={user.error_country}
					error={user.error_country !== ''}
					value={user.country}
					fullWidth
					className="mt-20"
					inputProps={{ maxLength: 100 }}
					required
					onChange={(e) => {
						dispatch(setCountry(e.target.value));
					}}
					variant="outlined"
				/>
				<TextField
					id="outlined-basic"
					label="State"
					fullWidth
					helperText={user.error_state}
					error={user.error_state !== ''}
					onChange={(e) => {
						dispatch(setState(e.target.value));
					}}
					value={user.state}
					className="mt-20"
					required
					inputProps={{ maxLength: 100 }}
					variant="outlined"
				/>
			</div>
			<div className="flex flex-row gap-x-10">
				<TextField
					id="outlined-basic"
					label="City"
					helperText={user.error_city}
					onChange={(e) => {
						dispatch(setCity(e.target.value));
					}}
					value={user.city}
					fullWidth
					error={user.error_city !== ''}
					inputProps={{ maxLength: 100 }}
					className="mt-20"
					required
					variant="outlined"
				/>

				<TextField
					id="outlined-basic"
					label="Pincode"
					helperText={user.error_pin}
					fullWidth
					error={user.error_pin !== ''}
					onChange={(e) => {
						dispatch(setPin(e.target.value));
					}}
					value={user.pin_code}
					className="mt-20"
					inputProps={{ maxLength: 6 }}
					required
					variant="outlined"
				/>
			</div>

			<FormControl className="mt-20">
				<FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
				<RadioGroup
					row
					onChange={(e) => {
						dispatch(setType(e.target.value));
					}}
					value={user.address_type}
					aria-labelledby="demo-row-radio-buttons-group-label"
					name="row-radio-buttons-group"
				>
					<FormControlLabel
						value="home"
						control={<Radio />}
						label="Home"
					/>
					<FormControlLabel
						value="office"
						control={<Radio />}
						label="Office"
					/>
					<FormControlLabel
						value="other"
						control={<Radio />}
						label="Other"
					/>
				</RadioGroup>
			</FormControl>
			<div className="w-full">
				<FormControlLabel
					control={
						<Checkbox
							checked={user.is_default}
							onChange={() => {
								dispatch(setDefault());
							}}
						/>
					}
					label="Set Default"
				/>
			</div>
			<div className="w-full">
				{user.isFormValid ? (
					<Button
						variant="contained"
						className="mt-20"
						color="secondary"
						onClick={addAddress}
						size="large"
						startIcon={<AddIcon />}
					>
						{user.forUpdate ? 'Update' : 'Add'}
					</Button>
				) : (
					<Button
						variant="contained"
						className="mt-20"
						size="large"
						onClick={addAddress}
						startIcon={<AddIcon />}
					>
						{user.forUpdate ? 'Update' : 'Add'}
					</Button>
				)}
			</div>
			<div className="mt-20">
				{user.address.map((data, index) =>
					data.default_status === 'Y' ? (
						<Chip
							key={index}
							label={`${data.var_house_no}, ${data.var_landmark}, ${data.var_city}, 
					${data.var_state}, ${data.var_country}, ${data.var_pincode}`}
							component="a"
							color="secondary"
							clickable
							onClick={() => {
								dispatch(updateData({ d: data, i: index }));
							}}
							sx={{
								height: 'auto',
								margin: 1,
								width: 200,
								'& .MuiChip-label': {
									display: 'block',
									margin: 2,
									whiteSpace: 'normal',
									fontSize: 14
								},
								'& .MuiChip-deleteIcon': {
									position: 'absolute',
									top: 10,
									right: 0
								}
							}}
							onDelete={() => {
								dispatch(deleteAddress(index));
							}}
							deleteIcon={<DeleteIcon />}
						/>
					) : (
						<Chip
							key={index}
							label={`${data.var_house_no}, ${data.var_landmark}, ${data.var_city}, 
							${data.var_state}, ${data.var_country}, ${data.var_pincode}`}
							component="a"
							clickable
							onClick={() => {
								dispatch(updateData({ d: data, i: index }));
							}}
							sx={{
								height: 'auto',
								margin: 1,
								width: 200,
								'& .MuiChip-label': {
									display: 'block',
									margin: 2,
									whiteSpace: 'normal',
									fontSize: 14
								},
								'& .MuiChip-deleteIcon': {
									position: 'absolute',
									top: 10,
									right: 0
								}
							}}
							onDelete={() => {
								dispatch(deleteAddress(index));
								dispatch(deleteAddressById({ id: data.int_glcode }));
							}}
							deleteIcon={<DeleteIcon />}
						/>
					)
				)}
			</div>
		</div>
	);
}
export default AddressDetail;
