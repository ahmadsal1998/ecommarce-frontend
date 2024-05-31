import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import Card from '@mui/material/Card';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const
		},
		title: {
			display: true,
			text: 'Sold By Months '
		}
	}
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
	labels,
	datasets: [
		{
			label: 'Electronics',
			data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
			backgroundColor: 'rgba(255, 99, 132, 0.5)'
		},
		{
			label: 'Cloths',
			data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
			backgroundColor: 'rgba(53, 162, 235, 0.5)'
		}
	]
};

export function SellingAnalytics() {
	return (
		<Card className="md:w-full">
			<Bar
				options={options}
				data={data}
			/>
		</Card>
	);
}
