import React from 'react';
import useEarthAnimation from '../../hooks/landing/useEarthAnimation';
import './EarthAnimation.scss';

const EarthAnimation = () => {
  const {
    earthRef,
    mapRef,
    cloudsRef,
    faceRef,
    eye1Ref,
    eye2Ref,
    mouthRef
  } = useEarthAnimation();

  return (
    <div ref={earthRef} className="earth">
      <div ref={mapRef} className="earth__map"></div>
      <div ref={cloudsRef} className="earth__clouds"></div>
      <div ref={faceRef} className="earth__face">
        <div ref={eye1Ref} className="earth__eye"></div>
        <div ref={eye2Ref} className="earth__eye"></div>
        <div ref={mouthRef} className="earth__mouth"></div>
      </div>
    </div>
  );
};

export default EarthAnimation;
