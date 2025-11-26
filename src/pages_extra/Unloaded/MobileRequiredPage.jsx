import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { Icon } from "@iconify/react";
import qrImage from "../../assets/icons/reearth-qr.svg";
import "./errorPage.scss";

const MobileRequiredPage = () => {
  const navigate = useNavigate();

  return (
    <main id="main1" className="user-page user-page--no-scroll">
      <div className="container d-flex align-items-center justify-content-center h-100">
        <div className="underconstruction text-center">
          <Icon 
            icon="mdi:cellphone" 
            width={120} 
            height={120} 
            style={{ color: "#72C63A", marginBottom: "2rem" }}
          />
          <h3 className="mt-40">모바일 기기로 접근해주세요</h3>
          <h4 className="mt-10">
            해당 기능은 모바일 또는 태블릿 환경에서만<br />
            이용 가능합니다.
          </h4>
          <p className="mt-20" style={{ color: "#666", fontSize: "0.9rem" }}>
            모바일 기기에서 접속하시거나<br />
            브라우저 창 크기를 조정해주세요.
          </p>
          <div className="mt-30 d-flex justify-content-center">
            <img 
              src={qrImage} 
              alt="QR 코드" 
              className="qr-image"
              style={{ maxWidth: "150px", height: "auto" }}
            />
          </div>
          <div className="mt-40">
            <Button 
              variant="main1" 
              onClick={() => navigate(-1)}
              className="me-3"
            >
              이전 페이지로
            </Button>
            <Button 
              variant="default" 
              onClick={() => navigate("/user")}
            >
              메인으로
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MobileRequiredPage;

