import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleBand, scaleLinear, max } from 'd3';
import { useData } from './UseData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const width = 1880;
const height = 800;
const margin = { top: 20, right: 20, bottom: 20, left: 200 };

const PopulationBarChart  = () => {
  const data = useData();

  if (!data) {
    return <pre>Loading ... </pre>
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yValue = d => d.Country;
  const xValue = d => d.Population;

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight]);

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} />
        <AxisLeft yScale={yScale} />
        <Marks 
          data={data} 
          xScale={xScale} 
          yScale={yScale} 
          xValue={xValue}
          yValue={yValue}
        />
      </g>
    </svg>
  );
};

export default PopulationBarChart;