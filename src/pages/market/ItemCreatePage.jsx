import React, { useState } from 'react'
import ItemCreateForm from '../../components/shop/ItemCreateForm'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createItemThunk, fetchItemsThunk } from '../../features/itemSlice'
import Card from '../../components/layout/Card'
import Alert from '../../components/common/Alert'

function ItemCreatePage() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [alert, setAlert] = useState({ isOpen: false, message: '', variant: 'info', title: null })

   const showAlert = (message, variant = 'info', title = null) => {
      setAlert({ isOpen: true, message, variant, title })
   }

   const hideAlert = () => {
      setAlert({ isOpen: false, message: '', variant: 'info', title: null })
   }

   const onCreateSubmit = (itemData) => {
      dispatch(createItemThunk(itemData))
         .unwrap()
         .then((createdItem) => {
            console.log('상품 등록 성공:', createdItem)
            showAlert('상품이 성공적으로 등록되었습니다!', 'success', '등록 완료')
            
            // 등록 후 상품 목록 새로고침
            dispatch(fetchItemsThunk())
            
            // 포인트샵 페이지로 이동 (등록된 상품 확인용)
            setTimeout(() => {
               navigate('/pointshop')
            }, 1500)
         })
         .catch((error) => {
            console.error('상품 등록 에러:', error)
            showAlert('상품 등록에 실패했습니다: ' + error, 'error', '등록 실패')
         })
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
         <div className="user-page bg-white">
            <div className="container">
            <div className="row justify-content-center">
               <div className="col-md-10 col-lg-8">
                  <Card variant="elevated" className="item-create-card">
                     <div className="item-create-header">
                        <h1 className="item-create-title">
                           <iconify-icon icon="mdi:package-plus" width="24" height="24"></iconify-icon>
                           상품 등록
                        </h1>
                     </div>
                     <div className="item-create-body">
                        <ItemCreateForm onCreateSubmit={onCreateSubmit} />
                     </div>
                  </Card>
               </div>
            </div>
         </div>
      </div>
      </>
   )
}

export default ItemCreatePage


