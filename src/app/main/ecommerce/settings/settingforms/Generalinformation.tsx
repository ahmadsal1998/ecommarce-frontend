import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { memo, useEffect } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import withSlices from 'app/store/withSlices';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/store/store';
import { escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import { currencySymbole } from '../../constants/AppConstants';
import {
	addGeneralSlice,
	selectGeneralSlice,
	setCurrency,
	setFabIcon,
	setFooter,
	setSiteLogo,
	setSiteName,
	toggleGeneralDailog
} from '../../stores/settings/GeneralState';
import { baseUrl, imageUrl } from '../../respositories/urls';
import { addGeneral, fetchGeneral, updateGeneralById } from '../../respositories/settings/GeneralRepo';

function GeneralInformation() {
	const dispatch = useAppDispatch();
	const handleClose = () => {
		dispatch(toggleGeneralDailog());
	};
	const general = useSelector(selectGeneralSlice);
	const handleFile = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement & {
			files: FileList;
		};
		addLogo(target.files[0]);
	};

	const handleFavIcon = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement & {
			files: FileList;
		};

		addImage(target.files[0]);
	};
	const addLogo = async (file: File) => {
		try {
			const formData = new FormData();
			formData.append('image', file);
			const config = {
				headers: {
					'content-type': 'multipart/form-data'
				}
			};
			const response: { data: { image: string } } = await axios.post(`${baseUrl}${imageUrl}`, formData, config);
			dispatch(setSiteLogo(response.data.image));
		} catch (e) {
			/* empty */
		}
	};
	const addImage = async (file: File) => {
		try {
			const formData = new FormData();
			formData.append('image', file);
			const config = {
				headers: {
					'content-type': 'multipart/form-data'
				}
			};
			const response: { data: { image: string } } = await axios.post(`${baseUrl}${imageUrl}`, formData, config);
			dispatch(setFabIcon(response.data.image));
		} catch (e) {
			/* empty */
		}
	};

	const addcnts = () => {
		if (!general.isLoading) {
			if (general.id !== '') {
				dispatch(
					updateGeneralById({
						id: general.id,
						payload: {
							site_name: general.site_name,
							footer_copyright: general.footer_copyright,
							currency: general.currency,
							site_logo: general.site_logo,
							fav_icon: general.fav_icon
						}
					})
				);
			} else {
				dispatch(
					addGeneral({
						payload: {
							site_name: general.site_name,
							footer_copyright: general.footer_copyright,
							currency: general.currency,
							site_logo: general.site_logo,
							fav_icon: general.fav_icon
						}
					})
				);
			}
		}
	};
	useEffect(() => {
		dispatch(fetchGeneral({}));
	}, []);
	return (
		<div className="pt-10 sm:p-24 max-w-3xl m-10">
			<TextField
				id="outlined-basic"
				label="Site Name"
				fullWidth
				className="mt-20"
				required
				value={general.site_name}
				onChange={(e) => {
					dispatch(setSiteName(e.target.value));
				}}
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>
			<TextField
				id="outlined-basic"
				label="Footer Copyright Message"
				type="text"
				className="mt-20"
				fullWidth
				required
				value={general.footer_copyright}
				onChange={(e) => {
					dispatch(setFooter(e.target.value));
				}}
				inputProps={{ maxLength: 100 }}
				variant="outlined"
			/>
			<TextField
				id="outlined-basic"
				label="Currency Symbole"
				type="text"
				className="mt-20"
				inputProps={{ maxLength: 100 }}
				fullWidth
				value={general.currency}
				onChange={(e) => {
					dispatch(setCurrency(e.target.value));
				}}
				required
				defaultValue={`${currencySymbole}`}
				variant="outlined"
			/>
			<Button
				variant="contained"
				component="label"
				fullWidth
				sx={{ minHeight: 170, maxWidth: 170 }}
				className="min-h-100 mt-20"
			>
				{general.site_logo !== '' ? (
					<img
						src={`${baseUrl}/images/${general.site_logo}`}
						alt=""
						style={{ height: '60px', marginTop: '10px', marginLeft: '5px' }}
					/>
				) : (
					<div>
						<p>Site Logo</p>
						<FileDownloadOutlinedIcon />
					</div>
				)}
				<input
					type="file"
					accept="image/*"
					hidden
					multiple={false}
					onInput={handleFile}
				/>
			</Button>
			<Button
				variant="contained"
				component="label"
				fullWidth
				sx={{ minHeight: 170, maxWidth: 170 }}
				className="min-h-100 mt-20 ms-20"
			>
				{general.fav_icon !== '' ? (
					<img
						src={`${baseUrl}/images/${general.fav_icon}`}
						alt=""
						style={{ height: '60px', marginTop: '10px', marginLeft: '5px' }}
					/>
				) : (
					<div>
						<p>Fav Icon</p>
						<FileDownloadOutlinedIcon />
					</div>
				)}
				<input
					type="file"
					accept="image/*"
					hidden
					multiple={false}
					onInput={handleFavIcon}
				/>
			</Button>
			<div className="w-full">
				<EscButton
					variant="contained"
					color="secondary"
					className=" mt-20  "
					buttonStyle={escGradientAndShadowButtonStyle}
					aria-label="Sign in"
					size="large"
					onClick={addcnts}
					startIcon={<SaveIcon />}
				>
					{general.isLoading ? <CircularProgress color="inherit" /> : 'save'}
				</EscButton>
			</div>
			<Dialog
				open={general.dialogOpen}
				onClose={handleClose}
			>
				<DialogContent>
					<DialogContentText>
						<Box sx={{ width: '250px', fontSize: 16 }}>{general.message}</Box>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>OK</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default withSlices([addGeneralSlice])(memo(GeneralInformation));
