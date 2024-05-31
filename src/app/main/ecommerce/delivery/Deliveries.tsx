import { styled } from '@mui/material/styles';
import EscPageSimple from '@esc/core/EscPageSimple';
import { memo } from 'react';
import withSlices from 'app/store/withSlices';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import {
	escGradientAndShadowButtonStyle,
	escOutlineAndShadowButtonStyle,
	escWarningButtonStyle
} from 'app/configs/escButtonStyleConfig';
import { useAppDispatch } from 'app/store/store';
import DeliveryList from './DeliveryList';
import {
	selectDeliveryBoySlice,
	deliveryBoySlice,
	search,
	setForDeliveryUpdate
} from '../stores/deliveries/DeliveryBoyStore';
import { deleteDeliveryByIds } from '../respositories/deliveries/DeliveryBoyListRepo';
import { clearForm, deliveryBoySetForUpdate } from '../stores/deliveries/AddDeliveryStore';


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
function Deliveries() {
	const delivery = useSelector(selectDeliveryBoySlice);
	const dispatch = useAppDispatch();
	const onDeleteUser = () => {
		dispatch(deleteDeliveryByIds({ ids: delivery.selectedRows }));
	};
	return (
		<Root
			content={
				<div className=" w-full flex flex-col min-h-full">
					<div className="EscPageCarded-header container   ">
						<div className="flex flex-col sm:flex-row flex-1 w-full items-baseline justify-between space-y-8 sm:space-y-0 py-10 sm:py-24 px-24 md:px-24">
							<div className="grow">
								<Typography className="mt-10 text-4xl font-extrabold leading-tight tracking-tight">
									Delivery Boy List
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
										maxRows={7}
										value={delivery.searchText}
										onChange={(e) => dispatch(search(e.target.value))}
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
										size="large"
										onClickCapture={() => {
											dispatch(clearForm());	
											dispatch(deliveryBoySetForUpdate(false));
										}}
										buttonStyle={escGradientAndShadowButtonStyle}
										component={Link}
										to={`/add_delivery`}
										startIcon={<AddIcon />}
									>
										Create
									</EscButton>
									{delivery.isSelected ? (
										<EscButton
											buttonStyle={escWarningButtonStyle}
											className=" w-min  hidden sm:flex "
											size="large"
											onClick={onDeleteUser}
											component={Link}
											startIcon={<DeleteIcon />}
										>
											Delete
										</EscButton>
									) : null}
									{delivery.isSelected ? (
										<EscButton
											variant="contained"
											color="warning"
											className="w-min sm:hidden"
											size="large"
											onClick={onDeleteUser}
											buttonStyle={escWarningButtonStyle}
											component={Link}
										>
											<DeleteIcon />
										</EscButton>
									) : (
										<EscButton
											variant="contained"
											color="secondary"
											className="w-min sm:hidden"
											size="large"
											onClickCapture={() => {
												dispatch(setForDeliveryUpdate(false));
											}}
											buttonStyle={escGradientAndShadowButtonStyle}
											component={Link}
											to={`/add_delivery`}
										>
											<AddIcon />
										</EscButton>
									)}
									<EscButton
										variant="outlined"
										color="secondary"
										buttonStyle={escOutlineAndShadowButtonStyle}
										className=" w-min hidden sm:flex "
										size="large"
										startIcon={<FileDownloadOutlinedIcon />}
									>
										Excel
									</EscButton>
									<EscButton
										variant="outlined"
										color="secondary"
										buttonStyle={escOutlineAndShadowButtonStyle}
										className=" w-min  sm:hidden "
										size="large"
										
									>
										<FileDownloadOutlinedIcon />
									</EscButton>
								</div>
							</div>
						</div>
					</div>
					<div className="flex grow min-h-max ">
						<DeliveryList />
					</div>
				</div>
			}
		/>
	);
}
export default withSlices([deliveryBoySlice])(memo(Deliveries));
