import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Icon } from '@iconify/react'
import { fetchItemByIdThunk } from '../../features/itemSlice'
import Button from '../../components/common/Button'
import Card from '../../components/layout/Card'
import Badge from '../../components/common/Badge'
import Loading from '../../components/common/Loading'
import cupImage from '../../assets/images/친환경컵.png'
import towelImage from '../../assets/images/친환경수건.png'
import chargerImage from '../../assets/images/태양광충전기.png'
import lampImage from '../../assets/images/나무조명.png'
import './PointShopPage.scss'

export default function ProductDetailPage() {
   const { id } = useParams()
   const navigate = useNavigate()
   const dispatch = useDispatch()
   
   // Redux 상태
   const { item: product, loading, error } = useSelector((state) => state.items)
   
   const [userPoints, setUserPoints] = useState(150000) // 임시 사용자 포인트
   const quantity = 1 // 수량 고정

   // 기본 이미지 배열
   const DEFAULT_IMAGES = [cupImage, towelImage, chargerImage, lampImage]

   useEffect(() => {
      if (id) {
         dispatch(fetchItemByIdThunk(id))
      }
   }, [dispatch, id])

   const handlePurchase = () => {
      if (!product || (product.stockNumber !== undefined && product.stockNumber < 1)) {
         alert('재고가 부족합니다.')
         return
      }

      if (userPoints < product.price) {
         alert('포인트가 부족합니다.')
         return
      }

      // 실제로는 구매 API 호출 (pointOrderApi 등을 사용)
      if (window.confirm(`${product.itemNm} 1개를 ${product.price}P로 구매하시겠습니까?`)) {
         alert('구매가 완료되었습니다!')
         navigate('/pointshop')
      }
   }

   // 상품 이미지 가져오기 함수
   const getProductImage = () => {
      if (product?.ItemImages && product.ItemImages.length > 0) {
         const repImage = product.ItemImages.find(img => img.repImgYn === 'Y')
         return repImage ? repImage.imgUrl : product.ItemImages[0].imgUrl
      }
      // 기본 이미지 중 하나를 랜덤하게 선택
      return DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)]
   }

   if (loading) {
      return (
         <div className="user-page product-detail-page">
            <div className="container">
               <div className="text-center py-5">
                  <Loading variant="spinner" text="상품 정보를 불러오는 중..." />
               </div>
            </div>
         </div>
      )
   }

   if (error) {
      return (
         <div className="user-page product-detail-page">
            <div className="container">
               <div className="text-center py-5">
                  <Icon icon="mdi:alert-circle" width={64} height={64} className="product-detail-error-icon" />
                  <h5 className="mt-3 product-detail-error-title">오류가 발생했습니다</h5>
                  <p className="product-detail-error-text">{error}</p>
                  <div className="d-flex justify-content-center gap-3 mt-3">
                     <Button variant="main1" onClick={() => dispatch(fetchItemByIdThunk(id))}>
                        다시 시도
                     </Button>
                     <Button variant="default" onClick={() => navigate('/pointshop')}>
                        목록으로 돌아가기
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      )
   }

   if (!product) {
      return (
         <div className="user-page product-detail-page">
            <div className="container">
               <div className="text-center py-5">
                  <Icon icon="mdi:package-variant" width={64} height={64} className="product-detail-empty-icon" />
                  <h5 className="mt-3 product-detail-empty-title">상품을 찾을 수 없습니다.</h5>
                  <Button variant="main1" className="mt-3" onClick={() => navigate('/pointshop')}>
                     목록으로 돌아가기
                  </Button>
               </div>
            </div>
         </div>
      )
   }

   return (
      <div className="user-page product-detail-page">
         <div className="container">
            {/* 뒤로가기 버튼 */}
            <div className="mb-4">
               <Button 
                  variant="default" 
                  className="product-detail-back-btn p-0" 
                  onClick={() => navigate('/pointshop')}
               >
                  <Icon icon="mdi:arrow-left" width={20} height={20} />
                  목록으로 돌아가기
               </Button>
            </div>

            <Card variant="elevated" className="product-detail">
               <div className="row">
                  {/* 상품 이미지 */}
                  <div className="col-md-6">
                     <div className="product-image-section">
                        <img
                           src={getProductImage()}
                           alt={product.itemNm}
                           className="product-main-image"
                           onError={(e) => {
                              e.target.src = cupImage
                           }}
                        />
                     </div>
                  </div>

                  {/* 상품 정보 */}
                  <div className="col-md-6">
                     <div className="product-info-section">
                        <h1 className="product-title">{product.itemNm}</h1>

                        {product.itemSellStatus === 'SELL' && (
                           <div className="mb-3">
                              <Badge variant="success" className="product-status-badge">
                                 <Icon icon="mdi:check-circle" width={16} height={16} />
                                 판매중
                              </Badge>
                           </div>
                        )}

                        <p className="product-description">{product.itemDetail}</p>

                        <div className="product-price">Price: {product.price.toLocaleString()} points</div>

                        <div className="mb-3">
                           <span className="product-info-text">
                              재고: {product.stockNumber !== undefined ? `${product.stockNumber}개` : '재고 정보 없음'}
                           </span>
                        </div>

                        <div className="mb-3">
                           <span className="product-info-text">내 포인트: {userPoints.toLocaleString()}P</span>
                        </div>

                        {/* 가격 정보 */}
                        <div className="total-price mb-4">
                           <h5 className="product-total-price">결제 금액: {product.price.toLocaleString()}P</h5>
                        </div>

                        {/* 구매 버튼 */}
                        <div className="product-actions">
                           <Button 
                              variant="point" 
                              fullWidth
                              onClick={handlePurchase} 
                              disabled={
                                 (product.stockNumber !== undefined && product.stockNumber < 1) || 
                                 userPoints < product.price
                              }
                              className="product-purchase-btn"
                           >
                              <Icon icon="mdi:cart" width={20} height={20} />
                              구매하기
                           </Button>
                           <Button 
                              variant="default" 
                              fullWidth
                              onClick={() => navigate('/pointshop')}
                              className="product-back-btn"
                           >
                              목록으로
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
            </Card>

            {/* 추천 상품 */}
            <div className="recommended-products">
               <h4 className="recommended-products-title">추천 상품</h4>
               <div className="row g-3">
                  {DEFAULT_IMAGES.map((img, idx) => (
                     <div className="col-md-3 col-sm-6" key={idx}>
                        <Card variant="elevated" className="h-100 product-recommend-card">
                           <img src={img} alt={`추천상품${idx + 1}`} className="img-fluid rounded w-100 mb-2" />
                           <h6 className="product-recommend-title">
                              추천 상품 {idx + 1}
                           </h6>
                           <span className="product-recommend-point">point: {(idx + 1) * 100}p</span>
                        </Card>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}
