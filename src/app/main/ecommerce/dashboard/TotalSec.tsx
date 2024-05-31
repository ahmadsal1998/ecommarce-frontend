import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import EscSvgIcon from '@esc/core/EscSvgIcon';
import { useSelector } from 'react-redux';
import { selectUserSlice } from '../stores/user/UserListStore';
import { selectOrderSlice } from '../stores/orders/OrderStore';
import { selectProdictSlice } from '../stores/product/ProductStore';

function TotalSec() {
	const users = useSelector(selectUserSlice);
	const orders = useSelector(selectOrderSlice);
	const product = useSelector(selectProdictSlice);
	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full items-baseline justify-between ms-10 me-20">
			<Card className="p-5 flex w-full" sx={{background:"#f24a78"}}>
				<div className="col me-30 flex-1">
					<Typography className="font-bold ml-20 mt-10" sx={{color:"white"}}>Total Users</Typography>
					<Typography
						className="text-4xl font-semibold ml-20 mt-10 mb-20"
						color="primary.light"
						sx={{color:"white"}}
					>
						{users.total}
					</Typography>
				</div>
				<PeopleAltIcon
					
					sx={{ fontSize: '10rem', color:"rgba(255,255,255, 0.3)" }}
				/>
			</Card>

			<Card className="p-5 flex w-full m-10" sx={{background:"#2faedf"}}>
				<div className="col me-30 flex-1">
					<Typography className="font-bold  ml-20 mt-10"  sx={{color:"white"}}>Total Products</Typography>
					<Typography
						className="text-4xl font-semibold ml-20 mt-10 mb-20"
						color="primary.light"
						sx={{color:"white"}}
					>
						{product.total}
					</Typography>
				</div>
				<EscSvgIcon sx={{ color:"rgba(255,255,255, 0.3)" }} size={100}>feather:codepen</EscSvgIcon>
			</Card>
			<Card className="p-5 flex w-full m-10" sx={{background:"#3e8ce8"}}>
				<div className="col me-30 flex-1">
					<Typography className="font-bold  ml-20 mt-10"  sx={{color:"white"}}>Total Orders</Typography>
					<Typography
					 sx={{color:"white"}}
						className="text-4xl font-semibold ml-20 mt-10 mb-20"
						color="primary.light"
					>
						{orders.total}
					</Typography>
				</div>
				<AssignmentOutlinedIcon
					color="success"
					sx={{ fontSize: '10rem',color:"rgba(255,255,255, 0.3)"  }}
				/>
			</Card>
		</div>
	);
}
export default TotalSec;
