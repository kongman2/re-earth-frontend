import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../../components/layout/Card";
import "../mainpage.scss";
import inquiryIcon from "../../../../assets/images/1대1문의.png";
import faqIcon from "../../../../assets/images/FAQ.png";
import noticeIcon from "../../../../assets/images/공지사항.png";
import feedbackIcon from "../../../../assets/images/고객의소리.png";

const SUPPORT = [
  {
    title: "1:1 문의",
    desc: "고객님의 소중한 의견을 신속하게 접수하고 처리합니다.",
    img: inquiryIcon,
    path: "/inquiry/new",
  },
  {
    title: "FAQ",
    desc: "자주 묻는 질문을 모아 보다 빠르게 문제를 해결하실 수 있습니다.",
    img: faqIcon,
    path: "/inquiry/faq",
  },
  {
    title: "공지사항",
    desc: "원활한 서비스를 위해 공지를 확인해주세요.",
    img: noticeIcon,
    path: "/readysoon",
  },
  {
    title: "고객의 소리",
    desc: "다양한 의견을 듣고 더 나은 서비스를 위해 반영하겠습니다.",
    img: feedbackIcon,
    path: "/readysoon",
  },
];

export default function SupportSection() {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <section id="support" className="main-support section">
      <div className="container">
        <div className="row">
          <div className="col-md-4 d-flex flex-column justify-content-start mb-4 mb-md-0">
            <h2 className="main--section__title main--section__title--support mb-1">
              Customer Support
            </h2>
            <p className="support-section-subtitle">고객지원</p>
          </div>
          <div className="col-md-8">
            <div className="row g-3">
              {SUPPORT.map((item, idx) => (
                <div className="col-sm-6" key={idx}>
                  <Card
                    variant="elevated"
                    className="h-100 support-card"
                    onClick={() => handleCardClick(item.path)}
                  >
                    <h6 className="support-card-title">
                      {item.title}
                    </h6>
                    <p className="support-card-text">
                      {item.desc}
                    </p>
                    <div className="support-icon">
                      <img src={item.img} alt={item.title} />
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
