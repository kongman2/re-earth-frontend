// re-earth-frontend/src/components/randing/PrimaryServiceSwiper.jsx
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import './PrimaryServiceSwiper.scss'

const PrimaryServiceSwiper = ({ cards }) => {
   return (
      <div className="ps-swiper-container">
         <Swiper
            modules={[Autoplay, Mousewheel]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{
               delay: 3000,
               disableOnInteraction: false,
            }}
            mousewheel={{
               forceToAxis: true,
               sensitivity: 1,
               releaseOnEdges: true,
            }}
            loop={true}
            breakpoints={{
               0: {
                  slidesPerView: 1,
                  spaceBetween: 20,
               },
               576: {
                  slidesPerView: 2,
                  spaceBetween: 20,
               },
               1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
               },
               1200: {
                  slidesPerView: 3,
                  spaceBetween: 24,
               }
            }}
            className="ps-swiper"
         >
            {cards.map((card) => (
               <SwiperSlide key={card.id}>
                  <div className="ps-card">
                     {/* 아이콘 영역 */}
                     <div className="ps-card-icon-section" style={{ backgroundColor: card.bgColor }}>
                        <img 
                           src={card.icon} 
                           alt={card.title}
                           className="ps-icon-image"
                        />
                     </div>
                     
                     {/* 텍스트 영역 */}
                     <div 
                        className={`ps-card-text-section ${card.bgColor === '#D1E95D' || card.bgColor === '#FFCE55' ? 'light-bg' : ''}`}
                        style={{ backgroundColor: card.bgColor }}
                     >
                        <h3 className="ps-card-title">
                           {card.title}
                        </h3>
                        <p className="ps-card-description">
                           {card.description}
                        </p>
                     </div>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   )
}

export default PrimaryServiceSwiper

