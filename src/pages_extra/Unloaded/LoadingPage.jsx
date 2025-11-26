import React from 'react'
import './loadingPage.scss'

function LoadingPage() {
   return (
      <main id="main1" className="user-page">
         <div className="container d-flex align-items-center justify-content-center h-100">
            <div className="loading">
               <div className="group d-flex justify-content-center">
                  <div className="circle circle1"></div>
                  <div className="circle circle2"></div>
                  <div className="circle circle3"></div>
               </div>
               <p className="loading-text mt-40">페이지를 불러오는 중이에요</p>
            </div>
         </div>
      </main>
   )
}

export default LoadingPage
