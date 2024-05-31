import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import _ from '@lodash';
import { AxiosError } from 'axios';
import { useAuth } from 'src/app/auth/AuthRouteProvider';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import { useNavigate } from 'react-router';
import history from '@history';


/**
 * Form Validation Schema
 */
const schema = z.object({
	email: z.string().email('You must enter a valid email').nonempty('You must enter an email'),
	password: z.string().min(1, 'Password is require field')
});

type FormType = {
	email: string;
	password: string;
	remember?: boolean;
};

const defaultValues = {
	email: '',
	password: '',
	remember: true
};

function jwtSignInTab() {
	const navigate = useNavigate();
	const { jwtService } = useAuth();
	const [error, setErrors] = useState('');
	const [visiblePassword, setVisiblePassword] = useState(false);
	const { control, formState, handleSubmit, setValue, setError } = useForm<FormType>({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	useEffect(() => {
		setValue('email', '', { shouldDirty: true, shouldValidate: true });
		setValue('password', '', { shouldDirty: true, shouldValidate: true });
	}, [setValue]);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const onSubmit = () => {
		jwtService
			.signIn({
				email,
				password
			}).then(()=>{
			
			})
			.catch(
				(
					error: AxiosError<
						{ message: string } & {
							type: 'email' | 'password' | 'remember' | `root.${string}` | 'root';
							message: string;
						}[]
					>
				) => {
					const errorData = error.response.data;
					setErrors(errorData.message);
					errorData.forEach((err) => {
						setError(err.type, {
							type: 'manual',
							message: err.message
						});
					});
				}
			);
	};
	
	

	return (
		<div className="w-full mt-20">
			<TextField
				className="mb-24"
				label="Email"
				autoFocus
				type="email"
				value={email}
				error={emailError !== ''}
				helperText={emailError}
				onChange={(e) => {
					setErrors('')
					setEmail(e.target.value);
					if (e.target.value.length > 0) {
						setEmailError('');
					} else {
						setEmailError('Enter email');
					}
				}}
				variant="outlined"
				required
				fullWidth
			/>

			<TextField
				className="mb-24"
				label="Password"
				value={password}
				type={!visiblePassword ? 'password' : 'text'}
				error={passwordError !== ''}
				helperText={passwordError}
				onChange={(e) => {

					setErrors('')
					setPassword(e.target.value);
					if (e.target.value.length > 0) {
						setPasswordError('');
					} else {
						setPasswordError('Enter password');
					}
				}}
				variant="outlined"
				InputProps={{
					endAdornment: !visiblePassword ? (
						<RemoveRedEyeIcon
							className="remove-Eye-icon"
							onClick={() => setVisiblePassword(true)}
						/>
					) : (
						<RemoveRedEyeOutlinedIcon
							className="remove-Eye-icon"
							onClick={() => setVisiblePassword(false)}
						/>
					)
				}}
				required
				fullWidth
			/>

			{error === '' ? null : <p style={{ color: 'red' }}>{error}</p>}

			<EscButton
				variant="contained"
				color="secondary"
				className=" mt-16 w-full"
				aria-label="Sign in"
				onClick={() => {
					if (passwordError === '' && emailError === '' && email !== '' && password !== '') {
						onSubmit();
					}
				}}
				buttonStyle={escGradientAndShadowButtonStyle}
				type="submit"
				size="large"
			>
				Sign in
			</EscButton>
		</div>
	);
}

export default jwtSignInTab;
