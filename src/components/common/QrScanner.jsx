import { useRef, useState } from 'react'
import Alert from './Alert'

function QrScanner({ label }) {
   const videoRef = useRef(null)
   const [isActive, setIsActive] = useState(false)
   const [alert, setAlert] = useState({ isOpen: false, message: '', variant: 'info', title: null })

   const showAlert = (message, variant = 'info', title = null) => {
      setAlert({ isOpen: true, message, variant, title })
   }

   const hideAlert = () => {
      setAlert({ isOpen: false, message: '', variant: 'info', title: null })
   }

   const handleStartCamera = async () => {
      try {
         const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }, // 후면 카메라 우선 (모바일용)
         })
         if (videoRef.current) {
            videoRef.current.srcObject = stream
            setIsActive(true)
         }
      } catch (err) {
         console.error('카메라 접근 실패:', err)
         showAlert('카메라 권한을 허용해 주세요!', 'error', '권한 오류')
      }
   }

   return (
      <>
         {alert.isOpen && (
            <Alert
               variant={alert.variant}
               title={alert.title}
               isModal={true}
               dismissible={true}
               onClose={hideAlert}
               size="sm"
            >
               {alert.message}
            </Alert>
         )}
         <div>
            <button className="btn main1 default" onClick={handleStartCamera}>
               {label}
            </button>

            {isActive && <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '400px' }} />}
         </div>
      </>
   )
}

export default QrScanner
