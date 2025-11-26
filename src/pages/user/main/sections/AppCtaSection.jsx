import React from "react";

import qrImage from "../../../../assets/icons/reearth-qr.svg";
import phoneImage from "../../../../assets/images/phone.png";

import "../mainpage.scss";

export default function AppCtaSection() {
  return (
    <section id="app-cta" className="app-cta">
      <div className="container">
        <div className="row align-items-center g-3">
          <div className="col-10">
            <div className="d-flex align-items-center flex-nowrap gap-1 gap-md-3 justify-content-center">
              <h4 className="app-cta-title mb-0 text-center text-md-start">
                "Re:earth App으로 더 편리하게, 
                일상의 탄소중립을 실천하세요."
              </h4>
              <img src={phoneImage} alt="스마트폰" className="phone-image" />
            </div>
          </div>
          <div className="col-2">
            <div className="d-flex align-items-center justify-content-center">
              <img src={qrImage} alt="QR 코드" className="qr-image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
