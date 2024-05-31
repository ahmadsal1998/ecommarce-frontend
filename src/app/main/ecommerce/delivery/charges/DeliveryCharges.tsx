import { styled } from '@mui/material/styles';
import EscPageSimple from '@esc/core/EscPageSimple';
import { memo, useEffect, useState } from 'react';
import withSlices from 'app/store/withSlices';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import EscPageCarded from '@esc/core/EscPageCarded';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import axios from 'axios';
import { currencySymbole } from '../../constants/AppConstants';
import {  alldeliverychargesUrl, baseUrl } from '../../respositories/urls';

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
function DeliveryCharges() {
	const [charge, setCharge] = useState('');
	const getCharge = async () => {
		const response: { data: { data: Array<{ var_charges: string; int_glcode: string }> } } = await axios.post(
			`${baseUrl}${alldeliverychargesUrl}`,
			{}
		);
		setCharge(response.data.data[0].var_charges);
	
	};
	useEffect(() => {
		getCharge();
	}, []);
	return (
		<Root
			content={
				<div className=" w-full flex flex-col min-h-full">
					<div className="EscPageCarded-header container   ">
						<div className="flex flex-col sm:flex-row flex-1 w-full items-baseline justify-between space-y-8 sm:space-y-0 py-10 sm:py-24 px-24 md:px-24">
							<div className="grow">
								<Typography className="mt-10 text-4xl font-extrabold leading-tight tracking-tight">
									Delivery Charge
								</Typography>
							</div>
							<div className="grow-0">
								<div className="flex  sm:flex-row items-start justify-between space-x-10 space-y-0">
									<EscButton
										variant="contained"
										color="secondary"
										className=" w-min  hidden sm:flex "
										aria-label="Sign in"
										size="large"
										buttonStyle={escGradientAndShadowButtonStyle}
										component={Link}
										to={`/edit_charge`}
										startIcon={<EditIcon />}
									>
										Edit
									</EscButton>
									<EscButton
										variant="contained"
										color="secondary"
										buttonStyle={escGradientAndShadowButtonStyle}
										className="w-min lg:hidden"
										aria-label="Sign in"
										size="large"
										component={Link}
										to={`/edit_charge`}
									>
										<EditIcon />
									</EscButton>
								</div>
							</div>
						</div>
					</div>
					<div className="flex grow min-h-max ">
						<EscPageCarded
							content={
								<Box
									sx={{
										flexGrow: 0,
										padding: '1.5rem 1rem 1rem 0'
									}}
									className="m-20 max-w-2xl "
								>
									<div className="flex mt-20">
										<Typography className="text-2xl font-bold flex-none">
											Delivery Charge Type:
										</Typography>
										<Typography className="text-2xl font-bold ms-40 flex-initial">Flat</Typography>
									</div>
									<div className="flex mt-20">
										<Typography className="text-2xl font-bold flex-none">
											Delivery Charge:
										</Typography>
										<Typography className="text-2xl font-bold ms-40 flex-initial">{`${currencySymbole} ${charge}`}</Typography>
									</div>
								</Box>
							}
						/>
					</div>
				</div>
			}
		/>
	);
}
export default withSlices([])(memo(DeliveryCharges));
