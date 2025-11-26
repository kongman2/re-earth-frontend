import React from "react";
import "./errorPage.scss";

const UnderConstruction = () => {
  return (
    <main id="main1" className="user-page user-page--no-scroll">
      <div className="container d-flex align-items-center justify-content-center h-100">
        <div className="underconstruction">
          <img src="/src/assets/images/세팅.png" alt="서비스 준비 중" />
          <h3 className="mt-40">서비스 준비 중입니다.</h3>
          <h4 className="mt-10">빠른 시일 내에 준비하여 찾아뵙겠습니다.</h4>
        </div>
      </div>
    </main>
  );
};

export default UnderConstruction;
