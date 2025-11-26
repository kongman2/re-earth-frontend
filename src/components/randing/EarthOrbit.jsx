import React from 'react';
import './EarthOrbit.scss';

const EarthOrbit = () => {
  return (
    <svg className="earth-orbit" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <path id="txt-path" d="M50,50 m -52,0 a 52,52 0 1,0 104,0 a 52,52 0 1,0 -104,0" />
      </defs>
      <g className="orbit-scale">
        <circle className="orbit-anchor" cx="50" cy="50" r="52" fill="rgba(0,0,0,0)" />
        <g className="orbit-rotator">
          <text className="orbit-text">
            <textPath href="#txt-path" startOffset="0" spacing="auto" method="align">
              • Environment • Donation • Sustainable • Community
            </textPath>
          </text>
        </g>
      </g>
    </svg>
  );
};

export default EarthOrbit;
