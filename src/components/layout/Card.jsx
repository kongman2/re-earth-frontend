// re-earth-frontend/src/components/common/Card.jsx
import './Card.scss'

/**
 * Card 컴포넌트
 * @param {string} variant - 카드 스타일: 'default' | 'outline' | 'elevated'
 * @param {string} className - 추가 CSS 클래스
 * @param {React.ReactNode} children - 카드 내용
 * @param {React.ReactNode} header - 카드 헤더
 * @param {React.ReactNode} footer - 카드 푸터
 * @param {function} onClick - 클릭 핸들러
 */
function Card({
   variant = 'default',
   className = '',
   children,
   header,
   footer,
   onClick,
   ...props
}) {
   const cardClasses = [
      'card',
      variant !== 'default' && `card--${variant}`,
      onClick && 'card--clickable',
      className,
   ]
      .filter(Boolean)
      .join(' ')

   return (
      <div className={cardClasses} onClick={onClick} {...props}>
         {header && <div className="card__header">{header}</div>}
         <div className="card__body">{children}</div>
         {footer && <div className="card__footer">{footer}</div>}
      </div>
   )
}

export default Card

