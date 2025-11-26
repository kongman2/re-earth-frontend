// re-earth-frontend/src/components/common/Badge.jsx
import './Badge.scss'

/**
 * Badge 컴포넌트
 * @param {string} variant - 배지 스타일: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
 * @param {string} size - 배지 크기: 'sm' | 'md' | 'lg'
 * @param {string} className - 추가 CSS 클래스
 * @param {React.ReactNode} children - 배지 내용
 */
function Badge({
   variant = 'default',
   size = 'md',
   className = '',
   children,
   ...props
}) {
   const badgeClasses = [
      'badge',
      `badge--${variant}`,
      size !== 'md' && `badge--${size}`,
      className,
   ]
      .filter(Boolean)
      .join(' ')

   return (
      <span className={badgeClasses} {...props}>
         {children}
      </span>
   )
}

export default Badge

