/* eslint-disable @typescript-eslint/no-unsafe-call */
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/store/store';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import {
	selectAdUserLice,
	setName,
	setEmail,
	setMobile,
	setPassword,
	checkformValidation
} from '../../stores/user/AddUserStore';
import { baseUrl } from '../../respositories/urls';

function UserDetails({ onSelectFile, onChagedTab }) {
	const user = useSelector(selectAdUserLice);

	const dispatch = useAppDispatch();
	const [file, setFile] = useState<File | undefined>();

	const handleFile = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement & {
			files: FileList;
		};
		setFile(target.files[0]);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		onSelectFile(target.files[0]);
	};
	useEffect(() => {
		dispatch(checkformValidation());
	}, [user.name, user.email, user.password, user.mobile_no]);
	console.log(user.user)
	return (
		<div className="pt-10 sm:p-24 max-w-3xl m-10">
			<TextField
				id="outlined-basic"
				label="Name"
				fullWidth
				value={user.name}
				error={user.error_name !== ''}
				helperText={user.error_name}
				onChange={(e) => {
					dispatch(setName(e.target.value));
				}}
				className="mt-20"
				required
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>
			<TextField
				id="outlined-basic"
				label="Email"
				type="email"
				value={user.email}
				error={user.error_email !== ''}
				disabled={user.forUpdate}
				helperText={user.error_email}
				onChange={(e) => {
					dispatch(setEmail(e.target.value));
				}}
				className="mt-20"
				fullWidth
				required
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>
			<TextField
				id="outlined-basic"
				label="Mobile No."
				type="text"
				className="mt-20"
				value={user.mobile_no}
				disabled={user.forUpdate}
				error={user.error_mobile !== ''}
				helperText={user.error_mobile}
				onChange={(e) => {
					dispatch(setMobile(e.target.value));
				}}
				inputProps={{ maxLength: 100 }}
				fullWidth
				required
				variant="outlined"
			/>
			{!user.forUpdate ? (
				<TextField
					id="outlined-basic"
					label="Password"
					type="password"
					className="mt-20"
					inputProps={{ maxLength: 100 }}
					fullWidth
					required
					value={user.password}
					error={user.error_password !== ''}
					helperText={user.error_password}
					onChange={(e) => {
						dispatch(setPassword(e.target.value));
					}}
					variant="outlined"
				/>
			) : null}
			<Button
				variant="contained"
				component="label"
				fullWidth
				sx={{ minHeight: 170, maxWidth: 170 }}
				className="min-h-100 mt-20"
			>
				<div>
					{user.forUpdate && user.user && user.user.var_image && user.user.var_image !== '' && file === undefined ? (
						<div>
							<img
								src={`${baseUrl}/images/${user.user.var_image}`}
								alt=""
								style={{ height: '160px' }}
							/>
							<input
								type="file"
								accept="image/*"
								hidden
								multiple={false}
								onInput={handleFile}
							/>
						</div>
					) : (
						<div>
							{file === undefined ? <FileDownloadOutlinedIcon /> : null}
							{file === undefined ? 'Profile Picture' : ''}
							{file === undefined ? null : (
								<img
									src={URL.createObjectURL(file)}
									alt=""
									style={{ height: '160px' }}
								/>
							)}
							<input
								type="file"
								accept="image/*"
								hidden
								multiple={false}
								onInput={handleFile}
							/>
						</div>
					)}
				</div>
			</Button>
			<div className="w-full mt-20">
				<EscButton
					variant="contained"
					color="secondary"
					buttonStyle={escGradientAndShadowButtonStyle}
					className=" w-min   "
					aria-label="Sign in"
					size="large"
					onClick={() => {
						onChagedTab(1);
					}}
				>
					Next
				</EscButton>
			</div>
		</div>
	);
}

export default memo(UserDetails);
