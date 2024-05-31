import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectUser } from 'src/app/auth/user/store/userSlice';
import EscNavItem from '../EscNavItem';
import { EscNavigationProps } from '../EscNavigation';
import { EscNavItemType } from '../types/EscNavItemType';
import { Box } from '@mui/system';
import Popover from '@mui/material/Popover';
import React, { useEffect } from 'react';
import ListItemText from '@mui/material/ListItemText';
import { black } from 'material-ui/styles/colors';
import { selectEscNavbar, setMobilePopupMenu, setNavItem } from 'app/theme-layouts/shared-components/navbar/store/navbarSlice';
import { useAppDispatch } from 'app/store/store';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import EscSvgIcon from '@esc/core/EscSvgIcon';
import Grid from '@mui/material/Grid';

 const StyledList = styled(List)(({ theme }) => ({
	'& .esc-list-item': {
		'&:hover': {
			backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,.04)'
		},
		'&:focus:not(.active)': {
			backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0,0,0,.05)'
		}
	},
	'& .esc-list-item-text': {
		margin: 0
	},
	'& .esc-list-item-text-primary': {
		lineHeight: '20px'
	},
	'&.active-square-list': {
		'& .esc-list-item, & .active.esc-list-item': {
			width: '100%',
			borderRadius: '0'
		}
	},
	'&.dense': {
		'& .esc-list-item': {
			paddingTop: 0,
			paddingBottom: 0,
			height: 32
		}
	}
}));

/**
 * EscNavVerticalLayout1
 * This component is used to render vertical navigations using
 * the Material-UI List component. It accepts the EscNavigationProps props
 * and renders the EscNavItem components accordingly
 */
function EscNavVerticalLayout1(props: EscNavigationProps) {
	const { navigation, active, dense, className, onItemClick, checkPermission } = props;

	function handleItemClick(item: EscNavItemType) {
		onItemClick?.(item);
	}
	const dispatch = useAppDispatch();
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const navbar = useSelector(selectEscNavbar);

	const [timer1, setTimer1] = React.useState(null);
	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
	   clearTimeout(timer1);
		if(!navbar.open){
			setTimer1(	setTimeout(function() {
				handlePopoverClose();
			  }, 2000));
	  		setAnchorEl(event.currentTarget);
		}
	};
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	  };
	const handlePopoverClose = () => {
	  setAnchorEl(null);
	};
	
	const navigate = useNavigate();
  
	const openPopUp = Boolean(anchorEl);
	const user = useSelector(selectUser);
	return (
		<StyledList
			className={clsx(
				'navigation whitespace-nowrap px-12 py-0',
				`active-${active}-list`,
				dense && 'dense',
				className
			)}
			onMouseEnter={(e)=>{console.log("mouse over")}}
		>
			{navigation.map((_item) => {
				return user.data.roles && user.data.roles.find((data) => data === _item.id) ? (
			<div>
			<Box
			onMouseEnter={(e)=>{handlePopoverOpen(e);dispatch(setNavItem(_item));}}
			
			>
			<EscNavItem
				key={_item.id}
				type={`vertical-${_item.type}`}
				item={_item}
				nestedLevel={0}
				onItemClick={handleItemClick}
				checkPermission={checkPermission}
			/>
		  </Box> 
		 {(!navbar.navItemIsChanging && navbar.navItem) ?<Popover
			  id="mouse-over-popover"
			  
			  sx={{
				pointerEvents: 'auto',
				zIndex:"10 !important"
				
			  }}
			  slotProps={{
				paper:{elevation:0}
			  }}
			  open={openPopUp}
			  anchorEl={anchorEl}
			  anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			  }}
			  transformOrigin={{
				vertical: 'top',
				horizontal: 'left',
			  }}
			  onClose={handlePopoverClose}
			  
			>	
				<Box sx={{color:"white", paddingLeft:5, paddingRight:5,paddingTop:"10px",paddingBottom:"10px"}}>
					
			<div className="flex flex-col sm:flex-row flex-1 w-full align-content: center align-items: center ">
					<ListItemText
						sx={{cursor:"pointer"}}
						className="esc-list-item-text grow"
						color='inherit'
						primary={navbar.navItem?navbar.navItem.title:""}
						onClick={()=>{
						
						navigate(navbar.navItem?navbar.navItem.url:"");
						handlePopoverClose();
					}}
						classes={{
							primary: 'text-13 font-medium esc-list-item-text-primary truncate',
							secondary: 'text-11 font-medium esc-list-item-text-secondary leading-normal truncate'
						}}
					/>
					
					{(navbar.navItem.children&&navbar.navItem.children.length>0)? <EscSvgIcon
							size={24}
							className="arrow-icon grow-10 ms-10 "
							color="inherit"
						>
							{ 'heroicons-solid:chevron-down' }
						</EscSvgIcon>
						:null}
						</div>
					{(navbar.navItem.children&&navbar.navItem.children.length>0)? 
					navbar.navItem.children.map((data)=>
					<ListItemText
						sx={{cursor:"pointer",marginTop:"24px"}}
						className="esc-list-item-text"
						primary={data.title}
						key={data.id}
						onClick={()=>{
						navigate(data.url);
						handlePopoverClose();
					}}
						classes={{
							primary: 'text-13 font-medium esc-list-item-text-primary truncate',
							secondary: 'text-11 font-medium esc-list-item-text-secondary leading-normal truncate'
						}}
					/>):null}
					
				</Box>
			
			  </Popover>:null}
		  </div>
				) : null;
			})}
		</StyledList>
	);
}

export default EscNavVerticalLayout1;
