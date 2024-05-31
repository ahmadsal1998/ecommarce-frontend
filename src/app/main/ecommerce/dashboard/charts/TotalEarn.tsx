import React from 'react';
import Card from '@mui/material/Card';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import { currencySymbole } from '../../constants/AppConstants';
import Chart from "react-apexcharts";
import { ApexOptions } from 'apexcharts';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
	responsive: true,
	plugins: {
		
	}
};



export function TotalEarn({chartForProducts, ordersForChart,dateOrder, chartLabel}) {
	const labels = chartLabel as [];
	const options:ApexOptions = {
        chart: {
			id: 'area-datetime',
			type: 'area',
		  toolbar: {
			show: false
		  },
		 
        },
		
		stroke:{
			width:1
		  },
		tooltip: {
			x: {
			  format: 'dd MMM yyyy'
			}
		  },
		  annotations: {
			yaxis: [{
			  y: 0,
			  yAxisIndex: 0,
			  label: {
				borderColor: '#c2c2c2',
				borderWidth: 1,
				borderRadius: 2,
				text: undefined,
			}
			}],
		  },
        xaxis: {
		 type: 'datetime',
		 
		  tickAmount: 0 
        },
		yaxis: {
			labels: {
				show: true
			},
			
			min: 0
        },
		
		grid:{
			show: true,
		
  			borderColor:"rgba(185, 186, 189, 0.4)" ,
			  xaxis: {
				lines: {
				  show: true,
				  offsetX: 0,
				  offsetY: 0
				}
			  }
		},
		
		
		theme:  {
			mode: 'light',
			palette: "palette6",
			monochrome: {
			  enabled: true,
			  color: "#662E9B",
			  shadeTo: 'light',
			  shadeIntensity: 0.1
			}
		  },
		  
      };
     const series= [
        {       
          name: `Earning (${currencySymbole})`,
          data: dateOrder
		 
        }
      ];
 const data = {
	labels,
	datasets: [
		{
			label: `Earning (${currencySymbole})`,
			data: ordersForChart,
			borderColor: 'rgb(255, 99, 132)',
			backgroundColor: 'rgba(255, 99, 132, 0.5)'
		}]
};
	return (
		<div>
			 <Chart
              options={options}
              series={series}
              type="area"
			  key={"totalEarn"}
              height="400"
            />
		</div>
	);
}
