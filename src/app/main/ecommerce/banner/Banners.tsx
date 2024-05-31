import { styled } from '@mui/material/styles';
import EscPageSimple from '@esc/core/EscPageSimple';
import { memo, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import withSlices from 'app/store/withSlices';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escGradientAndShadowButtonStyle, escWarningButtonStyle } from 'app/configs/escButtonStyleConfig';
import { useAppDispatch } from 'app/store/store';
import BannerList from './BannerList';
import { BannerSlotSlice, searchBanner, selectBannerSlotSlice, setBannerSelection } from '../stores/banners/BannerStore';
import { deleteBannerByIds } from '../respositories/banners/BannerRepo';
import { cleanForm, setBannerForUpate } from '../stores/banners/AddBannerStore';


const Root = styled(EscPageSimple)(({ theme }) => ({
	'& .EscPageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .EscPageSimple-content': {},
	'& .EscPageSimple-sidebarHeader': {},
	'& .EscPageSimple-sidebarContent': {}
}));
function Banners() {
	const dispatch = useAppDispatch();
	const banner = useSelector(selectBannerSlotSlice);
	const onDeletebnr = () => {
		dispatch(deleteBannerByIds({ ids: banner.selectedRows }));
	};
	useEffect(()=>{
		dispatch(setBannerSelection([]));
	},[])
	return (
		<Root
			content={
				<div className=" w-full flex flex-col min-h-full">
					<div className="EscPageCarded-header container   ">
						<div className="flex flex-col sm:flex-row flex-1 w-full items-baseline justify-between space-y-8 sm:space-y-0 py-10 sm:py-24 px-24 md:px-24">
							<div className="grow">
								<Typography className="mt-10 text-4xl font-extrabold leading-tight tracking-tight">
									Banner Images
								</Typography>
							</div>
							<div className="grow-0">
								<div className="flex  sm:flex-row items-start justify-between space-x-10 space-y-0">
									<TextField
										className=" w-max"
										id="outlined-multiline-flexible"
										InputProps={{
											style: {
												padding: 10,
												maxHeight: 42
											},
											startAdornment: (
												<InputAdornment position="start">
													<SearchIcon />
												</InputAdornment>
											)
										}}
										placeholder="Search"
										value={banner.searchText}
										onChange={(e) => dispatch(searchBanner(e.target.value))}
										maxRows={7}
										minRows={7}
										sx={{
											background: 'white',
											borderRadius: 40,
											'& fieldset': { outline: 'none', borderRadius: 40, padding: 1 }
										}}
									/>
									<EscButton
										variant="contained"
										color="secondary"
										className=" w-min  hidden sm:flex "
										aria-label="Sign in"
										size="large"
										onClick={() => {
											dispatch(cleanForm())
											dispatch(setBannerForUpate(false));
										}}
										component={Link}
										buttonStyle={escGradientAndShadowButtonStyle}
										to={`/add_banner`}
										startIcon={<AddIcon />}
									>
										Create
									</EscButton>
									{banner.isSelected ? (
										<EscButton
											buttonStyle={escWarningButtonStyle}
											className=" w-min  hidden sm:flex "
											aria-label="Sign in"
											size="large"
											onClick={onDeletebnr}
											component={Link}
											startIcon={<DeleteIcon />}
										>
											Delete
										</EscButton>
									) : null}
									{banner.isSelected ? (
										<EscButton
											variant="contained"
											color="warning"
											className="w-min lg:hidden"
											aria-label="Sign in"
											onClick={onDeletebnr}
											size="large"
											buttonStyle={escWarningButtonStyle}
											component={Link}
										>
											<DeleteIcon />
										</EscButton>
									) : (
										<EscButton
											variant="contained"
											color="secondary"
											className="w-min lg:hidden"
											aria-label="Sign in"
											size="large"
											component={Link}
											onClick={() => {
												dispatch(cleanForm())
											dispatch(setBannerForUpate(false));
											}}
											buttonStyle={escGradientAndShadowButtonStyle}
											to={`/add_banner`}
										>
											<AddIcon />
										</EscButton>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="flex grow min-h-max ">
						<BannerList />
					</div>
				</div>
			}
		/>
	);
}
export default withSlices([BannerSlotSlice])(memo(Banners));
