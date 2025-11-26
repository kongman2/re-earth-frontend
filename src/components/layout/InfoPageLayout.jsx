// re-earth-frontend/src/components/layout/InfoPageLayout.jsx
import React, { useRef } from 'react';
import GuideCard from './GuideCard';
import './InfoPageLayout.scss';

/**
 * InfoPageLayout 컴포넌트
 * 인증하기, 기부하기 페이지의 공통 레이아웃
 * 
 * @param {string} heroTitle - Hero 섹션 제목
 * @param {string} heroSub - Hero 섹션 부제목
 * @param {string} heroTags - Hero 섹션 태그들
 * @param {string} guideTitle - Guide 섹션 제목
 * @param {string|React.ReactNode} guideSub - Guide 섹션 부제목
 * @param {React.ReactNode} guideImage - Guide 섹션 이미지
 * @param {string} guideQuote - Guide 섹션 인용구
 * @param {string} guideBody - Guide 섹션 본문
 * @param {React.ReactNode} guideCta - Guide 섹션 CTA 버튼
 * @param {string} guideQuoteColor - Guide 인용구 border 색상
 * @param {React.ReactNode} children - 추가 섹션 (예: 재활용 수거함 찾기)
 */
export default function InfoPageLayout({
  heroTitle,
  heroSub,
  heroTags,
  guideTitle,
  guideSub,
  guideImage,
  guideQuote,
  guideBody,
  guideCta,
  guideQuoteColor,
  children,
}) {
  const guideRef = useRef(null);

  const scrollToGuide = () => {
    guideRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* ─────────── Hero (섹션 1) ─────────── */}
      <div className="info-hero">
        <div className="overlay" />
        <div className="hero-inner container">
          <div className="hero-block">
            <h2 className="hero-title">{heroTitle}</h2>
            {heroSub && <p className="hero-sub mt-40">{heroSub}</p>}
            {heroTags && <p className="hero-tags mt-80">{heroTags}</p>}
          </div>
        </div>

        <div className="hero-arrow">
          <button
            type="button"
            className="arrow-btn"
            aria-label="다음 섹션으로 이동"
            onClick={scrollToGuide}
          >
            ↓
          </button>
        </div>
      </div>

      {/* ─────────── Guide (섹션 2) ─────────── */}
      <section className="info-guide-wrapper" ref={guideRef}>
        <div>
          {/* 위쪽: 제목/설명 */}
          <div className="container guide-head">
            <h3 className="guide-title">{guideTitle}</h3>
            {guideSub && <p className="guide-sub">{guideSub}</p>}
          </div>

          {/* 아래쪽: 좌=이미지(4) / 우=텍스트(8) — 데스크탑에서 한 줄 */}
          <div className="container">
            <div className="row align-items-stretch guide-row">
              {/* 좌측: 이미지 */}
              {guideImage && (
                <div className="col-12 col-md-5 mb-4 mb-md-0 d-flex">{guideImage}</div>
              )}

              {/* 우측: 텍스트 + 버튼 */}
              <div className={guideImage ? 'col-12 col-md-7 d-flex' : 'col-12'}>
                <GuideCard
                  variant="text"
                  quote={guideQuote}
                  body={guideBody}
                  cta={guideCta}
                  quoteColor={guideQuoteColor}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 추가 섹션 */}
      {children}
    </>
  );
}

