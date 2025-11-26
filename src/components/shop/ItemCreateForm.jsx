import React, { useState } from 'react'
import InputField from '../common/InputField'
import FormSelect from '../common/FormSelect'
import Alert from '../common/Alert'
import { formatWithComma, stripComma } from '../../utils/priceSet'

function ItemCreateForm({ onCreateSubmit }) {
   const [imgUrls, setImgUrls] = useState([]) // 이미지 경로(여러개 저장)
   const [imgFiles, setImgFiles] = useState([]) // 이미지 파일 객체(여러개 저장)
   const [itemNm, setItemNm] = useState('') // 상품명
   const [price, setPrice] = useState('') // 가격
   const [stockNumber, setStockNumber] = useState('') // 재고
   const [itemSellStatus, setItemSellStatus] = useState('SELL') // 판매상태
   const [itemDetail, setItemDetail] = useState('') // 상품설명
   const [itemSummary, setItemSummary] = useState('') // 상품요약
   const [brandName, setBrandName] = useState('') //브랜드명
   const [vendorName, setVendorName] = useState('') //업체명
   const [alert, setAlert] = useState({ isOpen: false, message: '', variant: 'info', title: null })

   const showAlert = (message, variant = 'info', title = null) => {
      setAlert({ isOpen: true, message, variant, title })
   }

   const hideAlert = () => {
      setAlert({ isOpen: false, message: '', variant: 'info', title: null })
   }

   // 이미지 미리보기
   const handleImageChange = (e) => {
      const files = e.target.files
      if (!files || files.length === 0) return

      const newFiles = Array.from(files).slice(0, 5)
      console.log(newFiles)

      setImgFiles(newFiles)

      const newImgUrls = newFiles.map((file) => {
         const reader = new FileReader()
         reader.readAsDataURL(file) // 파일 데이터 읽기

         return new Promise((resolve) => {
            reader.onload = (event) => {
               resolve(event.target.result)
            }
         })
      })

      Promise.all(newImgUrls).then((urls) => {
         setImgUrls(urls)
      })
   }

   // 상품 등록
   const handleSubmit = (e) => {
      e.preventDefault()

      if (!itemNm.trim()) {
         showAlert('상품명을 입력하세요!', 'warning', '입력 오류')
         return
      }

      if (!String(price).trim()) {
         showAlert('가격을 입력하세요!', 'warning', '입력 오류')
         return
      }

      if (!String(stockNumber).trim()) {
         showAlert('재고를 입력하세요.', 'warning', '입력 오류')
         return
      }
      if (!String(brandName).trim()) {
         showAlert('브랜드명을 입력하세요.', 'warning', '입력 오류')
         return
      }
      if (!String(vendorName).trim()) {
         showAlert('업체명을 입력하세요.', 'warning', '입력 오류')
         return
      }

      if (imgFiles.length === 0) {
         showAlert('이미지 최소 1개 이상 업로드 하세요.', 'warning', '입력 오류')
         return
      }

      const formData = new FormData()
      formData.append('itemNm', itemNm)
      formData.append('price', price)
      formData.append('stockNumber', stockNumber)
      formData.append('itemSellStatus', itemSellStatus)
      formData.append('itemDetail', itemDetail)
      formData.append('itemSummary', itemSummary)
      formData.append('brandName', brandName)
      formData.append('vendorName', vendorName)

      imgFiles.forEach((file) => {
         const encodedFile = new File([file], encodeURIComponent(file.name), { type: file.type })
         formData.append('img', encodedFile)
      })

      onCreateSubmit(formData)
   }

   const handlePriceChange = (e) => {
      const rawValue = e.target.value
      const numericValue = stripComma(rawValue)

      const isNumric = /^\d*$/
      if (!isNumric.test(numericValue)) return

      setPrice(numericValue)
   }

   const handleStockChange = (e) => {
      const rawValue = e.target.value

      const isNumric = /^\d*$/
      if (!isNumric.test(rawValue)) return

      setStockNumber(rawValue)
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
         <form onSubmit={handleSubmit} encType="multipart/form-data">
         {/* 이미지 업로드 섹션 */}
         <div className="row mb-4">
            <div className="col-12">
               <div className="card">
                  <div className="card-header">
                     <h5 className="mb-0">
                        <iconify-icon icon="mdi:image" width="20" height="20" className="mr-2"></iconify-icon>
                        상품 이미지
                     </h5>
                  </div>
                  <div className="card-body">
                     <div className="mb-3">
                        <label className="btn btn-outline-primary btn-lg">
                           <iconify-icon icon="mdi:upload" width="20" height="20" className="mr-2"></iconify-icon>
                           이미지 업로드 (최대 5개)
                           <input 
                              type="file" 
                              name="img" 
                              accept="image/*" 
                              className="d-none" 
                              multiple 
                              onChange={handleImageChange} 
                           />
                        </label>
                        <small className="form-text text-muted ml-2">
                           JPG, PNG, GIF 파일만 업로드 가능합니다.
                        </small>
                     </div>

                     {/* 업로드된 이미지 미리보기 */}
                     {imgUrls.length > 0 && (
                        <div className="row">
                           {imgUrls.map((url, index) => (
                              <div key={index} className="col-md-3 col-sm-6 mb-3">
                                 <div className="card">
                                    <img 
                                       src={url} 
                                       alt={`업로드 이미지 ${index + 1}`} 
                                       className="card-img-top" 
                                       style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body p-2">
                                       <small className="text-muted">이미지 {index + 1}</small>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>

         {/* 상품 정보 입력 섹션 */}
         <div className="row mb-4">
            <div className="col-12">
               <div className="card">
                  <div className="card-header">
                     <h5 className="mb-0">
                        <iconify-icon icon="mdi:information" width="20" height="20" className="mr-2"></iconify-icon>
                        상품 정보
                     </h5>
                  </div>
                  <div className="card-body">
                     <div className="row">
                        <div className="col-md-6">
                           <InputField
                              label="상품명"
                              type="text"
                              name="itemNm"
                              value={itemNm}
                              inputChange={(e) => setItemNm(e.target.value)}
                              placeholder="상품명을 입력하세요"
                              required
                              maxLength={80}
                           />
                        </div>
                        <div className="col-md-6">
                           <InputField
                              label="가격 (포인트)"
                              type="text"
                              name="price"
                              value={formatWithComma(price)}
                              inputChange={handlePriceChange}
                              placeholder="가격을 입력하세요"
                              required
                              maxLength={10}
                           />
                        </div>
                     </div>

                     <div className="row">
                        <div className="col-md-4">
                           <InputField
                              label="재고 수량"
                              type="number"
                              name="stockNumber"
                              value={stockNumber}
                              inputChange={handleStockChange}
                              placeholder="재고 수량"
                              required
                              min="0"
                           />
                        </div>
                        <div className="col-md-4">
                           <FormSelect
                              label="판매 상태"
                              value={itemSellStatus}
                              onChange={(e) => setItemSellStatus(e.target.value)}
                              options={[
                                 { value: 'SELL', label: '판매중' },
                                 { value: 'SOLD_OUT', label: '품절' }
                              ]}
                              required
                           />
                        </div>
                        <div className="col-md-4">
                           <InputField
                              label="브랜드명"
                              type="text"
                              name="brandName"
                              value={brandName}
                              inputChange={(e) => setBrandName(e.target.value)}
                              placeholder="브랜드명을 입력하세요"
                              required
                              maxLength={100}
                           />
                        </div>
                     </div>

                     <div className="row">
                        <div className="col-md-6">
                           <InputField
                              label="판매업체명"
                              type="text"
                              name="vendorName"
                              value={vendorName}
                              inputChange={(e) => setVendorName(e.target.value)}
                              placeholder="판매업체명을 입력하세요"
                              required
                              maxLength={100}
                           />
                        </div>
                        <div className="col-md-6">
                           <InputField
                              label="상품 요약"
                              type="text"
                              name="itemSummary"
                              value={itemSummary}
                              inputChange={(e) => setItemSummary(e.target.value)}
                              placeholder="상품 요약을 입력하세요"
                              maxLength={180}
                           />
                        </div>
                     </div>

                     <InputField
                        label="상품 상세 설명"
                        type="textarea"
                        name="itemDetail"
                        value={itemDetail}
                        inputChange={(e) => setItemDetail(e.target.value)}
                        placeholder="상품에 대한 상세한 설명을 입력하세요"
                        rows={4}
                     />
                  </div>
               </div>
            </div>
         </div>

         {/* 버튼 섹션 */}
         <div className="row">
            <div className="col-12">
               <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-secondary btn-lg mr-3" onClick={() => window.history.back()}>
                     <iconify-icon icon="mdi:arrow-left" width="20" height="20" className="mr-2"></iconify-icon>
                     취소
                  </button>
                  <button type="submit" className="btn btn-primary btn-lg">
                     <iconify-icon icon="mdi:check" width="20" height="20" className="mr-2"></iconify-icon>
                     상품 등록
                  </button>
               </div>
            </div>
         </div>
      </form>
      </>
   )
}

export default ItemCreateForm
