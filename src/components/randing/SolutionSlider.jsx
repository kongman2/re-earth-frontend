// re-earth-frontend/src/components/randing/SolutionSlider.jsx
import { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import './SolutionSlider.scss'

// 이미지 import
import imgProblem1 from '../../assets/images/환경문제1img.png'
import imgProblem2 from '../../assets/images/환경문제2img.png'
import imgProblem3 from '../../assets/images/환경문제3img.png'

const SolutionSlider = () => {
   const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 991)
   const swiperRef = useRef(null)

   useEffect(() => {
      let timeoutId
      const checkMobile = () => {
         clearTimeout(timeoutId)
         timeoutId = setTimeout(() => {
            const newIsMobile = window.innerWidth <= 991
            if (newIsMobile !== isMobile) {
         setIsMobile(newIsMobile)
      }
         }, 100)
      }
      window.addEventListener('resize', checkMobile)
      return () => {
         window.removeEventListener('resize', checkMobile)
         clearTimeout(timeoutId)
      }
   }, [isMobile])

   // direction 변경 시 Swiper 업데이트
   useEffect(() => {
      if (swiperRef.current) {
         swiperRef.current.changeDirection(isMobile ? 'horizontal' : 'vertical')
         swiperRef.current.update()
      }
   }, [isMobile])

   const solutionData = [
      {
         id: 1,
         question: {
            image: imgProblem1,
            alt: '아타카마 사막의 헌 옷 쓰레기 더미',
            title: '아타카마 사막의<br/>헌 옷 쓰레기 더미',
            description: "'패스트 패션'의 무덤, 헌 옷 4만톤이 매년 칠레 사막에 버려집니다.<br/>매립·소각 과정에서 탄소배출과 미세플라스틱이 발생합니다.",
         },
         solution: {
            title: '헌 옷 1kg 재사용',
            effect: '3.6kg CO₂ 절감',
            description: '재활용/리유즈 효과',
         },
      },
      {
         id: 2,
         question: {
            image: imgProblem2,
            alt: '태평양 쓰레기 섬',
            title: '태평양에 나타난<br/>두 개의 쓰레기 섬',
            description: '해류를 타고 모인 부유성 쓰레기가 바다 한가운데 섬을 이룹니다.<br/>해양 생태계에 치명적인 피해를 줍니다.',
         },
         solution: {
            title: '페트병 100만 개',
            effect: '60톤 CO₂ 절감',
            description: '나무 2,700그루 식재 효과',
         },
      },
      {
         id: 3,
         question: {
            image: imgProblem3,
            alt: '지구 열대화와 기후 위기',
            title: '지구 열대화와<br/>기후 위기',
            description: '온실가스로 지구 평균 기온이 상승 중입니다. 지금의 행동이 미래를 바꿉니다.',
         },
         solution: {
            title: '내 차 대신 대중교통',
            effect: 'CO₂ 약 20% 절감',
            description: '서울 기준 통근',
         },
      },
   ]

   const RecycleIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
         <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path d="M22 12c0 6-4.39 10-9.806 10C7.792 22 4.24 19.665 3 16m-1-4C2 6 6.39 2 11.807 2C16.208 2 19.758 4.335 21 8" />
            <path d="m7 17l-4-1l-1 4M17 7l4 1l1-4" />
         </g>
      </svg>
   )

   return (
      <div className="cards-swiper">
         <Swiper
            modules={[Pagination, Mousewheel]}
            spaceBetween={0}
            slidesPerView={1}
            direction={isMobile ? 'horizontal' : 'vertical'}
            loop={!isMobile}
            speed={isMobile ? 450 : 650}
            mousewheel={!isMobile ? { 
               enabled: true, 
               forceToAxis: true,
               releaseOnEdges: true,
               sensitivity: 1,
               thresholdDelta: 50
            } : false}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => {
               swiperRef.current = swiper
            }}
            onResize={(swiper) => {
               swiper.update()
            }}
            onAfterInit={(swiper) => {
               const isCurrentlyMobile = window.innerWidth <= 991
               if (!isCurrentlyMobile && swiper.pagination?.el) {
                  const handleClick = (e) => {
                     const bullet = e.target.closest('.swiper-pagination-bullet')
                     if (bullet && swiper.pagination?.bullets) {
                        const index = Array.from(swiper.pagination.bullets).indexOf(bullet)
                        if (index !== -1) swiper.slideToLoop(index)
                     }
                  }
                  swiper.pagination.el.addEventListener('click', handleClick)
               }
            }}
            className="blog-slider"
         >
            {solutionData.map((item) => (
               <SwiperSlide key={item.id}>
                  <div className="blog-slider__item d-flex flex-column flex-md-row gap-3">
                     {/* Question Card */}
                     <div className="q-card col-md-8 col-12 mb-lg-0 p-3 p-md-4">
                        <div className="row align-items-center h-100">
                           <div className="q-card__media col-md-6 col-12 mb-3 mb-md-0">
                              <img src={item.question.image} alt={item.question.alt} className="img-fluid" />
                           </div>
                           <div className="q-card__body col-md-6 col-12">
                              <span className="eyebrow mb-1 mb-md-3">question</span>
                              <h3 className="q-card__title mb-1 mb-md-3" dangerouslySetInnerHTML={{ __html: item.question.title }} />
                              <p className="q-card__desc" dangerouslySetInnerHTML={{ __html: item.question.description }} />
                           </div>
                        </div>
                     </div>
                     
                     {/* Solution Card */}
                     <div className="s-card col-md-4 col-12 p-3 p-md-4 d-flex flex-column justify-content-center">
                        <span className="s-card__eyebrow mb-1 mb-md-3">solution</span>
                        <div className="s-card__content d-flex flex-column justify-content-center align-items-center">
                           <h4 className="s-card__title mb-1 mb-md-3">{item.solution.title}</h4>
                           <div className="s-card__visual mb-1 mb-md-3" aria-hidden="true">
                              <RecycleIcon />
                           </div>
                           <div className="s-card__cta d-flex flex-column align-items-center">
                              <strong>{item.solution.effect}</strong>
                              <span className="s-card__desc">{item.solution.description}</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   )
}

export default SolutionSlider
