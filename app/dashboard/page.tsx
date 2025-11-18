"use client";

import { Bar } from '@ant-design/plots';
import { Line } from '@ant-design/plots';
import { Pie } from '@ant-design/plots';
import { Box } from '@ant-design/plots';
import React, { useEffect, useState } from 'react';

type BarData = { letter: string; frequency: number };

export default function DashboardPage() {

  // Grouped Bar Data
  const [data, setData] = useState<BarData[]>([]);

  useEffect(() => {
    fetch('https://render.alipay.com/p/yuyan/180020010001215413/antd-charts/bar-bar.json')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Failed to fetch chart data', err));
  }, []);

  const config = {
    data,
    xField: 'letter',
    yField: 'frequency',
    sort: { reverse: true },
    label: {
      formatter: '.1%',
      style: {
        textAlign: (d: BarData) => +d.frequency > 0.008 ? 'right' : 'start',
        fill: (d: BarData) => +d.frequency > 0.008 ? '#fff' : '#000',
        dx: (d: BarData) => +d.frequency > 0.008 ? -5 : 5,
      },
    },
    axis: {
      y: { labelFormatter: '.0%' },
    },
  };

  // Line Chart
  const configLine = {
    data: [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ],
    xField: 'year',
    yField: 'value',
    point: {
      shapeField: 'square',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };

  // Pie Chart
  const configPie = {
    data: [
      { type: 'Type A', value: 27 },
      { type: 'Type B', value: 25 },
      { type: 'Type C', value: 18 },
      { type: 'Type D', value: 15 },
      { type: 'Type E', value: 10 },
      { type: 'Type F', value: 5 },
    ],
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  }

  const configBoxPlot = {
    data: [
      { x: 'Oceania', y: [1, 9, 16, 22, 24] },
      { x: 'East Europe', y: [1, 5, 8, 12, 16] },
      { x: 'Australia', y: [1, 8, 12, 19, 26] },
      { x: 'South America', y: [2, 8, 12, 21, 28] },
      { x: 'North Africa', y: [1, 8, 14, 18, 24] },
      { x: 'North America', y: [3, 10, 17, 28, 30] },
      { x: 'West Europe', y: [1, 7, 10, 17, 22] },
      { x: 'West Africa', y: [1, 6, 8, 13, 16] },
    ],
    xField: 'x',
    yField: 'y',
    style: {
      stroke: '#545454',
      fill: '#1890FF',
      fillOpacity: 0.3,
    },
  }

  return (
    
    <div>
      <h3 className='text-secondary mb-3'><strong>Dashboard</strong></h3>

      {/* Bar chart */}
      <div className='row d-flex align-items-center mb-4'>
        <div className='col-6'>
          <div className='card'>
            <div className='card-header'>
              <label><strong>Bar Chart</strong></label>
            </div>
            <div className='card-body'>
              <div className='' style={{height: '300px'}}>
                {data.length > 0 ? <Bar {...config} /> : <p>Loading chart...</p>}
              </div>
            </div>
          </div>
        </div>
        
        <div className='col-6'>
          {/* Line chart */}
          <div className='card'>
            <div className='card-header'>
              <label><strong>Line Chart</strong></label>
            </div>
            <div className='card-body'>
              <div style={{height: '300px'}}>
                {data.length > 0 ? <Line {...configLine} /> : <p>Loading chart...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className='row d-flex align-items-center'>
        <div className='col-6'>
          <div className='card'>
            <div className='card-header'>
              <label><strong>Pie Chart</strong></label>
            </div>
            <div className='card-body'>
              <div style={{height: '300px'}}>
                {data.length > 0 ? <Pie {...configPie} /> : <p>Loading chart...</p>}
              </div>
            </div>
          </div>
        </div>

        <div className='col-6'>
          <div className='card'>
            <div className='card-header'>
              <label><strong>Box Plot Chart</strong></label>
            </div>
            <div className='card-body'>
              <div style={{height: '300px'}}>
                {data.length > 0 ? <Box {...configBoxPlot} /> : <p>Loading chart...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      

    </div>
  
  );
}
