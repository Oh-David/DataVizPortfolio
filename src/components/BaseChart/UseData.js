import React, { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/Oh-David/673ef5330bf8d3451737108407a09883/raw/UN_Population_2020.csv';

export const useData = () => {
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