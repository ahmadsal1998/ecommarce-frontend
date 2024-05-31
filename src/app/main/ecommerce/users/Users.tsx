import EscPageSimple from '@esc/core/EscPageSimple';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  memo, useEffect, useRef, useState } from 'react';
import withSlices from 'app/store/withSlices';
import { CSVLink } from 'react-csv'
import {
	escGradientAndShadowButtonStyle,
	escOutlineAndShadowButtonStyle,
	escWarningButtonStyle
} from 'app/configs/escButtonStyleConfig';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { useAppDispatch } from 'app/store/store';
import Userlist from './userlist/UserList';
import { searchUser, selectUserSlice, setFinalCsv, setUserSelection, userSlice } from '../stores/user/UserListStore';
import { deleteUser } from '../respositories/users/UsersRepo';
import { forUserUpdate } from '../stores/user/AddUserStore';
import axios from 'axios';
import {  baseUrl, usersUrl } from '../respositories/urls';
import CircularProgress from '@mui/material/CircularProgress';

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

function Users() {
	const user = useSelector(selectUserSlice);
	const dispatch = useAppDispatch();

	const [pageName, setPageName] = useState('users_' + Date.now() + Date.now() + Math.floor(Math.random() * 1000) + '.csv')
	const excelRef = useRef<CSVLink>(null);
	const onDeleteUser = () => {
		dispatch(deleteUser({ ids: user.selectedRows }));
	};
	var headers = [
		{ label: 'Id', key: 'id' },
		{ label: 'Name', key: 'name' },
		{ label: 'Mobile No', key: 'mobileno' },
		{ label: 'Created Date', key: 'date' },
		{ label: 'Status', key: 'publish' },
	  ]
	  useEffect(()=>{
		dispatch(setUserSelection([]));
	  },[])
	  const [exportRequest, setExportRequest] = useState(false)
	  const csvDownloadReq = async()=>{
		if(user.finalCsvRow.length == 0){
			setExportRequest(true);
			const response = await axios.post(`${baseUrl}${usersUrl}`,  {limit:user.total,
			page: 1,
			sort: {_id:-1},
			search: user.searchText
			});
			
			dispatch(setFinalCsv(response.data.data))
		
			
		}else{
			setPageName('users_' + Date.now() + Math.floor(Math.random() * 1000) + '.csv');
			excelRef!.current!.link.click();
		}
	  }
	  useEffect(()=>{
		setExportRequest(false);
			if(user.finalCsvRow.length>0&&exportRequest){
				setPageName('users_' + Date.now() + Math.floor(Math.random() * 1000) + '.csv');
				excelRef!.current!.link.click();
				dispatch(setFinalCsv([]))
			}
			
	  },[user.finalCsvRow])
	return (
		<Root
			content={
				<div className=" w-full flex flex-col min-h-full">
					<div className="EscPageCarded-header container   ">
						<div className="flex flex-col sm:flex-row flex-1 w-full items-baseline justify-between space-y-8 sm:space-y-0 py-10 sm:py-24 px-24 md:px-24">
							<div className="grow">
								<Typography className="mt-10 text-4xl font-extrabold leading-tight tracking-tight">
									Users
								</Typography>
							</div>
							<div className="grow-0">
								<div className="flex  sm:flex-row items-start justify-between space-x-10 space-y-0">
									<TextField
										
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
										value={user.searchText}
										onChange={(e) => dispatch(searchUser(e.target.value))}
										minRows={7}
										sx={{
											background: 'white',
											borderRadius: 40,
											'& fieldset': { outline: 'none', borderRadius: 40, padding: 1 }
										}}
									/>
									<EscButton
										className=" w-min  hidden sm:flex "
										size="large"
										buttonStyle={escGradientAndShadowButtonStyle}
										component={Link}
										to={`/add_user`}
										onClick={() => {
											dispatch(forUserUpdate(false));
										}}
										startIcon={<AddIcon />}
									>
										Create
									</EscButton>
									{user.isSelected ? (
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

									{user.isSelected ? (
										<EscButton
											variant="contained"
											color="warning"
											className="w-min sm:hidden"
											size="large"
											buttonStyle={escWarningButtonStyle}
											component={Link}
											onClick={onDeleteUser}
										>
											<DeleteIcon />
										</EscButton>
									) : (
										<EscButton
											variant="contained"
											color="secondary"
											className="w-min sm:hidden"
											buttonStyle={escGradientAndShadowButtonStyle}
											size="large"
											onClick={() => {
												dispatch(forUserUpdate(false));
											}}
											component={Link}
											to={`/add_user`}
										>
											<AddIcon />
										</EscButton>
									)}
									<div>
									{exportRequest ?<CircularProgress color="inherit" /> :<EscButton
										variant="outlined"
										color="secondary"
										buttonStyle={escOutlineAndShadowButtonStyle}
										className=" w-min hidden sm:flex "
										aria-label="Sign in"
										onClick={()=>{
											
												csvDownloadReq();
												
											
										}}
										size="large"
										startIcon={<FileDownloadOutlinedIcon />}
									>
										  Excel
										
									</EscButton>}
										<CSVLink
											style={{ 'z-index': '-1', display: 'none' }}
											data={user.finalCsvRow}
											ref={excelRef}
											headers={headers}
											filename={pageName}
											onClick={(event) => {}}
										></CSVLink>
									</div>

									<EscButton
										variant="outlined"
										color="secondary"
										className="w-min sm:hidden"
										aria-label="Sign in"
										size="large"
										onClick={()=>{
											csvDownloadReq()
										}}
										buttonStyle={escOutlineAndShadowButtonStyle}
									>
										<FileDownloadOutlinedIcon />
									</EscButton>
								</div>
							</div>
						</div>
					</div>
					<div className="flex grow min-h-max ">
						<Userlist />
					</div>
				</div>
			}
		/>
	);
}
export default withSlices([userSlice])(memo(Users));
