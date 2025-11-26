import React from "react";
import "./PartnerSection.scss";
import kmongLogo from "../../../../assets/icons/kmong_logo.svg";
import jobkoreaLogo from "../../../../assets/icons/잡코리아_logo.svg";
import kasaLogo from "../../../../assets/icons/카사_logo.svg";
import hyundaiCardLogo from "../../../../assets/icons/현대카드_logo.svg";
import daumLogo from "../../../../assets/icons/Daum_logo.svg";

const PARTNERS = [
  {
    id: 1,
    name: "kmong",
    logo: kmongLogo,
  },
  {
    id: 2,
    name: "JOBKOREA",
    logo: jobkoreaLogo,
  },
  {
    id: 3,
    name: "kasa",
    logo: kasaLogo,
  },
  {
    id: 4,
    name: "Hyundai Card",
    logo: hyundaiCardLogo,
  },
  {
    id: 5,
    name: "Daum",
    logo: daumLogo,
  },
];

export default function PartnerSection() {
  // 무한 스크롤을 위해 로고를 복제
  const duplicatedPartners = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section id="partner" className="panel main--partner section">
      <div className="container-fluid">
        <div className="landing-section__title mb-5">
          <p>우리와 함께하고 있어요</p>
          <h2>Partner Company</h2>
        </div>
        <div className="partner-logos-wrapper">
          <div className="partner-logos">
            {duplicatedPartners.map((partner, index) => (
              <div key={`${partner.id}-${index}`} className="partner-logo-item">
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="partner-logo"
                  />
                ) : (
                  <div className="partner-logo-placeholder">{partner.name}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

