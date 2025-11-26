// re-earth-frontend/src/components/main/HeroBanner.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import ArrowIcon from '../common/ArrowIcon';
import './HeroBanner.scss';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';

export default function HeroBanner() {
  const slides = [
    {
      id: 1,
      title: '앱 설치 소개',
      image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&h=600&fit=crop' // ESG/지속가능성
    },
    {
      id: 2,
      title: '슈퍼빈 파트너쉽 소개',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=600&fit=crop' // 재활용/순환경제
    },
    {
      id: 3,
      title: '카본프리 프로젝트 소개',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=600&fit=crop' // 자연/환경보호
    },
    {
      id: 4,
      title: '오늘의 미션 소개',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&h=600&fit=crop' // 친환경/탄소중립
    },
    {
      id: 5,
      title: '아나바다장터 소개',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop' // 지속가능한 소비
    }
  ];

  return (
    <div className="col-md-6 mb-3">
      <div className="hero-banner-swiper">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={800}
          slidesPerView={1}
          spaceBetween={0}
          watchSlidesProgress={true}
          className="hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="hero-slide">
              <div className="hero-card">
                <div className="hero-image">
                  <img src={slide.image} alt={slide.title} />
                </div>
                <div className="hero-overlay">
                      <h1 className="hero-title">{slide.title}</h1>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 커스텀 네비게이션 버튼 */}
        <div className="swiper-button-prev-custom">
          <ArrowIcon 
            direction="left" 
            size={32} 
            variant="stroke"
            color="var(--maintext)"
          />
        </div>
        <div className="swiper-button-next-custom">
          <ArrowIcon 
            direction="right" 
            size={32} 
            variant="stroke"
            color="var(--maintext)"
          />
        </div>
      </div>
    </div>
  );
}
