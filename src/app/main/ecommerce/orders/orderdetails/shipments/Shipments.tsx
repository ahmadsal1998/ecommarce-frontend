import { memo, useState } from 'react';
import EscPageSimple from '@esc/core/EscPageSimple';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EscButton from '@esc/components/buttons/EscButton/EscButton';
import { escGradientAndShadowButtonStyle } from 'app/configs/escButtonStyleConfig';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { currencySymbole } from '../../../constants/AppConstants';

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
function Shipments() {
	const [isVisible, setVisible] = useState(false);
	return (
		<div className="w-full p-20">
			<TableContainer>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Shipment</TableCell>
							<TableCell align="center">Ship Date</TableCell>
							<TableCell align="center">Tracking #</TableCell>
							<TableCell align="center">Shipment-to Name</TableCell>
							<TableCell align="center">Pdf</TableCell>
							<TableCell align="center">Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{[].map((data, index) => (
							<TableRow
								className="w-full"
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								key={index}
							>
								<TableCell
									component="th"
									scope="row"
								>
									00016
								</TableCell>
								<TableCell align="center">Feb 05,2024 08:41:16 AM</TableCell>
								<TableCell align="center">ORD000039</TableCell>
								<TableCell align="center">Dec 06,2023 04:57:42 AM</TableCell>
								<TableCell align="center">
									<EscButton
										variant="contained"
										size="large"
										buttonStyle={escGradientAndShadowButtonStyle}
										color="secondary"
									>
										<FileDownloadOutlinedIcon />
									</EscButton>
								</TableCell>
								<TableCell align="center">
									<EscButton
										variant="contained"
										size="large"
										buttonStyle={escGradientAndShadowButtonStyle}
										color="secondary"
										onClick={() => setVisible(!isVisible)}
									>
										View
									</EscButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{isVisible ? (
				<Root
					content={
						<TableContainer>
							<Table aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Sl. No.</TableCell>
										<TableCell>Product</TableCell>
										<TableCell align="right">Unit</TableCell>
										<TableCell align="right">Tax</TableCell>
										<TableCell align="right">Price</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell
											component="th"
											scope="row"
										>
											1
										</TableCell>
										<TableCell>Louis Philippe Checks Cotton Regular Mens Formal Shirt</TableCell>
										<TableCell align="right">1</TableCell>
										<TableCell align="right">{`${currencySymbole} 0`}</TableCell>
										<TableCell align="right">{`${currencySymbole} 855.00`}</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					}
				/>
			) : null}
		</div>
	);
}
export default memo(Shipments);
