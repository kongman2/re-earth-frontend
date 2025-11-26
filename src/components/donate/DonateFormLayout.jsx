// re-earth-frontend/src/components/donate/DonateFormLayout.jsx
import React from 'react';
import './styles/DonateForm.scss';

/**
 * DonateForm 공통 레이아웃 컴포넌트
 * 
 * @param {number} currentStep - 현재 단계 (1-5)
 * @param {number} totalSteps - 전체 단계 수 (기본: 5)
 * @param {string} title - 폼 제목
 * @param {ReactNode} children - 폼 내용
 * @param {ReactNode} actions - 액션 버튼 영역
 * @param {string} variant - 스타일 variant ('default' | 'compact')
 * @param {string} className - 추가 클래스명
 */
export default function DonateFormLayout({
  currentStep,
  totalSteps = 5,
  title,
  children,
  actions,
  variant = 'default',
  className = '',
}) {
  const layoutClassName = `donate-form donate-form--${variant} ${className}`.trim();

  return (
    <div className={layoutClassName}>
      {/* Step Indicator */}
      {currentStep && (
        <div className="donate-form__step-indicator">
          Step {currentStep} / {totalSteps}
        </div>
      )}

      {/* Header */}
      {title && (
        <div className="donate-form__header">
          <h3>{title}</h3>
        </div>
      )}

      {/* Content */}
      <div className="donate-form__content">
        {children}
      </div>

      {/* Actions */}
      {actions && (
        <div className="donate-form__actions">
          {actions}
        </div>
      )}
    </div>
  );
}

