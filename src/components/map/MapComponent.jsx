import { useEffect, useRef } from "react";
import { Map, CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";

import "./MapComponent.scss";

export default function   MapComponent({
  position,
  setPosition,
  data,
  isTracking,
  path,
}) {
  const mapRef = useRef();

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      console.warn("이 브라우저는 위치 서비스를 지원하지 않습니다.");
      return;
    }

    let watchId = null;

    try {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setPosition(coords);
        },
        (err) => {
          // 에러 타입에 따른 처리
          switch (err.code) {
            case err.PERMISSION_DENIED:
              console.warn("위치 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.");
              break;
            case err.POSITION_UNAVAILABLE:
              console.warn("위치 정보를 사용할 수 없습니다.");
              break;
            case err.TIMEOUT:
              console.warn("위치 정보 요청 시간이 초과되었습니다.");
              break;
            default:
              console.warn("위치 추적 중 오류가 발생했습니다:", err.message);
              break;
          }
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    } catch (error) {
      console.error("위치 추적 초기화 실패:", error);
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [setPosition]);
  return (
    <Map center={position} style={{ width: "100%", height: "400px" }} level={3}>
      <CustomOverlayMap position={position}>
        <div className="marker" />
        <div className="marker-shadow" />
      </CustomOverlayMap>
      {data &&
        data.map((spot, index) => {
          const spotPosition = {
            lat: Number(spot.stationLatitude),
            lng: Number(spot.stationLongitude),
          };
          return (
            <CustomOverlayMap position={spotPosition}>
              <div className="spotmarker">{index}</div>
            </CustomOverlayMap>
          );
        })}
      {isTracking && (
        <Polyline
          path={[path.map((p) => new window.kakao.maps.LatLng(p.lat, p.lng))]}
          strokeWeight={5} // 두께
          strokeColor={"#3c82f6"} // 색상
          strokeOpacity={0.8}
          strokeStyle={"solid"}
        />
      )}
    </Map>
  );
}
