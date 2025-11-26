// re-earth-frontend/src/components/common/Alert.jsx
import { useState, useEffect } from 'react'
import Modal from './Modal'
import './Alert.scss'

/**
 * Alert 컴포넌트
 * @param {string} variant - 알림 스타일: 'success' | 'error' | 'warning' | 'info'
 * @param {string} title - 알림 제목
 * @param {React.ReactNode} children - 알림 내용
 * @param {boolean} dismissible - 닫기 버튼 표시 여부
 * @param {function} onClose - 닫기 핸들러
 * @param {number} autoClose - 자동 닫기 시간 (ms, 0이면 자동 닫기 안함)
 * @param {boolean} isModal - 모달로 표시할지 여부
 * @param {string} size - 모달 크기 (isModal이 true일 때): 'sm' | 'md' | 'lg' | 'xl'
 * @param {string} className - 추가 CSS 클래스
 */
function Alert({
   variant = 'info',
   title,
   children,
   dismissible = false,
   onClose,
   autoClose = 0,
   isModal = false,
   size = 'sm',
   className = '',
   ...props
}) {
   const [isVisible, setIsVisible] = useState(true)

   useEffect(() => {
      if (autoClose > 0 && isVisible) {
         const timer = setTimeout(() => {
            setIsVisible(false)
            onClose?.()
         }, autoClose)
         return () => clearTimeout(timer)
      }
   }, [autoClose, isVisible, onClose])

   const handleClose = () => {
      setIsVisible(false)
      onClose?.()
   }

   if (!isVisible) return null

   const alertClasses = [
      'alert',
      `alert--${variant}`,
      dismissible && 'alert--dismissible',
      className,
   ]
      .filter(Boolean)
      .join(' ')

   const alertContent = (
      <div className={alertClasses} role="alert" {...props}>
         <div className="alert-content">
            {title && <h4 className="alert-title">{title}</h4>}
            <div className="alert-message">{children}</div>
         </div>
         {dismissible && onClose && (
            <button
               type="button"
               className="alert-close"
               onClick={handleClose}
               aria-label="닫기"
            >
               ×
            </button>
         )}
      </div>
   )

   // 모달 모드
   if (isModal) {
      return (
         <Modal
            isOpen={isVisible}
            onClose={handleClose}
            size={size}
            showCloseButton={dismissible}
            closeOnBackdrop={true}
            bodyClassName="alert-modal-body"
         >
            <div className={alertClasses.replace('alert ', '')} role="alert">
               <div className="alert-content">
                  {title && <h4 className="alert-title">{title}</h4>}
                  <div className="alert-message">{children}</div>
               </div>
            </div>
         </Modal>
      )
   }

   // 일반 모드
   return alertContent
}

export default Alert

