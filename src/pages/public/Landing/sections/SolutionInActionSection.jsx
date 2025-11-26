import React from 'react';
import LandingSectionLayout from './LandingSectionLayout';
import SolutionSlider from '../../../../components/randing/SolutionSlider';
import './SolutionInActionSection.scss';

export default function SolutionInActionSection() {
  return (
    <LandingSectionLayout
      sectionClass="contents--cards"
      containerClass="h-100 d-flex flex-column justify-content-center"
      titleSubtext="지구의 아픔을 들여다보아요"
      titleText="Solution in Action"
    >
      <SolutionSlider />
    </LandingSectionLayout>
  );
}