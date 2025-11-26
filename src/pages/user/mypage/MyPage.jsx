// re-earth-frontend/src/pages/user/mypage/MyPage.jsx
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// 탭 컨텐츠 컴포넌트들
import PointInquiryContent from '../../../components/mypage/PointInquiryContent'
import OrderDeliveryContent from '../../../components/mypage/OrderDeliveryContent'
import DonationStatusContent from '../../../components/mypage/DonationStatusContent'
import CommunityContent from '../../../components/mypage/CommunityContent'
import InquiryContent from '../../../components/mypage/InquiryContent'
import CarbonGraphContent from '../../../components/chat/CarbonGraphContent'
import LoadingPage from '../../../pages_extra/Unloaded/LoadingPage'

import { hydrateAuthThunk, logoutUserThunk } from '../../../features/authSlice'
import Alert from '../../../components/common/Alert'

// 아이콘 import
import profileIcon from '../../../assets/icons/profile.png'
import rightArrow from '../../../assets/icons/right-line.svg'

import './MyPage.scss'

const MyPage = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const [activeTab, setActiveTab] = useState('point-inquiry')
   const [practiceCount, setPracticeCount] = useState(15)
   const [alert, setAlert] = useState({ isOpen: false, message: '', variant: 'info', title: null })
   const { user, hydrated } = useSelector((state) => state.auth)

   const showAlert = (message, variant = 'info', title = null) => {
      setAlert({ isOpen: true, message, variant, title })
   }

   const hideAlert = () => {
      setAlert({ isOpen: false, message: '', variant: 'info', title: null })
   }

   useEffect(() => {
      if (!hydrated) {
         dispatch(hydrateAuthThunk())
      }
   }, [dispatch, hydrated])

   const handleLogOut = async () => {
      const confirmOut = confirm('로그아웃하시겠습니까?')
      if (!confirmOut) return

      try {
         await dispatch(logoutUserThunk()).unwrap()
         showAlert('성공적으로 로그아웃했습니다.', 'success', '로그아웃')
         setTimeout(() => {
            navigate('/login', { replace: true, state: { from: '/user/my' } })
         }, 1500)
      } catch (e) {
         // 서버 실패해도 클라 상태는 비워지므로 그대로 진행
         navigate('/login', { replace: true, state: { from: '/user/my' } })
      }
   }

   const tabs = [
      { id: 'point-inquiry', label: '포인트조회' },
      { id: 'order-delivery', label: '주문/배송' },
      { id: 'donation-status', label: '기부 현황' },
      { id: 'community', label: '커뮤니티' },
      { id: 'inquiry', label: '1:1 문의' },
      { id: 'carbon-graph', label: '탄소 절감 그래프' },
   ]

   const renderTabContent = () => {
      switch (activeTab) {
         case 'point-inquiry':
            return <PointInquiryContent />
         case 'order-delivery':
            return <OrderDeliveryContent />
         case 'donation-status':
            return <DonationStatusContent />
         case 'community':
            return <CommunityContent />
         case 'inquiry':
            return <InquiryContent />
         case 'carbon-graph':
            return <CarbonGraphContent />
         default:
            return <PointInquiryContent />
      }
   }

   if (user === null) {
      return <LoadingPage />
   }

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
         <div className="user-page bg-gray">
            <div className="container">
            <div className="row">
               {/* 사이드바 */}
               <div className="col-lg-3 col-md-4 col-12 mb-md-0 mb-3 mypage__sidebar">
                  <div className="d-flex flex-column gap-3 mypage__sidebar__contents">
                     <div className="mb-3">
                        <div className="card-body">
                           <div className="d-flex flex-column align-items-center">
                              <div className="mypage__avatar">
                                 <img src={profileIcon} alt="프로필" className="img-fluid rounded-circle" />
                              </div>
                              <div className="mypage__user-info d-flex flex-column align-items-center">
                                 <span className="mypage__username">{user?.name}</span>
                                 <button
                                    className="mypage__edit-profile"
                                    onClick={() =>
                                       navigate('/user/my/edit', {
                                          state: { user },
                                       })
                                    }
                                 >
                                    프로필수정
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="mypage__card">
                        <div className="card-body">
                           <h4 className="mypage__card-title">새싹</h4>
                           <div className="progress mt-3">
                              <div className="mypage__progress-fill" role="progressbar"></div>
                           </div>
                           <span className="mt-3 d-block mypage__card-description">나무가 되기까지 nnn점</span>
                        </div>
                     </div>

                     <div className="mypage__card">
                        <div className="card-body">
                           <div className="d-flex justify-content-between align-items-center">
                              <span className="mypage__card-title">환경보호 실천 건수</span>
                              <div className="d-flex align-items-center gap-2">
                                 <span className="mypage__count-number">{practiceCount}</span>
                                 <img src={rightArrow} alt="화살표" width="16" height="16" />
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="mypage__card">
                        <div className="card-body d-flex flex-column align-items-center">
                           <h4 className="mypage__card-title">포인트 잔액</h4>
                           <p className="mypage__point-amount h3 text-primary mb-3">1,274 P</p>
                           <button className="d-flex align-items-center gap-2 btn btn--point">
                              포인트 모으러 가기
                              <img src={rightArrow} alt="화살표" width="16" height="16" />
                           </button>
                        </div>
                     </div>

                     <div className="mypage__card mb-3">
                        <div className="card-body">
                           <h4 className="mypage__card-title mb-1">이달 탄소 절감량</h4>
                           <p className="mypage__card-description mb-3">나무 n 그루 심은 것과 같은 효과</p>
                           <div className="mypage__tree-icons d-flex">
                              {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
                                 <div 
                                    key={i} 
                                    className={`mypage__tree mr-1 ${i <= 3 ? 'mypage__tree--filled' : ''}`}
                                 >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                       <rect width="24" height="24" fill="none"/>
                                       <path 
                                          fill={i <= 3 ? '#72C63A' : '#E0E0E0'} 
                                          d="M11 21v-4.26c-.47.17-.97.26-1.5.26C7 17 5 15 5 12.5c0-1.27.5-2.41 1.36-3.23C6.13 8.73 6 8.13 6 7.5C6 5 8 3 10.5 3c1.56 0 2.94.8 3.75 2h.25a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5q-.75 0-1.5-.21V21z" 
                                          strokeWidth="1" 
                                          stroke="#000"
                                       />
                                    </svg>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>

                     <div>
                        <div className="card-body">
                           <div className="d-flex justify-content-around align-items-center">
                              <a href="#" className="mypage__link-btn">
                                 보안 설정
                              </a>
                              <button type="button" className="mypage__link-btn" onClick={handleLogOut}>
                                 로그아웃
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* 메인 컨텐츠 */}
               <div className="col-lg-9 col-md-8 col-12 mypage__main">
                  {/* 탭 네비게이션 */}
                  <nav className="mypage__tabs">
                     <div className="mypage__tabs__list">
                        {tabs.map((tab) => (
                           <button
                              key={tab.id}
                              className={`mypage__tabs__item ${activeTab === tab.id ? 'mypage__tabs__item--active' : ''}`}
                              onClick={() => setActiveTab(tab.id)}
                           >
                              {tab.label}
                           </button>
                        ))}
                     </div>
                  </nav>

                  {/* 탭 컨텐츠 */}
                  <div className="mypage__content">
                     <div className="tab-pane active">{renderTabContent()}</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      </>
   )
}

export default MyPage
