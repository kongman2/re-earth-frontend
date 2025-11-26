import { useEffect, useState } from "react";
import QrScanner from "../../../components/common/QrScanner";
import { getBicycles } from "../../../api/savingApi";

function SearchTap({ category, isMobile, data, setData, position }) {
  const [allStations, setAllStations] = useState([]);

  function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371e3; // 지구 반경 (미터)
    const toRad = (deg) => (deg * Math.PI) / 180;

    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lng2 - lng1);

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // meter
  }

  useEffect(() => {
    (async () => {
      try {
        const res1 = await getBicycles(1, 1000);
        const res2 = await getBicycles(1001, 2000);
        const res3 = await getBicycles(2001, 3000);
        setAllStations([...res1.data, ...res2.data, ...res3.data]);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (category === "transit" && allStations.length > 0) {
      const myLat = position.lat;
      const myLng = position.lng;

      const nearby = allStations
        .filter((station) => {
          const dist = getDistance(
            myLat,
            myLng,
            Number(station.stationLatitude),
            Number(station.stationLongitude)
          );
          return dist <= 1000;
        })
        .sort((a, b) => {
          const distA = getDistance(
            myLat,
            myLng,
            Number(a.stationLatitude),
            Number(a.stationLongitude)
          );
          const distB = getDistance(
            myLat,
            myLng,
            Number(b.stationLatitude),
            Number(b.stationLongitude)
          );
          return distA - distB;
        });

      setData(nearby);
    }
  }, [category, position, allStations]);

  const TestBox = () => {
    return (
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "100%",
          backgroundColor: "blue",
        }}
      ></div>
    );
  };
  if (data) {
    console.log("🎈data:", data);
  }
  return data?.length > 0 ? (
    <div className="searchtap user-page">
      <div className="searchtap__result">
        내 주변 반경 1km 이내의 대여소
        <span className="searchtap__count active">{data?.length}</span>곳
      </div>
      {data.map((spot, index) => {
        const distMeter = getDistance(
          position.lat,
          position.lng,
          Number(spot.stationLatitude),
          Number(spot.stationLongitude)
        ).toFixed(0);

        return (
          <div className="searchtap__spot" key={index}>
            <div className="searchtap__marker">{index + 1}</div>
            <div className="searchtap__address">
              <div className="searchtap__address-text">
                <p className="searchtap__station-name">{spot.stationName.replace(/^\d+\.\s*/, "")}</p>
                <div className="searchtap__distance">
                  {isMobile && <span>내 위치에서&nbsp;</span>}
                  {distMeter} m
                </div>
              </div>
              <div className="searchtap__description">
                <div className="searchtap__description-item">
                  대여 가능{" "}
                  {spot.parkingBikeTotCnt > 0 ? (
                    <span className="active">{spot.parkingBikeTotCnt}대</span>
                  ) : (
                    <span className="none">없음</span>
                  )}
                </div>
                <div className="searchtap__description-item">
                  주차 가능 거치대{" "}
                  {spot.shared > 100 ? (
                    <span className="none">없음</span>
                  ) : (
                    <span className="active">있음</span>
                  )}
                </div>
              </div>
            </div>
            {isMobile && category === "transit" && (
              <QrScanner label={"인증하기"} />
            )}
          </div>
        );
      })}
    </div>
  ) : (
    <div className="no-result">
      <p>반경 1km 이내에 대여소가 없습니다.</p>
    </div>
  );
}

export default SearchTap;
