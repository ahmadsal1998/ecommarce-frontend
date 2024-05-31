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
import {
	escGradientAndShadowButtonStyle,
	escOutlineAndShadowButtonStyle,
	escWarningButtonStyle
} from 'app/configs/escButtonStyleConfig';
import { useAppDispatch } from 'app/store/store';
import AttributeList from './AttributeList';
import { addAttributesSlice, setAttributeForUpate } from '../../stores/attributes/AddAttributeStore';
import { attributeSlice, searchAttribute, selectAttributeSlice, setAttributeSelection } from '../../stores/attributes/AttributeStore';
import { deleteAttributesByIds } from '../../respositories/attributes/attributeRepo';
import { addAttributesValueSlice } from '../../stores/attributesvalue/AddAttrutesValueStore';


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
function Attributes() {
	const attribute = useSelector(selectAttributeSlice);
	const dispatch = useAppDispatch();
	const onDeleteUser = () => {
		dispatch(deleteAttributesByIds({ ids: attribute.selectedRows }));
	};
	useEffect(()=>{
		dispatch(setAttributeSelection([]));
	},[])
	return (
		<Root
			content={
				<div className=" w-full flex flex-col min-h-full">
					<div className="EscPageCarded-header container   ">
						<div className="flex flex-col sm:flex-row flex-1 w-full items-baseline justify-between space-y-8 sm:space-y-0 py-10 sm:py-24 px-24 md:px-24">
							<div className="grow">
								<Typography className="mt-10 text-4xl font-extrabold leading-tight tracking-tight">
									Attributes
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
										value={attribute.searchText}
										onChange={(e) => dispatch(searchAttribute(e.target.value))}
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
										size="large"
										buttonStyle={escGradientAndShadowButtonStyle}
										component={Link}
										to={`/addattribute`}
										onClick={() => {
											dispatch(setAttributeForUpate(false));
										}}
										startIcon={<AddIcon />}
									>
										Create
									</EscButton>
									{attribute.isSelected ? (
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
									{attribute.isSelected ? (
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
											buttonStyle={escOutlineAndShadowButtonStyle}
											component={Link}
											onClick={() => {
												dispatch(setAttributeForUpate(false));
											}}
											to={`/addattribute`}
										>
											<AddIcon />
										</EscButton>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="flex grow min-h-max ">
						<AttributeList />
					</div>
				</div>
			}
		/>
	);
}
export default withSlices([addAttributesSlice, attributeSlice, addAttributesValueSlice])(memo(Attributes));
