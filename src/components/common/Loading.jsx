// re-earth-frontend/src/components/common/Loading.jsx
import './Loading.scss'

/**
 * Loading 컴포넌트
 * @param {string} size - 로딩 크기: 'sm' | 'md' | 'lg'
 * @param {string} variant - 로딩 스타일: 'spinner' | 'dots' | 'pulse'
 * @param {string} className - 추가 CSS 클래스
 * @param {string} text - 로딩 텍스트
 */
function Loading({
   size = 'md',
   variant = 'spinner',
   className = '',
   text,
   ...props
}) {
   const loadingClasses = [
      'loading',
      `loading--${variant}`,
      size !== 'md' && `loading--${size}`,
      className,
   ]
      .filter(Boolean)
      .join(' ')

   return (
      <div className={loadingClasses} {...props}>
         {variant === 'spinner' && (
            <div className="loading-spinner">
               <div className="spinner"></div>
            </div>
         )}
         {variant === 'dots' && (
            <div className="loading-dots">
               <span></span>
               <span></span>
               <span></span>
            </div>
         )}
         {variant === 'pulse' && (
            <div className="loading-pulse">
               <div></div>
               <div></div>
               <div></div>
            </div>
         )}
         {text && <p className="loading-text">{text}</p>}
      </div>
   )
}

export default Loading

