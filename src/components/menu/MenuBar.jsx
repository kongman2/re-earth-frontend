import React from 'react'
import { useNavigate } from 'react-router-dom'
import './MenuBar.scss'

const MenuBar = () => {
   const navigate = useNavigate()

   const handleLogoClick = () => {
      navigate('/user')
   }

   const handleMyPageClick = () => {
      navigate('/user/my')
   }


   return (
      <nav className="menu-bar-custom ">
         <div className="container d-flex justify-content-between align-items-center h-100">
            {/* 로고 */}
            <div 
               className="logo-custom" 
               onClick={handleLogoClick}
               role="button"
               tabIndex={0}
            >
               RE:EARTH
            </div>

            {/* 마이페이지 아이콘 */}
            <div 
               className="d-flex align-items-center justify-content-center icon-container-custom" 
               onClick={handleMyPageClick}
               role="button"
               tabIndex={0}
            >
               <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24"
               >
                  <rect width="24" height="24" fill="none"/>
                  <path 
                     fill="#72C63A" 
                     d="M11.5 14c4.14 0 7.5 1.57 7.5 3.5V20H4v-2.5c0-1.93 3.36-3.5 7.5-3.5m6.5 3.5c0-1.38-2.91-2.5-6.5-2.5S5 16.12 5 17.5V19h13zM11.5 5A3.5 3.5 0 0 1 15 8.5a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8 8.5A3.5 3.5 0 0 1 11.5 5m0 1A2.5 2.5 0 0 0 9 8.5a2.5 2.5 0 0 0 2.5 2.5A2.5 2.5 0 0 0 14 8.5A2.5 2.5 0 0 0 11.5 6" 
                     strokeWidth="0.5" 
                     stroke="#72C63A"
                  />
               </svg>
            </div>
         </div>
      </nav>
   )
}

export default MenuBar
