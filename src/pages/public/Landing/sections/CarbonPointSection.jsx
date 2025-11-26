// re-earth-frontend/src/pages/public/Landing/sections/CarbonPointSection.jsx
import { Link } from 'react-router-dom'
import Button from '../../../../components/common/Button'
import EarthImage from '../../../../assets/images/re_Earth-Freepik-Photoroom__1.svg'
import './CarbonPointSection.scss'

export default function CarbonPointSection({ totalCO2 = '？', unitCO2 = 'kg', totalPoint = '？', unitPoint = 'P', treeCount = '？' }) {
   return (
      <section className="panel randing--carbon-point">
         <div className="container">
            <div className="row text-center">
               <div className="col-lg-10 offset-lg-1">
                  {/* 헤드라인 */}
                  <div className="d-flex align-items-center justify-content-center flex-wrap gap-2 gap-md-3 mb-2 mb-md-3">
                     <p className="gmarket headline mb-0">지금까지 절감한 탄소 배출량</p>
                     <div className="value-box">
                        {totalCO2}
                        <small>{unitCO2}</small>
                     </div>
                  </div>

                  {/* 서브카피 */}
                  <p className="title__sub mt-20 mb-0">나무 {treeCount} 그루 심은 것과 동일한 효과</p>

                  {/* 포인트 라인 */}
                  <div className="d-flex align-items-center justify-content-center flex-wrap gap-2 gap-md-3 mt-40 mt-md-60">
                     <p className="headline gmarket mb-0">누적된 포인트</p>
                     <div className="value-box">{totalPoint}</div>
                     <p className="headline gmarket mb-0">P</p>
                  </div>
               </div>
            </div>

            {/* CTA + 이미지 */}
            <div className="row align-items-center mt-40">
               <div className="col-lg-5 offset-lg-1 mb-4 mb-lg-0">
                  <div className="text-center">
                     <p className="lead-ask mb-0">저희와 함께하시겠어요?</p>

                     <div className="carbon-point__cta mt-40">
                        <Button as={Link} to="/register" variant="landing" className="floating-btn">
                           Re:earth 프로젝트 참여하기
                        </Button>
                     </div>

                     <div className="d-flex align-items-center justify-content-center flex-nowrap gap-2 mt-20">
                        <p className="login-text mb-0">회원이신가요?</p>
                        <Link to="/login" className="login-link">
                           로그인하러 가기
                        </Link>
                     </div>
                  </div>
               </div>

               <div className="col-lg-4">
                  <div className="image-box d-flex justify-content-center align-items-center">
                     <img src={EarthImage} alt="지구를 두 손으로 감싸 안은 일러스트" className="img-fluid" />
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}
