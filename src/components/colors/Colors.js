import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, arc, pie } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/Oh-David/11b67208a8ea3e81e5d368a2ac88fdf4/raw/cssColorNames.csv';

const width = 1000;
const height = 1000;
const centerX = width / 2;
const centerY = width / 2;

const pieArc = arc()
  .innerRadius(0)
  .outerRadius(width);

const Colors  = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl).then(setData);
  }, []);

  if (!data) {
    return <pre>Loading ... </pre>
  }
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX},${centerY})`}>
        {pie().value(1)(data).map(d => (
          <path 
            fill={d.data['RGB hex value']} 
            d={pieArc(d)} 
          />
        ))}

        {/* {data.map((d, i) => (
          <path 
          fill={d['RGB hex value']} 
          d={pieArc({
            startAngle: i / data.length * 2 * Math.PI,
            endAngle: ((i + 1)/ data.length) * 2 * Math.PI
          })} 
          />
        ))} */}
      </g>
    </svg>
  );
};

export default Colors;
// const rootElement = document.getElementById('root');
// reactDom.render(<scatterPlot />, rootElement);