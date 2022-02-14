import React, {Component, useState, useCallback} from "react";
import axios from 'axios';
import {csv, csvFormat, csvParse} from 'd3';

const width = 960;
const height = 500;
const circleX = width / 2;
const circleY = height / 2;
const circleRadius = 30;
const initialMousePosition = {x: width / 2, y: height / 2};

const csvUrl = 'https://gist.githubusercontent.com/Oh-David/11b67208a8ea3e81e5d368a2ac88fdf4/raw/cssColorNames.csv';

export const MouseTracker = () => {
  const [mousePosition, setMousePosition] = useState(initialMousePosition);

  const handleMouseMove = useCallback((event) => {
    const { clientX, clientY } = event;
    setMousePosition({x: clientX, y: clientY})
  }, [setMousePosition]);

  csv(csvUrl).then(data => {
    let message = '';
    message = message + Math.round(csvFormat(data).length / 1024) + ' kB';
    message = message + data.length + ' rows';
    message = message + data.columns.length + ' columns';
    document.body.textContent = message;
  })

  return (
    <svg width={width} height={height} onMouseMove={handleMouseMove}>
      <circle
        cx={mousePosition.x}
        cy={mousePosition.y}
        r={circleRadius}
      />
    </svg>
  );
}

export default MouseTracker;