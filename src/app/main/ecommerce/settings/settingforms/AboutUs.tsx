import Button from '@mui/material/Button';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { memo, useEffect } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { Editor } from 'react-draft-wysiwyg';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import axios from 'axios';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import withSlices from 'app/store/withSlices';
import CircularProgress from '@mui/material/CircularProgress';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { useAppDispatch } from 'app/store/store';
import { ContentState, convertToRaw } from 'draft-js';
import { useSelector } from 'react-redux';
import { baseUrl, imageUrl } from '../../respositories/urls';
import {
	addAboutUsSlice,
	selectAddAboutUsSlice,
	setBanner,
	setContent,
	toggleAboutDailog
} from '../../stores/settings/AboutUsState';
import { addAboutUs, fetchAboutUs, updateAboutUsById } from '../../respositories/settings/AboutUsRepo';


function AboutUs() {
	const dispatch = useAppDispatch();
	const about = useSelector(selectAddAboutUsSlice);
	const handleClose = () => {
		dispatch(toggleAboutDailog());
	};
	
	const handleFile = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement & {
			files: FileList;
		};
		addImage(target.files[0]);
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
			dispatch(setBanner(response.data.image));
		} catch (e) {
			/* empty */
		}
	};
	const addcnts = () => {
		if (!about.isLoading) {
			if (about.id !== '') {
				dispatch(
					updateAboutUsById({
						id: about.id,
						payload: {
							content: about.content,
							banner: about.banner
						}
					})
				);
			} else {
				dispatch(
					addAboutUs({
						payload: {
							content: about.content,
							banner: about.banner
						}
					})
				);
			}
		}
	};
	useEffect(()=>{
		dispatch(fetchAboutUs({}))
	},[])


	return (
		<div className="pt-10 sm:p-24 max-w-3xl m-10">
			<p className="mt-20"> Content</p>
			{ !about.isLoading ? (
				<Editor
					toolbarClassName="toolbarClassName"
					defaultContentState={convertToRaw(
						// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
						ContentState.createFromBlockArray(htmlToDraft(about.content).contentBlocks)
					)}
					onContentStateChange={(e) => dispatch(setContent(draftToHtml(e)))}
					wrapperClassName="wrapperClassName border-1 border-gray-400 mt-10 rounded p-5"
					editorClassName="editorClassName"
				/>
			) : null}
			<Button
				variant="contained"
				component="label"
				fullWidth
				sx={{ minHeight: 100, maxWidth: 100 }}
				className="min-h-100 mt-20"
			>
				{about.banner !== '' ? (
					<img
						src={`${baseUrl}/images/${about.banner}`}
						alt=""
						style={{ height: '60px', marginTop: '10px', marginLeft: '5px' }}
					/>
				) : (
					<FileDownloadOutlinedIcon />
				)}
				<input
					type="file"
					accept="image/*"
					hidden
					multiple={false}
					onInput={handleFile}
				/>
			</Button>

			<div className="w-full">
				<EscButton
					variant="contained"
					color="secondary"
					className=" mt-20  "
					aria-label="Sign in"
					size="large"
					onClick={addcnts}
					buttonStyle={escGradientAndShadowButtonStyle}
					startIcon={<SaveIcon />}
				>
					{about.isLoading ? <CircularProgress color="inherit" /> : 'save'}
				</EscButton>
			</div>
			<Dialog
				open={about.dialogOpen}
				onClose={handleClose}
			>
				<DialogContent>
					<DialogContentText>
						<Box sx={{ width: '250px', fontSize: 16 }}>{about.message}</Box>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>OK</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default withSlices([addAboutUsSlice])(memo(AboutUs));
