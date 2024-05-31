import EscPageSimple from '@esc/core/EscPageSimple';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EscPageCarded from '@esc/core/EscPageCarded';
import withSlices from 'app/store/withSlices';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { memo } from 'react';
import MetaContent from './MetaContents';
import GeneralInformation from './Generalinformation';
import AboutUs from './AboutUs';
import PolicyManagement from './PolicyManagement';
import ContactUs from './ContactUs';
import PaymentSetting from './PaymentSetting';
import CompanyDetails from './CompanyDetails';

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
const tabs = [
	<GeneralInformation />,
	<CompanyDetails/>,
	<MetaContent />,
	<AboutUs />,
	<ContactUs />,
	<PolicyManagement />
];
function SettingForms() {
	const navigate = useNavigate();
	const [tabIndex, setTabIndex] = React.useState(0);
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabIndex(newValue);
	};

	return (
		<Root
			content={
				<div className=" w-full flex flex-col min-h-full">
					<div className="EscPageCarded-header container">
						<div className="flex  sm:flex-row flex-1 w-full items-end  justify-between space-y-8 sm:space-y-0 py-10 sm:py-24 px-24 md:px-24">
							<div className="grow">
								<Button
									size="large"
									onClick={() => navigate(-1)}
									startIcon={<ArrowBackIcon />}
								>
									Settings
								</Button>
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
								>
									<Tabs
										value={tabIndex}
										onChange={handleChange}
										variant="scrollable"
										indicatorColor="secondary"
										orientation="horizontal"
										sx={{ borderBottom: 0.5, borderColor: 'primary.light' }}
										aria-label="visible arrows tabs example"
									>
										<Tab label="General Information" />
										<Tab label="Company Details"/>
										<Tab label="Meta Content" />
										<Tab label="About Us" />
										<Tab label="Contact us" />
										<Tab label="Policy Management" />
									</Tabs>
									{tabs[tabIndex]}
								</Box>
							}
						/>
					</div>
				</div>
			}
		/>
	);
}
export default withSlices([])(memo(SettingForms));
