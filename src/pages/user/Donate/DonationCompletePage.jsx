// re-earth-frontend/src/pages/user/Donate/DonationCompletePage.jsx
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { fetchDonationThunk } from '../../../features/donationSlice'

export default function DonationCompletePage() {
   const { id } = useParams()
   const dispatch = useDispatch()
   const { created, loading, error } = useSelector((s) => s.donation)

   useEffect(() => {
      // 새로고침해도 데이터 보이도록 서버에서 다시 가져옴
      if (id) dispatch(fetchDonationThunk(id))
   }, [dispatch, id])

   if (loading) return <div className="container-sm py-5">불러오는 중…</div>
   if (error) return <div className="container-sm py-5 text-danger">에러: {error?.message || String(error)}</div>
   if (!created)
      return (
         <section id="main1" className="user-page bg-white container-sm">
           <div className="container p-3">
            <h3 className="mb-3">접수 내역을 찾을 수 없어요.</h3>
            <Link to="/donate" className="btn btn-dark">
               기부 신청으로 돌아가기
            </Link>
            </div>
            </section>
      )

   const d = created
   return (
      <section id="main1" className="user-page bg-white container-sm">
      <div className="container p-3">
         <h2 className="mb-3">기부 신청 완료</h2>
         <p className="text-muted">
            접수 번호 <strong>#{d.id}</strong>
         </p>

         <div className="card p-3 mb-3">
            <div>
               <strong>신청자:</strong> {d.donorName || '-'} {d.donorPhone && ` / ${d.donorPhone}`}
            </div>
            <div>
               <strong>주소:</strong> ({d.zipcode}) {d.address1} {d.address2 || ''}
            </div>
            <div>
               <strong>수거 예정일:</strong> {d.pickupDate || '-'}
            </div>
         </div>

         <div className="card p-3 mb-3">
            <strong className="mb-2">물품</strong>
            <ul className="mb-0">
               {(d.items || d.DonationItems || []).map((it, idx) => (
                  <li key={idx}>
                     {/* 백엔드 응답 형식(프론트용/시퀄라이즈 include) 모두 대응 */}
                     {it.category ? `[${it.category}] 상태:${it.condition} 수량:${it.quantity}` : `${it.itemName} x ${it.amount}`}
                     {it.note ? ` (${it.note})` : ''}
                  </li>
               ))}
            </ul>
         </div>

         <div className="d-flex gap-2">
            <Link to="/user/my" className="btn btn-outline-secondary">
               마이페이지
            </Link>
            <Link to="/donate/info" className="btn btn-dark">
               새 기부 신청
            </Link>
         </div>
      </div>
      </section>
   )
}
