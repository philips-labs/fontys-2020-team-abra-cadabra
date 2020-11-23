//react
import React from 'react';
import {useEffect} from 'react';
//bootstrap
import {} from 'react-bootstrap';
//Bar chart
import {Bar, Chart} from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

const data = {
    labels: ['Cooking', 'Gaming', 'Subject', 'Subject', 'Subject', 'Subject', 'Subject', 'Subject'],
    datasets: [
      {
        label: 'Hot topics', 
        backgroundColor: '#17A2B8',
        data: [90, 85, 65, 59, 80, 81, 56, 55]
      }
    ]
  };
  
  const BarOptions = {
    tooltips: {
      enabled: false
    },
    plugins: {
      datalabels: {
         display: true,
         color: 'white',
         anchor: 'end',
         align: 'top'
      }
   },
    legend: {
      display: false,
      labels: {
          fontSize: 10,
          fontStyle: 'bold',
          fontFamily: 'Roboto',
      },
   },
    scales: {
        yAxes: [{
            display: false,
            ticks: {
                suggestedMin: 0, // minimum will be 0, unless there is a lower value.
                suggestedMax: 110,   //heighest value + a little bit 
                // OR //
                beginAtZero: true,   // minimum value will be 0.
                stepSize: 2
            }
        }],
        xAxes: [{
          gridLines: {
            display: false,
          },
          ticks: {
              fontColor: "white",
              fontSize: 12,
              stepSize: 1,
              beginAtZero: true
          }
      }]
    }
  };

export default function Dashboard_BarChart() {

     //register color plugin for chart
     useEffect(() => {
        Chart.plugins.register({
          beforeDraw: function(chartInstance, easing) {
            var ctx = chartInstance.chart.ctx;
            ctx.fillStyle = '#6C757D'; // your color here
        
            var chartArea = chartInstance.chartArea;
            ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
          }
        });
      });

    return (
        <>
            <Bar data={data} options={BarOptions} width={250} height={120}/>
        </>
    );
}