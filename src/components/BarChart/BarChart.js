import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleBand, scaleLinear, max } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/Oh-David/673ef5330bf8d3451737108407a09883/raw/UN_Population_2020.csv';

const width = 1880;
const height = 800;
const margin = { top: 20, right: 20, bottom: 20, left: 200 };

const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = d => {
      d.Population = +d['2020'];
      return d;
    }
    csv(csvUrl, row).then(data => {
      setData(data.slice(0, 10));
    });
  }, []);

  return data;
}

const PopulationBarChart  = () => {
  const data = useData();

  if (!data) {
    return <pre>Loading ... </pre>
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yScale = scaleBand()
    .domain(data.map(d => d.Country))
    .range([0, innerHeight]);

  const xScale = scaleLinear()
    .domain([0, max(data, d => d.Population)])
    .range([0, innerWidth]);
  
  

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>

        {xScale.ticks().map(tickValue => (
          <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
            <line 
              x1={0} 
              y1={0} 
              x2={0} 
              y2={innerHeight} 
              stroke="black" 
            />
            <text 
              style={{textAnchor: 'middle'}} 
              y={innerHeight + 3} 
              dy=".71em">
                {tickValue}
            </text>
          </g>))}

          {yScale.domain().map(tickValue => (
            <text
              key={tickValue}
              style={{textAnchor: 'end'}}
              dy=".32em"
              x={-3}
              y={yScale(tickValue) + yScale.bandwidth()/2}
            >
              {tickValue}
            </text>
            ))}

        {data.map(d => (
          <rect
            key={d.Country}
            x={0}
            y={yScale(d.Country)}
            width={xScale(d.Population)}
            height={yScale.bandwidth()}
          />
        ))}

      </g>
    </svg>
  );
};

export default PopulationBarChart;
// const rootElement = document.getElementById('root');
// reactDom.render(<scatterPlot />, rootElement);