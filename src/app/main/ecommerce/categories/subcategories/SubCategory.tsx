import { styled } from '@mui/material/styles';
import EscPageSimple from '@esc/core/EscPageSimple';
import { memo, useEffect } from 'react';
import withSlices from 'app/store/withSlices';
import DeleteIcon from '@mui/icons-material/Delete';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escGradientAndShadowButtonStyle, escWarningButtonStyle } from 'app/configs/escButtonStyleConfig';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'app/store/store';
import CategoryList from './SubCategoryList';
import { subCategoriesSlice, selectSubCategorySlice, searchUser, setUCategorySelection } from '../../stores/categories/SubCategoryStore';
import { setCategoryForUpate } from '../../stores/categories/AddSubCategoryStore';
import { deleteSubCategoryByIds } from '../../respositories/categories/SubCategoriesRepo';


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
function SubCategory() {
	const dispatch = useAppDispatch();
	const category = useSelector(selectSubCategorySlice);
	const onDeleteUser = () => {
		dispatch(deleteSubCategoryByIds({ ids: category.selectedRows }));
	};
	useEffect(()=>{
		dispatch(setUCategorySelection([]));
	},[])
	return (
		<Root
			content={
				<div className=" w-full flex flex-col min-h-full">
					<div className="EscPageCarded-header container   ">
						<div className="flex flex-col sm:flex-row flex-1 w-full items-baseline justify-between space-y-8 sm:space-y-0 py-10 sm:py-24 px-24 md:px-24">
							<div className="grow">
								<Typography className="mt-10 text-4xl font-extrabold leading-tight tracking-tight">
									Sub Categories
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
										value={category.searchText}
										onChange={(e) => dispatch(searchUser(e.target.value))}
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
										onClick={() => {
											dispatch(setCategoryForUpate(false));
										}}
										to={`/addsubcategories`}
										startIcon={<AddIcon />}
									>
										Create
									</EscButton>
									{category.isSelected ? (
										<EscButton
											buttonStyle={escWarningButtonStyle}
											className=" w-min  hidden sm:flex "
											size="large"
											component={Link}
											onClick={onDeleteUser}
											startIcon={<DeleteIcon />}
										>
											Delete
										</EscButton>
									) : null}
									{category.isSelected ? (
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
											onClick={() => {
												dispatch(setCategoryForUpate(false));
											}}
											buttonStyle={escGradientAndShadowButtonStyle}
											component={Link}
											to={`/addsubcategories`}
										>
											<AddIcon />
										</EscButton>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="flex grow min-h-max ">
						<CategoryList />
					</div>
				</div>
			}
		/>
	);
}
export default withSlices([subCategoriesSlice])(memo(SubCategory));
