import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

ChartJS.register(ArcElement, Tooltip, Legend);



export function TotalSellingAnalytics({statusLabel, statusCount}) {
	 const statusData = [statusCount['Received'], statusCount['Cancelled'], statusCount['Delivered'], statusCount['Processed'], statusCount['Shipped'], statusCount['Returned']]
	 const data = {
		labels: ['Received', 'Cancelled', 'Delivered', 'Processed', 'Shipped', 'Returned'],
		datasets: [
			{
				label: '',
				data: statusData,
				backgroundColor: ['rgba(235, 201, 52, 1)', 'rgba(235, 52, 52, 1)', 'rgba(21, 191, 30, 1)', 'rgba(191, 114, 21, 1)', 'rgba(66, 135, 245, 1)', 'rgba(89, 21, 191, 1)'],
				borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
				borderWidth: 1
			}
		]
	};
	
	const options: ApexOptions =  {
		chart: {
		  width: 380,
		  type: 'pie',
		},
		labels: ['Received', 'Cancelled', 'Delivered', 'Processed', 'Shipped', 'Returned'],
		responsive: [{
		  breakpoint: 480,
		  options: {
			chart: {
			  width: 200
			},
			legend: {
			  position: 'bottom'
			}
		  }
		}]
	  };

	  
	  
	  
	return (
		<Card className="min-w-400 m-10 p-10">
			<div className="flex ms-20 me-20 mt-40 mb-20">
				<div className="col">
					<Typography className="text-3xl font-bold">Order Stats</Typography>
					<Typography color="grey">Overview of orders</Typography>
				</div>
			</div>
			<ReactApexChart options={options} series={statusData} type="pie" width={380} />
		</Card>
	);
}
