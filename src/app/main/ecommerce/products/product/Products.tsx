import { styled } from '@mui/material/styles';
import EscPageSimple from '@esc/core/EscPageSimple';
import { memo, useEffect, useRef, useState } from 'react';
import withSlices from 'app/store/withSlices';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from 'app/store/store';
import { useSelector } from 'react-redux';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import {
	escGradientAndShadowButtonStyle,
	escOutlineAndShadowButtonStyle,
	escWarningButtonStyle
} from 'app/configs/escButtonStyleConfig';
import CircularProgress from '@mui/material/CircularProgress';
import { CSVLink } from 'react-csv'
import AddIcon from '@mui/icons-material/Add';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { productSlice, searchProduct, selectProdictSlice, setFinalCsv, setProductSelection } from '../../stores/product/ProductStore';
import ProductList from './ProductList';
import { deleteProductsByIds } from '../../respositories/product/ProductRepo';
import { clearForm, setProductForUpdate } from '../../stores/product/AddProductDetailStore';
import { clearVarientForm } from '../../stores/product/AddProductVarient';
import axios from 'axios';
import {  allProductsUrl, baseUrl } from '../../respositories/urls';

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
function Products() {
	const product = useSelector(selectProdictSlice);
	const dispatch = useAppDispatch();
	const onDeleteProduct = () => {
		dispatch(deleteProductsByIds({ ids: product.selectedRows }));
	};
	const [exportRequest, setExportRequest] = useState(false)
	const [pageName, setPageName] = useState('products_' + Date.now() + Date.now() + Math.floor(Math.random() * 1000) + '.csv')
	const excelRef = useRef<CSVLink>(null);
	var headers = [
		{ label: 'Id', key: 'id' },
		{ label: 'Name', key: 'name' },
		{ label: 'Category', key: 'category' },
		{ label: 'Brand', key: 'brand' },
		{ label: 'Publish', key: 'publish' }
	  ]
	  useEffect(()=>{dispatch(setProductSelection([]));},[])
	  const csvDownloadReq = async()=>{
		if(product.finalCsvRow.length == 0){
			setExportRequest(true);
			const response = await axios.post(`${baseUrl}${allProductsUrl}`,  {limit:product.total,
			page: 1,
			sort: {_id:-1},
			search: product.searchText
			});
			
			dispatch(setFinalCsv(response.data.data))
		
			
		}else{
			setPageName('products_' + Date.now() + Math.floor(Math.random() * 1000) + '.csv');
			excelRef!.current!.link.click();
		}
	  }
	  useEffect(()=>{
		setExportRequest(false);
			if(product.finalCsvRow.length>0&&exportRequest){
				setPageName('products_' + Date.now() + Math.floor(Math.random() * 1000) + '.csv');
				excelRef!.current!.link.click();
				dispatch(setFinalCsv([]))
			}
			
	  },[product.finalCsvRow])
	return (
		<Root
			content={
				<div className=" w-full flex flex-col min-h-full">
					<div className="EscPageCarded-header container   ">
						<div className="flex flex-col sm:flex-row flex-1 w-full items-baseline justify-between space-y-8 sm:space-y-0 py-10 sm:py-24 px-24 md:px-24">
							<div className="grow">
								<Typography className="mt-10 text-4xl font-extrabold leading-tight tracking-tight">
									Products
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
										value={product.searchText}
										onChange={(e) => dispatch(searchProduct(e.target.value))}
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
										component={Link}
										onClick={() => {
											dispatch(clearForm());
											dispatch(clearVarientForm([]));
											dispatch(setProductForUpdate(false));
										}}
										buttonStyle={escGradientAndShadowButtonStyle}
										to={`/addproduct`}
										startIcon={<AddIcon />}
									>
										Create
									</EscButton>
									{product.isSelected ? (
										<EscButton
											buttonStyle={escWarningButtonStyle}
											className=" w-min  hidden sm:flex "
											size="large"
											onClick={onDeleteProduct}
											component={Link}
											startIcon={<DeleteIcon />}
										>
											Delete
										</EscButton>
									) : null}
									{product.isSelected ? (
										<EscButton
											variant="contained"
											color="warning"
											className="w-min sm:hidden"
											size="large"
											onClick={onDeleteProduct}
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
												dispatch(setProductForUpdate(false));
												dispatch(clearForm());
												dispatch(clearVarientForm([]));
											}}
											buttonStyle={escGradientAndShadowButtonStyle}
											component={Link}
											to={`/addproduct`}
										>
											<AddIcon />
										</EscButton>
									)}
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
											data={product.finalCsvRow}
											ref={excelRef}
											headers={headers}
											filename={pageName}
											onClick={(event) => {
												
											}}
										></CSVLink>
									<EscButton
										variant="outlined"
										color="secondary"
										onClick={()=>{
											csvDownloadReq();
										}}
										buttonStyle={escOutlineAndShadowButtonStyle}
										className="w-min sm:hidden"
										aria-label="Sign in"
										size="large"
									>
										<FileDownloadOutlinedIcon />
									</EscButton>
								</div>
							</div>
						</div>
					</div>
					<div className="flex grow min-h-max ">
						<ProductList />
					</div>
				</div>
			}
		/>
	);
}
export default withSlices([productSlice])(memo(Products));
