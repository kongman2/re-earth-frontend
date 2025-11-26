// re-earth-frontend/src/components/common/Button.jsx
import './Button.scss'

/**
 * Button 컴포넌트
 * @param {string} variant - 버튼 스타일: 'main1' | 'main2' | 'main3' | 'google' | 'kakao' | 'find' | 'point' | 'default'
 * @param {string} size - 버튼 크기: 'sm' | 'md' | 'lg'
 * @param {string} type - 버튼 타입: 'button' | 'submit' | 'reset'
 * @param {boolean} disabled - 비활성화 상태
 * @param {string} className - 추가 CSS 클래스
 * @param {function} onClick - 클릭 핸들러
 * @param {boolean} fullWidth - 전체 너비
 * @param {React.ReactNode} icon - 아이콘 (이미지 등)
 * @param {React.ReactNode} children - 버튼 내용
 * @param {React.ElementType} as - 렌더링할 요소 타입 (예: 'a', Link 등)
 * @param {string} to - Link 컴포넌트 사용 시 경로
 */
function Button({
   variant = 'default',
   size = 'md',
   type = 'button',
   disabled = false,
   className = '',
   onClick,
   fullWidth = false,
   icon,
   children,
   as,
   to,
   ...props
}) {
   const buttonClasses = [
      'btn',
      variant !== 'default' && `btn--${variant}`,
      size !== 'md' && `btn--${size}`,
      fullWidth && 'btn--full-width',
      className,
   ]
      .filter(Boolean)
      .join(' ')

   const buttonProps = {
      className: buttonClasses,
      onClick,
      disabled: disabled && !as, // Link나 다른 요소일 때는 disabled 속성 제거
      ...(as === 'a' || as ? {} : { type }), // button일 때만 type 속성 추가
      ...props,
   }

   // icon이 있을 때는 btn--inside 안에 icon과 children을 함께 넣기
   const buttonContent = icon ? (
      <div className="btn--inside">
         {icon}
         {children}
      </div>
   ) : (
      children
   )

   // Link나 다른 컴포넌트로 렌더링
   if (as) {
      const Component = as
      return (
         <Component {...buttonProps} to={to}>
            {buttonContent}
         </Component>
      )
   }

   return (
      <button {...buttonProps}>
         {buttonContent}
      </button>
   )
}

export default Button

