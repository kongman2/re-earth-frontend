import { useState, useRef } from "react";
import { rideBicycle } from "../../../api/savingApi";
import MapComponent from "../../../components/map/MapComponent";
import Button from "../../../components/common/Button";
import Alert from "../../../components/common/Alert";
import "./Saving.scss";
import { useNavigate } from "react-router-dom";

function SavingBicycle() {
  const [position, setPosition] = useState({ lat: 37.5665, lng: 126.978 });
  const [path, setPath] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [alert, setAlert] = useState({ isOpen: false, message: '', variant: 'info', title: null });

  const watchIdRef = useRef(null);
  const navigate = useNavigate();

  const showAlert = (message, variant = 'info', title = null) => {
    setAlert({ isOpen: true, message, variant, title });
  };

  const hideAlert = () => {
    setAlert({ isOpen: false, message: '', variant: 'info', title: null });
  };

  // 경로 기록 시작
  const startTracking = () => {
    if (!("geolocation" in navigator)) {
      showAlert("GPS를 지원하지 않는 브라우저예요", "error", "오류");
      return;
    }

    try {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          setIsTracking(true);

          console.log("기록 중인가요?:", isTracking);

          const { latitude, longitude } = pos.coords;
          setPosition({ lat: latitude, lng: longitude });
          setPath((prev) => [...prev, { lat: latitude, lng: longitude }]);
        },
        (err) => {
          // 에러 타입에 따른 처리
          let errorMessage = "경로 추적 중 오류가 발생했습니다.";
          
          switch (err.code) {
            case err.PERMISSION_DENIED:
              errorMessage = "위치 권한이 거부되었습니다.\n브라우저 설정에서 위치 권한을 허용해주세요.";
              setIsTracking(false);
              if (watchIdRef.current) {
                navigator.geolocation.clearWatch(watchIdRef.current);
                watchIdRef.current = null;
              }
              break;
            case err.POSITION_UNAVAILABLE:
              errorMessage = "위치 정보를 사용할 수 없습니다.";
              break;
            case err.TIMEOUT:
              errorMessage = "위치 정보 요청 시간이 초과되었습니다.";
              break;
            default:
              errorMessage = `경로 추적 오류: ${err.message || "알 수 없는 오류"}`;
              break;
          }
          
          console.error("경로 트래킹 에러:", err);
          showAlert(errorMessage, "error", "위치 추적 오류");
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 }
      );
    } catch (error) {
      console.error("위치 추적 초기화 실패:", error);
      showAlert("위치 추적을 시작할 수 없습니다.", "error", "오류");
    }
  };
  // 경로 기록 종료 - 데이터 전송
  const stopTracking = async () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }
    const distanceKm = calcDistance(path); // 경로 기반 거리(km) 계산
    try {
      const res = await rideBicycle({ userId: 1, bikeId: 4, distanceKm });
      console.log("기록된 데이터:", res.data);
      setIsTracking(false);
      showAlert("기록이 완료되었어요! 포인트 지급 페이지로 이동할게요.", "success", "기록 완료");
      setTimeout(() => {
        navigate("/saving/point", { state: { result: res.data } });
      }, 1500);
    } catch (err) {
      console.error("서버 기록 실패:", err);
    }
  };

  console.log("기록 중인가요?:", isTracking);

  // 두 좌표 사이 거리(km) 계산 (Haversine 공식)
  const calcDistance = (points) => {
    if (points.length < 2) return 0;
    let total = 0;
    for (let i = 1; i < points.length; i++) {
      total += haversine(points[i - 1], points[i]);
    }
    return total;
  };

  const haversine = (p1, p2) => {
    const R = 6371; // 지구 반지름 (km)
    const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
    const dLng = ((p2.lng - p1.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((p1.lat * Math.PI) / 180) *
        Math.cos((p2.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  return (
    <>
      {alert.isOpen && (
        <Alert
          variant={alert.variant}
          title={alert.title}
          isModal={true}
          dismissible={true}
          onClose={hideAlert}
          size="sm"
        >
          {alert.message}
        </Alert>
      )}
      <section id="main1" className="user-page saving-bicycle">
        <div className="container p-3">
              <h2 className="saving-bicycle__title">따릉이 인증하기</h2>
              <div className="saving-bicycle__content">
              <div className="saving-bicycle__map">
                <MapComponent 
                  setPosition={setPosition} 
                  position={position}
                  isTracking={isTracking}
                  path={path}
                />
              </div>
              <div className="saving-bicycle__actions">
                {!isTracking ? (
                  <Button
                    variant="main2"
                    className="saving-bicycle__start-btn"
                    onClick={startTracking}
                    disabled={isTracking}
                    fullWidth
                  >
                    따릉이 출발하기
                  </Button>
                ) : (
                  <Button
                    variant="main1"
                    className="saving-bicycle__stop-btn"
                    onClick={stopTracking}
                    disabled={!isTracking}
                    fullWidth
                  >
                    기록 종료
                  </Button>
                )}
              </div>
            </div>
          </div>
      </section>
    </>
  );
}

export default SavingBicycle;
