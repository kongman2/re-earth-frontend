// re-earth-frontend/src/pages/user/Donate/DonationPage.jsx
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setField, addItem, updateItem, removeItem, submitDonationThunk } from '../../../features/donationSlice'
import Alert from '../../../components/common/Alert'

// 컴포넌트로 이동된 Form들
import DonateFormStep1 from '../../../components/donate/DonateFormStep1'
import DonateFormStep2 from '../../../components/donate/DonateFormStep2'
import DonateFormStep3 from '../../../components/donate/DonateFormStep3'
import DonateFormStep4 from '../../../components/donate/DonateFormStep4'
import DonateFormStep5 from '../../../components/donate/DonateFormStep5'

export default function DonationPage() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { donorName, donorPhone, donorEmail, zipcode, address1, address2, pickupDate, memo, agreePolicy, items, loading, error, createdId, otp } = useSelector((s) => s.donation)

   const [step, setStep] = React.useState(1)
   const [alert, setAlert] = useState({ isOpen: false, message: '', variant: 'info', title: null })
   const next = () => setStep((s) => Math.min(5, s + 1))
   const prev = () => setStep((s) => Math.max(1, s - 1))

   const showAlert = (message, variant = 'info', title = null) => {
      setAlert({ isOpen: true, message, variant, title })
   }

   const hideAlert = () => {
      setAlert({ isOpen: false, message: '', variant: 'info', title: null })
   }

   useEffect(() => {
      if (createdId) navigate(`/donate/complete/${createdId}`, { replace: true })
   }, [createdId, navigate])

   const handleSubmit = () => {
      // 최소 서버전 검증
      if (!agreePolicy) {
         showAlert('정책 동의가 필요합니다.', 'warning', '입력 오류')
         return
      }
      if (!donorName) {
         showAlert('이름을 입력하세요.', 'warning', '입력 오류')
         return
      }
      if (!donorPhone) {
         showAlert('휴대폰 인증을 완료하세요.', 'warning', '입력 오류')
         return
      }
      if (!zipcode || !address1) {
         showAlert('주소를 입력하세요.', 'warning', '입력 오류')
         return
      }
      if (!pickupDate) {
         showAlert('수거일을 선택하세요.', 'warning', '입력 오류')
         return
      }
      if (!items?.length || items.some((it) => !it.quantity || it.quantity <= 0)) {
         showAlert('물품을 1개 이상 등록하고 수량을 확인하세요.', 'warning', '입력 오류')
         return
      }

      dispatch(
         submitDonationThunk({
            donorName,
            donorPhone,
            donorEmail,
            zipcode,
            address1,
            address2,
            pickupDate,
            memo,
            agreePolicy,
            items,
         })
      )
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
         <section id="main1" className="user-page bg-white container-sm">
         <div className="container p-3">
         <h2 className="mb-2">헌옷 기부 신청</h2>
         {error && <div className="alert alert-danger">에러: {error?.message || String(error)}</div>}

         {step === 1 && <DonateFormStep1 onNext={next} />}

         {step === 2 && (
            <DonateFormStep2
               onNext={() => {
                  if (!otp?.verified) {
                     showAlert('휴대폰 인증을 먼저 완료해 주세요.', 'warning', '인증 필요')
                     return
                  }
                  if (!donorPhone) {
                     showAlert('휴대폰 번호가 비어있습니다.', 'warning', '입력 오류')
                     return
                  }
                  next()
               }}
               onVerified={(phone) => dispatch(setField({ key: 'donorPhone', value: phone }))}
            />
         )}

         {step === 3 && (
            <DonateFormStep3
               items={items}
               onAdd={() => dispatch(addItem())}
               onRemove={(idx) => dispatch(removeItem({ index: idx }))}
               onPatch={(idx, field, value) => dispatch(updateItem({ index: idx, patch: { [field]: value } }))}
               onPrev={prev}
               onNext={next}
            />
         )}

         {step === 4 && (
            <DonateFormStep4
               value={{ zipcode, address1, address2, pickupDate, memo }}
               onChange={(patch) => Object.entries(patch).forEach(([k, v]) => dispatch(setField({ key: k, value: v })))}
               onPrev={prev}
               onNext={next}
            />
         )}

         {step === 5 && (
            <DonateFormStep5
               value={{ donorName, donorPhone, donorEmail, zipcode, address1, address2, pickupDate, memo, agreePolicy, items }}
               onAgree={(checked) => dispatch(setField({ key: 'agreePolicy', value: !!checked }))}
               onPrev={prev}
               loading={loading}
               onSubmit={handleSubmit}
            />
         )}
      </div>
      </section>
      </>
   )
}
