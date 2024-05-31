import EscPageSimple from '@esc/core/EscPageSimple';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from 'react-router-dom';
import { memo, useEffect, useRef, useState } from 'react';
import withSlices from 'app/store/withSlices';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { CSVLink } from 'react-csv'
import {
	escGradientAndShadowButtonStyle,
	escOutlineAndShadowButtonStyle,
	escWarningButtonStyle
} from 'app/configs/escButtonStyleConfig';
import { useAppDispatch } from 'app/store/store';
import DashboardUserList from './DashboardUserList';
import { searchUser, selectAdminUserSlice, setFinalCsv, setUserSelection, userAdminSlice } from '../stores/user/AdminUserStore';
import { deleteAdminUser } from '../respositories/users/AdminUerRepo';
import { forUserUpdate } from '../stores/dashboard/AddDashboardUserStore';
import CircularProgress from '@mui/material/CircularProgress';
import {  alladminsUrl, baseUrl } from '../respositories/urls';
import axios from 'axios';

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

function DashboardUsers() {
	const user = useSelector(selectAdminUserSlice);
	const dispatch = useAppDispatch();
	const onDeleteUser = () => {
		dispatch(deleteAdminUser({ ids: user.selectedRows }));
	};
	useEffect(()=>{
		dispatch(setUserSelection([]));
	},[])
	const [pageName, setPageName] = useState('users_' + Date.now() + Date.now() + Math.floor(Math.random() * 1000) + '.csv')
	const excelRef = useRef<CSVLink>(null);
	
	var headers = [
		{ label: 'Id', key: 'id' },
		{ label: 'Name', key: 'name' },
		{ label: 'Mobile No', key: 'mobileno' },
		{ label: 'Created Date', key: 'date' },
		{ label: 'Status', key: 'publish' },
	  ]
	const [exportRequest, setExportRequest] = useState(false)
	  const csvDownloadReq = async()=>{
		if(user.finalCsvRow.length == 0){
			setExportRequest(true);
			const response = await axios.post(`${baseUrl}${alladminsUrl}`,  {limit:user.total,
			page: 1,
			sort: {_id:-1},
			search: user.searchText
			});
			
			dispatch(setFinalCsv(response.data.data))
		
			
		}else{
			setPageName('admin_users_' + Date.now() + Math.floor(Math.random() * 1000) + '.csv');
			excelRef!.current!.link.click();
		}
	  }
	  useEffect(()=>{
		setExportRequest(false);
			if(user.finalCsvRow.length>0&&exportRequest){
				setPageName('admin_users_' + Date.now() + Math.floor(Math.random() * 1000) + '.csv');
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
										value={user.searchText}
										onChange={(e) => dispatch(searchUser(e.target.value))}
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
										onClick={()=>{
											dispatch(forUserUpdate(false));
										}}	
										buttonStyle={escGradientAndShadowButtonStyle}
										component={Link}
										to={`/add-dashboard-user`}
										startIcon={<AddIcon />}
									>
										Create
									</EscButton>
									{user.isSelected ? (
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
									{user.isSelected ? (
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
											component={Link}
											buttonStyle={escGradientAndShadowButtonStyle}
											to={`/add-dashboard-user`}
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
						<DashboardUserList />
					</div>
				</div>
			}
		/>
	);
}
export default withSlices([userAdminSlice])(memo(DashboardUsers));
