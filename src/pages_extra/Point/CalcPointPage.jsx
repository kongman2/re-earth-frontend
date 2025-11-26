import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./PointPage.scss";

function CalcPointPage() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { result } = location.state || {};
  const navigate = useNavigate();
  console.log(result);

  return (
    result && (
      <section id="main1" className="user-page">
        <div className="container calcpoint" id="area">
          {isLoading ? (
            <>
              <img src="/src/assets/images/포인트.png" alt="포인트 이미지" />
              <p className="mt-80"> 000님에게 지급될 포인트</p>
              <p className="text-bold">{result?.points}P</p>
              <p className="mt-80 point-description">
                로딩이 완료되면 자동으로 적립돼요
              </p>
            </>
          ) : (
            <>
              <img src="/src/assets/images/완료.png" alt="완료 이미지" />
              <p className="mt-80"> 정상적으로 완료했어요!</p>
              <p className="text-bold">{result?.points}P 받았어요</p>
              <p className="mt-80 point-description">
                3초 후 메인 페이지로 이동해요
              </p>
              <div className="group mt-80">
                <div
                  className="btn default main1"
                  onClick={() => navigate("/user")}
                >
                  지금 바로 이동하기
                </div>
                <div
                  className="btn default main1"
                  onClick={() => navigate("/user/my")}
                >
                  적립 내역 확인하기
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    )
  );
}
export default CalcPointPage;
