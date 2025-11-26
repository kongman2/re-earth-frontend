// re-earth-frontend/src/components/common/Modal.jsx
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import './Modal.scss'

/**
 * Modal 컴포넌트
 * @param {boolean} isOpen - 모달 열림 상태
 * @param {function} onClose - 모달 닫기 핸들러
 * @param {string|React.ReactNode} title - 모달 제목
 * @param {React.ReactNode} children - 모달 내용
 * @param {React.ReactNode} footer - 모달 푸터
 * @param {string} size - 모달 크기: 'sm' | 'md' | 'lg' | 'xl'
 * @param {boolean} showCloseButton - 닫기 버튼 표시 여부
 * @param {boolean} closeOnBackdrop - 배경 클릭 시 닫기 여부
 * @param {string} className - 추가 CSS 클래스
 * @param {string} bodyClassName - 바디 추가 CSS 클래스
 * @param {string} headerClassName - 헤더 추가 CSS 클래스
 * @param {string} footerClassName - 푸터 추가 CSS 클래스
 */
function Modal({
   isOpen,
   onClose,
   title,
   children,
   footer,
   size = 'md',
   showCloseButton = true,
   closeOnBackdrop = true,
   className = '',
   bodyClassName = '',
   headerClassName = '',
   footerClassName = '',
}) {
   // body 스크롤 잠금
   useEffect(() => {
      if (!isOpen) return
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
         document.body.style.overflow = prev
      }
   }, [isOpen])

   // ESC 키로 닫기
   useEffect(() => {
      if (!isOpen) return
      const handleEscape = (e) => {
         if (e.key === 'Escape' && onClose) {
            onClose()
         }
      }
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
   }, [isOpen, onClose])

   if (!isOpen) return null

   const modalRoot = typeof document !== 'undefined' ? document.body : null
   if (!modalRoot) return null

   const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget && closeOnBackdrop && onClose) {
         onClose()
      }
   }

   return createPortal(
      <div className="modal-overlay" onClick={handleBackdropClick} role="dialog" aria-modal="true">
         <div
            className={`modal-container p-3 modal--${size} ${className}`.trim()}
            onClick={(e) => e.stopPropagation()}
         >
            {(title || (onClose && showCloseButton)) && (
               <div className={`modal-header ${headerClassName}`.trim()}>
                  {title && <h3 className="modal-title">{title}</h3>}
                  {onClose && showCloseButton && (
                     <button
                        type="button"
                        className="modal-close"
                        onClick={onClose}
                        aria-label="닫기"
                     >
                        ×
                     </button>
                  )}
               </div>
            )}

            <div className={`modal-body ${bodyClassName}`.trim()}>{children}</div>

            {footer && <div className={`modal-footer ${footerClassName}`.trim()}>{footer}</div>}
         </div>
      </div>,
      modalRoot
   )
}

export default Modal

