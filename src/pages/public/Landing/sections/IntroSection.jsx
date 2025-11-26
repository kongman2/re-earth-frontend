import React from 'react';
import useEarthAnimation from '../../../../hooks/landing/useEarthAnimation';
import EarthAnimation from '../../../../components/randing/EarthAnimation';
import EarthOrbit from '../../../../components/randing/EarthOrbit';
import './IntroSection.scss';

export default function IntroSection() {
  useEarthAnimation();

  return (
    <section className="panel panel--intro">
      <div className="container">
        <h1 className="hero-title">
          알아볼 필요 <span className="t-em1">NO</span>,<br className="hero-br" />
          앱 하나면 <span className="t-em2">ALL</span>
        </h1>

        <div className="earth-wrap">
          <div id="app">
            <EarthAnimation />
          </div>
          <EarthOrbit />
        </div>
      </div>
    </section>
  );
}