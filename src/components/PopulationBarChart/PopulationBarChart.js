import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleBand, scaleLinear, max } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/Oh-David/673ef5330bf8d3451737108407a09883/raw/UN_Population_2020.csv';

const width = 1000;
const height = 1000;

const PopulationBarChart  = () => {
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

  if (!data) {
    return <pre>Loading ... </pre>
  }

  const yScale = scaleBand()
    .domain(data.map(d => d.Country))
    .range([0, height]);

  const xScale = scaleLinear()
    .domain([0, max(data, d => d.Population)])
    .range([0, width]);

  return (
    <svg width={width} height={height}>
      {data.map(d => (
        <rect
          x={0}
          y={yScale(d.Country)}
          width={xScale(d.Population)}
          height={yScale.bandwidth()}
        />
      ))}
    </svg>
  );
};

export default PopulationBarChart;
// const rootElement = document.getElementById('root');
// reactDom.render(<scatterPlot />, rootElement);