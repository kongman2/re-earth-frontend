// re-earth-frontend/src/components/common/GuideCard.jsx
import React from 'react';
import './GuideCard.scss';

/**
 * GuideCard 컴포넌트
 * 인증하기, 기부하기 페이지의 가이드 카드
 * 
 * @param {string} variant - 카드 타입: 'image' | 'text' | 'default'
 * @param {string} className - 추가 CSS 클래스
 * @param {React.ReactNode} children - 카드 내용
 * @param {string} quote - 인용구 (text variant일 때)
 * @param {string|React.ReactNode} body - 본문 텍스트 (text variant일 때)
 * @param {React.ReactNode} cta - CTA 버튼 영역 (text variant일 때)
 * @param {string} quoteColor - 인용구 border 색상 (기본: $color-main)
 */
export default function GuideCard({
  variant = 'default',
  className = '',
  children,
  quote,
  body,
  cta,
  quoteColor,
  ...props
}) {
  const cardClasses = [
    'guide-card',
    variant !== 'default' && `guide-card--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Image variant: 이미지만 표시
  if (variant === 'image') {
    return (
      <div className={cardClasses} {...props}>
        {children}
      </div>
    );
  }

  // Text variant: 인용구, 본문, CTA 포함
  if (variant === 'text') {
    const quoteStyle = quoteColor ? { borderLeftColor: quoteColor } : {};

    return (
      <div className={cardClasses} {...props}>
        {quote && (
          <h5 className="guide-quote" style={quoteStyle}>
            {quote}
          </h5>
        )}
        {body && (
          <p className="guide-body">
            {body}
          </p>
        )}
        {children}
        {cta && (
          <div className="cta">
            {cta}
          </div>
        )}
      </div>
    );
  }

  // Default variant: 자유로운 내용
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
}

