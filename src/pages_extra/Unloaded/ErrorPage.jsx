import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import errorIcon from '../../assets/icons/error.png'
import './errorPage.scss'

function ErrorPage() {
   const error = 404
   const { user } = useSelector((s) => s.auth || {})
   const navigate = useNavigate()
   
   return (
      <main id="main1" className="user-page">
         <div className="container">
            <div className="row align-items-center justify-content-center min-vh-100">
               <div className="col-12 col-md-10 col-lg-8">
                  <div className="error-content">
                     <div className="row align-items-center g-4">
                        <div className="col-12 col-md-4 text-center text-md-start">
                           <div className="error-img">
                              <img src={errorIcon} alt="에러" />
                           </div>
                        </div>
                        <div className="col-12 col-md-8">
                           <div className="error-text">
                              {error === 404 ? (
                                 <>
                                    <p className="error-code">404: Not found</p>
                                    <p className="error-title">죄송합니다. 페이지를 찾을 수 없습니다.</p>
                                    <p className="error-description mt-40">
                                       요청된 페이지가 존재하지 않거나 <br /> 주소가 변경/삭제되어 찾을 수 없습니다.
                                    </p>
                                 </>
                              ) : (
                                 <>
                                    <p className="error-code">500: Error</p>
                                    <p className="error-title">현재 example.com에서 요청을 처리할 수 없습니다.</p>
                                    <p className="error-description mt-40">
                                       시스템 에러가 발생하여 페이지를 표시할 수 없습니다. <br />
                                       서비스 이용에 불편을 드려 죄송합니다.
                                    </p>
                                 </>
                              )}

                              <div className="mt-40">
                                 <Button 
                                    variant="main1" 
                                    onClick={() => navigate('/')}
                                    className="error-back-btn"
                                 >
                                    메인으로 돌아가기
                                 </Button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </main>
   )
}

export default ErrorPage
