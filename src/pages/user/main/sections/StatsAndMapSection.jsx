// re-earth-frontend/src/pages/user/main/sections/StatsAndMapSection.jsx
import React, { useState } from "react";

import MapComponent from "../../../../components/map/MapComponent";
import Button from "../../../../components/common/Button";
import ArrowIcon from "../../../../components/common/ArrowIcon";

import "../mainpage.scss";

const COMMUNITY = [
  "제인도가 방금 5kg의 옷을 기부했습니다.",
  "이번 주말에 해변 청소 이벤트가 열립니다!",
  "제인도가 방금 5kg의 옷을 기부했습니다.",
  "000님 nnnnn P 달성!",
];

export default function StatsAndMapSection() {
  const [position, setPosition] = useState({
    lat: 37.5665,
    lng: 126.978,
  });
  return (
    <section id="stats" className="main--stats section">
      <div className="container">
        <div className="row align-items-stretch">
          {/* Left: stats(3) + community - 2열 2행 그리드 */}
          <div className="col-12 col-lg-6 mb-4 mb-lg-0 d-flex">
            <div className="row g-3 w-100 ms-0 me-0">
              {/* 오늘의 미션 */}
              <div className="col-12 col-sm-6">
                <div className="custom-card custom-card-green-bg h-100 d-flex flex-column justify-content-center">
                  <div className="custom-card-content">
                    <h5 className="custom-card-title mb-3">
                      오늘의 미션
                    </h5>
                    <p className="custom-card-text">
                      일회용 컵 대신 텀블러를 사용하세요!
                      <br />
                      달성시 <span className="custom-card-point">nn P</span> 적립
                    </p>
                    <Button className="d-flex justify-content-center align-items-center" variant="point" fullWidth as="a" href="/readysoon">
                      미션 시작하기 →
                    </Button>
                  </div>
                </div>
              </div>

              {/* 내 탄소 포인트 */}
              <div className="col-12 col-sm-6">
                <div className="custom-card h-100 d-flex flex-column justify-content-center">
                  <div className="custom-card-content">
                    <h5 className="custom-card-title mb-3">
                      내 탄소 포인트
                    </h5>
                    <p className="custom-card-subtitle--orange">
                      포인트 분석한마디
                    </p>
                    <p className="custom-card-label">Total</p>
                    <h3 className="custom-card-value">nn,nnn P</h3>
                  </div>
                </div>
              </div>

              {/* 이달 탄소 절감량 */}
              <div className="col-12 col-sm-6">
                <div className="custom-card h-100 d-flex flex-column justify-content-center">
                  <div className="custom-card-content">
                    <div className="carbon-reduction-inline">
                      <h5 className="carbon-reduction-inline__title">이달 탄소 절감량</h5>
                      <p className="carbon-reduction-inline__description">나무 n 그루 심은 것과 같은 효과</p>
                      <div className="carbon-reduction-inline__tree-icons d-flex flex-wrap justify-content-center">
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
                          <div
                            key={i}
                            className={`carbon-reduction-inline__tree ${i <= 3 ? 'carbon-reduction-inline__tree--filled' : ''}`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                              <rect width="24" height="24" fill="none"/>
                              <path
                                fill={i <= 3 ? '#72C63A' : '#E0E0E0'}
                                d="M11 21v-4.26c-.47.17-.97.26-1.5.26C7 17 5 15 5 12.5c0-1.27.5-2.41 1.36-3.23C6.13 8.73 6 8.13 6 7.5C6 5 8 3 10.5 3c1.56 0 2.94.8 3.75 2h.25a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5q-.75 0-1.5-.21V21z"
                                strokeWidth="1"
                                stroke="#000"
                              />
                            </svg>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 커뮤니티 */}
              <div className="col-12 col-sm-6">
                <div className="community-custom-card custom-card-yellow-bg h-100 d-flex flex-column">
                  <div className="community-title d-flex align-items-center justify-content-between">
                    <h5 className="custom-card-title">
                      Community
                    </h5>
                    <a href="/readysoon">
                      <ArrowIcon variant="section" size={32} />
                    </a>
                  </div>
                  <div className="community-feed">
                    {COMMUNITY.map((item, index) => (
                      <div
                        key={index}
                        className="community-feed-item"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map */}
          <div className="col-12 col-lg-6">
            <div className="custom-card map-custom-card-green-bg h-100 border">
              <div className="custom-card-body">
                <div className="custom-card-header d-flex align-items-center justify-content-between">
                  <h5 className="custom-card-title">
                    내 주변 따릉이 대여소
                  </h5>
                  <a href="/saving/map">
                    <ArrowIcon variant="section" size={32} />
                  </a>
                </div>
                <p className="custom-card-description">
                  간편하게 내 주변 따릉이 대여소를 찾아보세요
                </p>
                <MapComponent position={position} setPosition={setPosition} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
