export const AxisBottom = ({ xScale, innerHeight }) =>
  xScale.ticks().map(tickValue => (
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
    </g>
  ));