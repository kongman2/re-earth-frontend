// re-earth-frontend/src/components/shop/PointShop.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import cupImage from '../../assets/images/친환경컵.png'
import towelImage from '../../assets/images/친환경수건.png'
import chargerImage from '../../assets/images/태양광충전기.png'
import lampImage from '../../assets/images/나무조명.png'
import './PointShop.scss'

// 기본 이미지 맵핑 (실제 이미지가 없을 때 사용)
const DEFAULT_IMAGES = [cupImage, towelImage, chargerImage, lampImage]

export default function PointShop({ items = [], loading = false, error = null }) {
   const navigate = useNavigate()

   const handleProductClick = (itemId) => {
      navigate(`/pointshop/detail/${itemId}`)
   }

   const getImageSrc = (item, index) => {
      // 백엔드 데이터 구조에 맞게 수정: ItemImages 배열에서 대표 이미지 찾기
      if (item.ItemImages && item.ItemImages.length > 0) {
         const repImage = item.ItemImages.find(img => img.repImgYn === 'Y')
         return repImage ? repImage.imgUrl : item.ItemImages[0].imgUrl
      }
      return DEFAULT_IMAGES[index % DEFAULT_IMAGES.length]
   }

   if (loading) {
      return (
         <div className="text-center py-3">
            <div className="spinner-border text-primary" role="status">
               <span className="sr-only">Loading...</span>
            </div>
         </div>
      )
   }

   if (error) {
      return (
         <div className="text-center py-3">
            <p className="text-danger">상품을 불러오는 중 오류가 발생했습니다: {error}</p>
         </div>
      )
   }

   if (!items || items.length === 0) {
      return (
         <div className="text-center py-3">
            <p className="text-muted">상품이 없습니다.</p>
         </div>
      )
   }

   return (
      <div className="row g-3">
         {items.map((item, idx) => (
            <div className="col-md-3 col-sm-6 col-6 mb-4" key={item.id || idx}>
               <div className="product__card" onClick={() => handleProductClick(item.id)} style={{ cursor: 'pointer' }}>
                  <div className="product__card__body d-flex flex-column">
                     <div>
                        <img 
                           src={getImageSrc(item, idx)} 
                           alt={item.itemNm} 
                           className="img-fluid rounded"
                           onError={(e) => {
                              e.target.src = DEFAULT_IMAGES[idx % DEFAULT_IMAGES.length]
                           }}
                        />
                     </div>
                     <div className="d-flex flex-column">
                        <h6 className="product__card__title font-weight-bold text-ellipsis-1 mb-0">
                           {item.itemNm}
                        </h6>
                        <div className="mt-auto">
                           <span className="product__card__point">
                              point: {item.price?.toLocaleString() || 0}p
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         ))}
      </div>
   )
}
