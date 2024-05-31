import EscPageSimple from '@esc/core/EscPageSimple';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { memo } from 'react';
import withSlices from 'app/store/withSlices';
import { SellingAnalytics } from './SellingAnalytics';
import { TotalSellingAnalytics } from './TotalSellingAnalytics';
import { TotalEarn } from './TotalEarn';
import { ProductsAnalytics } from './ProductsAnalytics';

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

function Charts() {
	return (
		<Root
			content={
				<div className=" w-full flex flex-col min-h-full">
					<div className="EscPageCarded-header container   ">
						<div className="flex flex-col sm:flex-row flex-1 w-full items-baseline justify-between space-y-8 sm:space-y-0 py-10 sm:py-24 px-24 md:px-24">
							<div className="grow">
								<Typography className="mt-10 text-4xl font-extrabold leading-tight tracking-tight">
									Dashboard
								</Typography>
							</div>
						</div>
					</div>
					<div className="  w-full ps-10 pe-20">
						<div className="flex w-full grid grid-cols-1">
							<div className="flex flex-col sm:flex-row flex-1 w-full items-baseline justify-between me-20">
								<SellingAnalytics />
								<TotalEarn chartForProducts={undefined} ordersForChart={undefined} chartLabel={undefined} dateOrder={undefined} />
							</div>
							<div className="flex flex-col sm:flex-row flex-1 w-full  justify-between   ">
								<TotalSellingAnalytics statusLabel={undefined} statusCount={undefined} />
                                <ProductsAnalytics />
							</div>
						</div>
					</div>
				</div>
			}
		/>
	);
}
export default withSlices([])(memo(Charts));
