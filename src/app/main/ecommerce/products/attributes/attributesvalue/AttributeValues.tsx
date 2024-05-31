import { styled } from '@mui/material/styles';
import EscPageSimple from '@esc/core/EscPageSimple';
import { memo, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import withSlices from 'app/store/withSlices';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from 'app/store/store';
import { useSelector } from 'react-redux';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import {
	escGradientAndShadowButtonStyle,
	escWarningButtonStyle,
	escOutlineAndShadowButtonStyle
} from 'app/configs/escButtonStyleConfig';
import { Link, useNavigate } from 'react-router-dom';
import { attributeValueSlice, selectAttributeValueSlice, setAttributeValuesSelection } from '../../../stores/attributesvalue/AttributesValueStore';
import AttributeValueList from './AttributeValueList';
import { deleteAttributesByIds } from '../../../respositories/attributes/attributeValueRepo';
import { setAttributeForUpate } from '../../../stores/attributesvalue/AddAttrutesValueStore';



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
function AttributesValues() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const attributes = useSelector(selectAttributeValueSlice);
	const onDeleteUser = () => {
		dispatch(deleteAttributesByIds({ ids: attributes.selectedRows }));
	};
	useEffect(()=>{
		dispatch(setAttributeValuesSelection([]));
	},[])
	return (
		<Root
			content={
				<div className=" w-full flex flex-col min-h-full">
					<div className="EscPageCarded-header container   ">
						<div className="flex flex-col sm:flex-row flex-1 w-full items-baseline justify-between space-y-8 sm:space-y-0 py-10 sm:py-24 px-24 md:px-24">
							<div className="grow">
								<Button
									size="large"
									onClick={() => navigate(-1)}
									startIcon={<ArrowBackIcon />}
								>
									Attributes
								</Button>
								<Typography className="mt-10 text-4xl font-extrabold leading-tight tracking-tight">
									Attribute Values
								</Typography>
							</div>
							<div className="grow-0" >
								<div className="flex  sm:flex-row items-start items-center justify-between space-x-10 space-y-0">
									<TextField
										className=" w-max"
										id="outlined-multiline-flexible"
										InputProps={{
											style: {
												padding: 10,
												maxHeight: 42,
											},
											startAdornment: (
												<InputAdornment position="start">
													<SearchIcon />
												</InputAdornment>
											)
										}}
										placeholder="Search"
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
										component={Link}
										onClick={() => {
											dispatch(setAttributeForUpate(false));
										}}
										buttonStyle={escGradientAndShadowButtonStyle}
										to={`/addattributevalue`}
										startIcon={<AddIcon />}
									>
										Create
									</EscButton>
									{attributes.isSelected ? (
										<EscButton
											buttonStyle={escWarningButtonStyle}
											className=" w-min  hidden sm:flex "
											aria-label="Sign in"
											size="large"
											onClick={onDeleteUser}
											component={Link}
											startIcon={<DeleteIcon />}
										>
											Delete
										</EscButton>
									) : null}
									<EscButton
										variant="contained"
										color="secondary"
										className="w-min lg:hidden"
										aria-label="Sign in"
										buttonStyle={escOutlineAndShadowButtonStyle}
										size="large"
										onClick={() => {
											dispatch(setAttributeForUpate(false));
										}}
										component={Link}
										to={`/addattributevalue`}
									>
										<AddIcon />
									</EscButton>
								</div>
							</div>
						</div>
					</div>
					<div className="flex grow min-h-max ">
						<AttributeValueList />
					</div>
				</div>
			}
		/>
	);
}
export default withSlices([attributeValueSlice])(memo(AttributesValues));
