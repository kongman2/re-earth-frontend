// re-earth-frontend/src/components/finding/FindingFormLayout.jsx
import React from 'react';
import './styles/FindingForm.scss';

/**
 * FindingForm 공통 레이아웃 컴포넌트
 * 
 * @param {string} title - 폼 제목
 * @param {ReactNode} children - 폼 내용
 * @param {ReactNode} actions - 액션 버튼 영역
 * @param {string} variant - 스타일 variant ('default' | 'compact')
 * @param {string} className - 추가 클래스명
 */
export default function FindingFormLayout({
  title,
  children,
  actions,
  variant = 'default',
  className = '',
}) {
  const layoutClassName = `finding-form finding-form--${variant} ${className}`.trim();

  return (
    <div className={layoutClassName}>
      {/* Header */}
      {title && (
        <div className="finding-form__header">
          <h2>{title}</h2>
        </div>
      )}

      {/* Content */}
      <div className="finding-form__content">
        {children}
      </div>

      {/* Actions */}
      {actions && (
        <div className="finding-form__actions">
          {actions}
        </div>
      )}
    </div>
  );
}

