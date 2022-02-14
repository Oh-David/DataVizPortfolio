import React, {Component} from "react";
import { BackgroundCircle } from './BackgroundCircle';
import { Eyes } from './Eyes';
import { Mouth } from './Mouth';
import { FaceContainer } from './FaceContainer';

export default class SmileyFace extends Component {
  
  render() {
    const width = 960;
    const height = 500;
    const centerX = width/2;
    const centerY = height/2;
    const strokeWidth = 10;
    const radius = centerY - (strokeWidth/2);
    const eyeRadius = 50;
    const eyeOffSetX = 100;
    const eyeOffSetY = 100;

    const mouthWidth = 20;
    const mouthRadius = 140;

    return (
    <div>
      <FaceContainer 
        width={width}
        height={height}
        centerX={centerX}
        centerY={centerY}
      >
        <BackgroundCircle 
          radius={radius}
          strokeWidth={strokeWidth}
        />
        <Eyes 
          eyeOffSetX={eyeOffSetX}
          eyeOffSetY={eyeOffSetY}
          eyeRadius={eyeRadius}
          />
        <Mouth 
          mouthRadius={mouthRadius}
          mouthWidth={mouthWidth}
        />
      </FaceContainer>
    </div>
    )
  }
}