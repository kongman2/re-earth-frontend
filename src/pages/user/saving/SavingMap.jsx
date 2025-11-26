import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapComponent from "../../../components/map/MapComponent";
import SearchTap from "./SearchTap";
import Button from "../../../components/common/Button";
import "./SavingMap.scss";

function SavingMap() {
  const category = "nephron";
  // category: nephron / transit
  // 데이터 확인용 임시 코드, 배포 전 삭제
  const [data, setData] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [position, setPosition] = useState({
    lat: 37.5665,
    lng: 126.978,
  });
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="main1" className="user-page saving-map">
      <div className="container p-3">
            <h2 className="saving-map__title">
              내 주변 {category === "nephron" ? "네프론" : "따릉이 대여소"}
            </h2>
            <div className="saving-map__content">
              <div className="row g-3">
                <div className="col-lg-5 col-md-12 order-lg-1 order-2">
                  <SearchTap
                    category={category}
                    isMobile={isMobile}
                    data={data}
                    setData={setData}
                    position={position}
                  />
                </div>
                <div className="col-lg-7 col-md-12 order-lg-2 order-1">
                  <MapComponent
                    category={category}
                    setPosition={setPosition}
                    position={position}
                    data={data}
                  />
                </div>
              </div>
            </div>

            {isMobile ? (
              <div className="saving-map__mobile-actions">
                <p className="saving-map__mobile-text">
                  {category === "nephron" 
                    ? "내가 찾는 네프론이 지도에 보이지 않나요?" 
                    : "내 주변 대여소가 지도에 보이지 않나요?"}
                </p>
                <Button
                  variant="main1"
                  onClick={() => navigate("/readysoon")}
                  fullWidth
                >
                  QR코드 스캔하기
                </Button>
              </div>
            ) : (
              <div className="saving-map__verify">
                <h3 className="saving-map__verify-title">인증하기</h3>
                <div className="saving-map__verify-content">
                  <p className="saving-map__verify-text">
                    해당 기능은 모바일 또는 태블릿 환경에서만<br />
                    이용 가능합니다. 모바일 기기로 접속해주세요.
                  </p>
                </div>
              </div>
            )}
          </div>
    </section>
  );
}

export default SavingMap;
