// re-earth-frontend/src/components/mypage/InquiryContent.jsx
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TableContent from '../layout/TableContent'
import Alert from '../common/Alert'
import { fetchMyQnasThunk, fetchQnaDetailThunk } from '../../features/qnaSlice'

const PER_PAGE = 10

const statusToKo = (s) => {
   if (!s) return '-'
   const up = String(s).toUpperCase()
   if (up === 'OPEN') return '답변대기'
   if (up === 'ANSWERED') return '답변완료'
   if (up === 'CLOSED') return '종료'
   return up
}

export default function InquiryContent() {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { list = [], detail, loading, error } = useSelector((s) => s.qna || {})
   const [activeSubTab, setActiveSubTab] = useState('integrated')
   const [currentPage, setCurrentPage] = useState(1)
   const [alert, setAlert] = useState({ isOpen: false, message: '', variant: 'info', title: null })

   const showAlert = (message, variant = 'info', title = null) => {
      setAlert({ isOpen: true, message, variant, title })
   }

   const hideAlert = () => {
      setAlert({ isOpen: false, message: '', variant: 'info', title: null })
   }

   // 최초 로드 시 내 문의 목록 가져오기
   useEffect(() => {
      dispatch(fetchMyQnasThunk())
   }, [dispatch])

   // "새 문의작성" 탭 선택 시 바로 작성 페이지로 이동
   useEffect(() => {
      if (activeSubTab === 'new') {
         navigate('/inquiry/new')
      }
   }, [activeSubTab, navigate])

   // 탭별 필터링된 데이터
   const filtered = useMemo(() => {
      const byDateDesc = [...(list || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      switch (activeSubTab) {
         case 'pending':
            return byDateDesc.filter((q) => String(q.status).toUpperCase() === 'OPEN')
         case 'completed':
            return byDateDesc.filter((q) => ['ANSWERED', 'CLOSED'].includes(String(q.status).toUpperCase()))
         case 'integrated':
         default:
            return byDateDesc
      }
   }, [list, activeSubTab])

   // 페이지네이션
   const totalPages = Math.max(1, Math.ceil((filtered.length || 0) / PER_PAGE))
   const pageData = useMemo(() => {
      const start = (currentPage - 1) * PER_PAGE
      return filtered.slice(start, start + PER_PAGE)
   }, [filtered, currentPage])

   // TableContent에 맞는 데이터 형태로 매핑
   const columns = ['날짜', '제목', '상태']
   const data = pageData.map((q) => ({
      id: q.id,
      원본: q,
      날짜: q.createdAt ? new Date(q.createdAt).toISOString().slice(0, 10) : '-',
      제목: q.title || '(제목 없음)',
      상태: statusToKo(q.status),
   }))

   const subTabs = [
      { id: 'integrated', label: '통합문의' },
      { id: 'pending', label: '답변대기' },
      { id: 'completed', label: '답변완료' },
      { id: 'new', label: '새 문의작성' },
   ]

   // 상세 보기 클릭 시 서버에서 최신 상세 가져와서 모달 노출
   const [showModal, setShowModal] = useState(false)
   const [selectedId, setSelectedId] = useState(null)

   const handleDetailsClick = async (row) => {
      if (!row || !row.id) return
      setSelectedId(row.id)
      try {
         await dispatch(fetchQnaDetailThunk(row.id)).unwrap()
         setShowModal(true)
      } catch (e) {
         showAlert('문의 상세 조회에 실패했습니다.', 'error', '조회 실패')
      }
   }

   const closeModal = () => {
      setShowModal(false)
      setSelectedId(null)
   }

   const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) setCurrentPage(page)
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
         <TableContent
            title="1:1 문의"
            subTabs={subTabs}
            activeSubTab={activeSubTab}
            onSubTabChange={(tabId) => {
               setActiveSubTab(tabId)
               setCurrentPage(1)
            }}
            columns={columns}
            data={data}
            onDetailsClick={handleDetailsClick}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
         />

         {/* 상태 표시 */}
         {loading && <div className="mt-2">불러오는 중…</div>}
         {error && <div className="mt-2 text-danger">에러: {String(error?.message || error)}</div>}
         {!loading && !error && filtered.length === 0 && activeSubTab !== 'new' && <div className="mt-2">표시할 문의가 없습니다.</div>}

         {/* 간단 상세 모달 */}
         {showModal && detail && selectedId === detail?.id && (
            <div
               role="dialog"
               aria-modal="true"
               className="qna-modal-backdrop"
               onClick={closeModal}
               style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(0,0,0,0.4)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 1000,
               }}
            >
               <div
                  className="qna-modal"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                     width: 'min(720px, 92vw)',
                     maxHeight: '80vh',
                     overflowY: 'auto',
                     background: '#fff',
                     borderRadius: 12,
                     padding: 20,
                     boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  }}
               >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                     <h5 style={{ margin: 0 }}>{detail.title || '문의 상세'}</h5>
                     <button className="btn btn-sm btn-outline-secondary" onClick={closeModal}>
                        닫기
                     </button>
                  </div>

                  <div style={{ fontSize: 14, color: '#666', marginTop: 8 }}>
                     <span>작성일: {detail.createdAt ? new Date(detail.createdAt).toLocaleString() : '-'}</span>
                     <span style={{ marginLeft: 12 }}>상태: {statusToKo(detail.status)}</span>
                  </div>

                  <hr />

                  <div>
                     <div style={{ fontWeight: 600, marginBottom: 6 }}>문의 내용</div>
                     <div style={{ whiteSpace: 'pre-wrap' }}>{detail.question || '-'}</div>
                  </div>

                  {(() => {
                     // 1) 백엔드가 평탄화(answer)로 내려주는 경우 (하위호환)
                     if (detail.answer) {
                        return (
                           <>
                              <hr />
                              <div>
                                 <div style={{ fontWeight: 600, marginBottom: 6 }}>답변</div>
                                 <div style={{ whiteSpace: 'pre-wrap' }}>{detail.answer}</div>
                              </div>
                           </>
                        )
                     }

                     // 2) 표준: 댓글 배열 표시 (comments 또는 QnaComments)
                     const comments = detail.comments || detail.QnaComments || []
                     if (!Array.isArray(comments) || comments.length === 0) return null

                     return (
                        <>
                           <hr />
                           <div>
                              <div style={{ fontWeight: 600, marginBottom: 6 }}>답변</div>
                              <div style={{ display: 'grid', gap: 12 }}>
                                 {comments
                                    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                                    .map((c) => (
                                       <div
                                          key={c.id}
                                          style={{
                                             border: '1px solid #eee',
                                             borderRadius: 8,
                                             padding: 12,
                                             background: '#fafafa',
                                          }}
                                       >
                                          <div style={{ fontSize: 13, color: '#666', marginBottom: 6 }}>
                                             {c.Admin?.name || '관리자'} · {c.createdAt ? new Date(c.createdAt).toLocaleString() : ''}
                                          </div>
                                          <div style={{ whiteSpace: 'pre-wrap' }}>{c.body}</div>
                                       </div>
                                    ))}
                              </div>
                           </div>
                        </>
                     )
                  })()}
               </div>
            </div>
         )}
      </>
   )
}
