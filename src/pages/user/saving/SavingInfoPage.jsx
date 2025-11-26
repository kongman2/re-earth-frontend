import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ttareungiImg from '../../../assets/images/따릉이.png' // 따릉이 이미지 
import savingDeviceImg from '../../../assets/images/네프론.png' // 네프론 이미지 
import savingIcon1 from '../../../assets/icons/re-earth_saving_icon1.png' // 인증 아이콘 
import savingIcon2 from '../../../assets/icons/re-earth_saving_icon2.png' // 인증 아이콘 
import phoneImage from '../../../assets/images/phone.png'
import InfoPageLayout from '../../../components/layout/InfoPageLayout'
import GuideCard from '../../../components/layout/GuideCard'
import Button from '../../../components/common/Button'
import './SavingInfoPage.scss'

export default function SavingInfoPage() {
   const navigate = useNavigate()
   const [isMobile, setIsMobile] = useState(window.innerWidth <= 991.98)

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth <= 991.98)
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
   }, [])

   const goSaving = () => navigate('/saving/bicycle') // SavingBicycle로 이동

   return (
      <InfoPageLayout
         heroTitle="인증하기"
         heroSub="Re:Move(대중교통 / 따릉이)"
         heroTags="#대중교통&nbsp;&nbsp;#따릉이&nbsp;&nbsp;#환경보호&nbsp;&nbsp;#탄소중립&nbsp;&nbsp;#탄소절감실천"
         guideTitle="인증방법안내"
         guideSub={<>대중교통/따릉이<br />Re:Move Project (리:무브 프로젝트)</>}
         guideImage={
            <GuideCard variant="image">
               <img src={ttareungiImg} alt="따릉이 자전거" className="ttareungi-full-img" />
            </GuideCard>
         }
         guideQuote='"따릉이 실천을 지구를 위한 가치로"'
         guideBody={`Re:Move 프로젝트는 따릉이 이용을 친환경 실천으로 전환합니다.
따릉이를 이용한 경우, 출발지와 목적지를 입력하고 인증을 하면 포인트가 적립됩니다.

이렇게 획득한 포인트는 따릉이 이용의 친환경 실천을 실질적인 탄소 절감 성과로 전환하여 일상 속 친환경 라이프를 목적 삼습니다.`}
         guideCta={
            <>
               {/* 모바일 버튼 */}
               <Button 
                  variant="guide" 
                  className={`d-md-none d-flex flex-wrap align-items-center justify-content-center`} 
                  fullWidth 
                  onClick={goSaving}
               >
                  <span>인증하러 가기</span>
                  <img className="cta-icon" src={savingIcon1} alt="" aria-hidden="true" />
               </Button>
               {/* PC 버튼 */}
               <Button 
                  variant="guide" 
                  className={`d-none d-md-flex flex-wrap align-items-center justify-content-center`} 
                  fullWidth 
                  onClick={() => navigate('/mobile-required')}
               >
                  <span>"Re:earth App으로 더 편리하게, <br/>
                  일상의 탄소중립을 실천하세요."</span>
                  <img src={phoneImage} alt="스마트폰" className="phone-image" />
               </Button>
            </>
         }
         guideQuoteColor="#72C63A"
      >
         {/* ─────────── 재활용 수거함 찾기 섹션 ─────────── */}
         <section className="info-guide-wrapper bg-gray">
            <div>
               {/* 위쪽: 제목/설명 */}
               <div className="container guide-head">
                  <h3 className="guide-title">재활용 수거함찾기</h3>
                  <p className="guide-sub">슈퍼빈 파트너쉽 - 네프론</p>
               </div>

               {/* 아래쪽: 좌=텍스트(8) / 우=이미지(4) — 데스크탑에서 한 줄 */}
               <div className="container">
                  <div className="row align-items-stretch guide-row">
                     {/* 좌측: 텍스트 + 버튼 */}
                     <div className="col-12 col-md-7 d-flex">
                        <GuideCard
                           variant="text"
                           quote='"일상 속에서 재활용을 쉽게 실천하세요"'
                           body={`Re:earth는 슈퍼빈과 함께 탄소 중립을 실천하는 새로운 방법을 제안합니다.
재활용 수거함 위치를 쉽게 찾을 수 있도록 도와드리며, 투명한 실천을 통해 실질적인 친환경 라이프를 목적 삼습니다.

이렇게 획득한 포인트는 출퇴길의 친환경 실천을 실질적인 탄소 절감 성과로 전환하여 일상 속 친환경 라이프를 목적 삼습니다.`}
                           cta={
                              <>
                                 {/* 모바일 버튼 */}
                                 <Button 
                                    variant="guide" 
                                    className="d-md-none d-flex align-items-center justify-content-center" 
                                    fullWidth 
                                    onClick={() => navigate('/saving/map')}
                                 >
                                    네프론 찾기
                                    <img className="cta-icon" src={savingIcon2} alt="" aria-hidden="true" />
                                 </Button>
                                 {/* PC 버튼 */}
                                 <Button 
                                    variant="guide" 
                                    className="d-none d-md-flex align-items-center justify-content-center" 
                                    fullWidth 
                                    onClick={() => navigate('/mobile-required')}
                                 >
                                    내 주변 네프론 찾기
                                    <img src={phoneImage} alt="스마트폰" className="phone-image" />
                                 </Button>
                              </>
                           }
                           quoteColor="#72C63A"
                        />
                     </div>

                     {/* 우측: 이미지 */}
                     <div className="col-12 col-md-5 mb-4 mb-md-0 d-flex">
                        <GuideCard variant="image">
                           <img src={savingDeviceImg} alt="재활용 수거함" className="ttareungi-full-img" />
                        </GuideCard>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </InfoPageLayout>
   )
}
