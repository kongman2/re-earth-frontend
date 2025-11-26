import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

import ArrowIcon from '../../../../components/common/ArrowIcon';

import 'swiper/css';
import 'swiper/css/navigation';

import '../mainpage.scss';

const NEWS = [
  { 
    title: '기후변화 대응을 위한 새로운 정책 발표', 
    desc: '정부가 2050년 탄소중립 목표 달성을 위한 새로운 정책을 발표했습니다. 재생에너지 확대와 친환경 기술 개발에 집중할 예정입니다.', 
    img: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=300&h=200&fit=crop&crop=center',
    date: '2024.01.15'
  },
  { 
    title: '친환경 에너지 전환 가속화', 
    desc: '전 세계적으로 친환경 에너지 전환이 가속화되고 있습니다. 태양광과 풍력 에너지 비중이 크게 증가했다고 발표되었습니다.', 
    img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=300&h=200&fit=crop&crop=center',
    date: '2024.01.12'
  },
  { 
    title: '플라스틱 사용량 감소 성과', 
    desc: '올해 플라스틱 사용량이 전년 대비 30% 감소했다는 조사 결과가 나왔습니다. 일회용품 사용 금지 정책의 효과가 나타나고 있습니다.', 
    img: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=300&h=200&fit=crop&crop=center',
    date: '2024.01.10'
  },
  { 
    title: '지속가능한 도시 개발 프로젝트', 
    desc: '스마트시티와 친환경 건축을 결합한 새로운 도시 개발 프로젝트가 시작되었습니다. 녹색 인프라 구축에 중점을 두고 있습니다.', 
    img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop&crop=center',
    date: '2024.01.08'
  },
  { 
    title: '해양 생태계 보호 캠페인', 
    desc: '전 세계 해양 생태계 보호를 위한 대규모 캠페인이 시작되었습니다. 플라스틱 오염 방지와 해양 보호구역 확대가 주요 목표입니다.', 
    img: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop&crop=center',
    date: '2024.01.05'
  },
];

export default function NewsSection() {
  const navigate = useNavigate();

  const handleArrowClick = () => {
    navigate('/readysoon');
  };

  return (
    <section id="news" className="main-news section">
      <div className="container">
        <div className="row">
          {/* 첫 번째 카드 - 제목, 설명, 화살표 */}
          <div className="col-md-3 mb-3 mb-md-0">
            <div className="h-100 d-flex flex-column justify-content-center">
              <h2 className="font-weight-bold mb-1 main--section__title main--section__title--news">
                NEWS
              </h2>
              <p className="text-muted mb-3">"지구를 위한 뉴스 큐레이션"</p>
              <div className="d-flex align-items-center">
                <a 
                  href="#" 
                  className="section-arrow"
                  onClick={(e) => {
                    e.preventDefault();
                    handleArrowClick();
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <ArrowIcon variant="section" size={32} />
                </a>
              </div>
            </div>
          </div>
          
          {/* Swiper 뉴스 카드 목록 */}
          <div className="col-md-9">
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={3}
              navigation={true}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
              className="news-swiper"
            >
              {NEWS.map((news, idx) => (
                <SwiperSlide key={idx}>
                  <div className="news--card">
                    <div className="news--card__img" style={{
                      height: '200px', 
                      background: `url(${news.img}) center/cover`
                    }} />
                    <div className="card-body p-4">
                      <h6 className="card-title font-weight-bold mb-2 text-ellipsis-1">{news.title}</h6>
                      <p className="card-text text-muted small mb-3 text-ellipsis-3">{news.desc}</p>
                      <small className="text-muted">{news.date}</small>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
