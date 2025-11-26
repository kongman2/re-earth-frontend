import reEarth from './http'

// 상품 등록
export const createItem = async (itemData) => {
   try {
      console.log('🔍 createItem API 호출 시작...')
      console.log('📤 FormData 내용:', itemData)
      
      // FormData 내용을 콘솔에 출력
      for (let [key, value] of itemData.entries()) {
         if (key === 'img') {
            console.log(`📷 ${key}:`, value.name, value.type, value.size)
         } else {
            console.log(`📝 ${key}:`, value)
         }
      }
      
      const response = await reEarth.post('/item', itemData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
      console.log('✅ createItem API 응답:', response)
      console.log('📦 생성된 item 데이터:', response.data.item)
      return response
   } catch (error) {
      console.error('❌ API Request 오류:', error)
      console.error('❌ 오류 상세:', error.response?.data)
      throw error
   }
}
//상품수정
export const updateItem = async (id, itemData) => {
   try {
      const response = await reEarth.put(`/item/${id}`, itemData, {
         headers: { 'Content-Type': 'multipart/form-data' },
      })
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}
// 상품 삭제
export const deleteItem = async (id) => {
   try {
      const response = await reEarth.delete(`/item/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류:${error}`)
      throw error
   }
}
// 목업 데이터
const MOCK_ITEMS = [
   {
      id: 1,
      itemNm: '친환경 텀블러',
      price: 15000,
      itemDetail: '스테인리스 스틸로 만든 친환경 텀블러입니다. 환경을 생각하는 소비자들에게 추천하는 제품으로, 내구성이 뛰어나고 자연 친화적입니다.',
      itemSummary: '친환경 텀블러',
      itemSellStatus: 'SELL',
      stockNumber: 50,
      brandName: '에코라이프',
      vendorName: '친환경상품전문점',
      createdAt: new Date().toISOString(),
      ItemImages: [
         { imgUrl: '/src/assets/images/친환경컵.png', repImgYn: 'Y' }
      ]
   },
   {
      id: 2,
      itemNm: '친환경 수건',
      price: 12000,
      itemDetail: '유기농 면으로 제작된 친환경 수건입니다. 부드럽고 흡수력이 뛰어나며, 천연 염색으로 건강에도 안전합니다.',
      itemSummary: '친환경 수건',
      itemSellStatus: 'SELL',
      stockNumber: 30,
      brandName: '그린브랜드',
      vendorName: '친환경업체',
      createdAt: new Date().toISOString(),
      ItemImages: [
         { imgUrl: '/src/assets/images/친환경수건.png', repImgYn: 'Y' }
      ]
   },
   {
      id: 3,
      itemNm: '태양광 충전기',
      price: 45000,
      itemDetail: '태양광으로 충전하는 친환경 충전기입니다. 야외 활동 시에도 친환경적으로 전자기기를 충전할 수 있습니다.',
      itemSummary: '태양광 충전기',
      itemSellStatus: 'SELL',
      stockNumber: 20,
      brandName: '솔라브랜드',
      vendorName: '친환경업체',
      createdAt: new Date().toISOString(),
      ItemImages: [
         { imgUrl: '/src/assets/images/태양광충전기.png', repImgYn: 'Y' }
      ]
   },
   {
      id: 4,
      itemNm: '나무 조명',
      price: 35000,
      itemDetail: '자연 나무로 만든 친환경 조명입니다. 따뜻한 나무 질감과 부드러운 조명으로 공간에 자연스러운 분위기를 연출합니다.',
      itemSummary: '나무 조명',
      itemSellStatus: 'SOLD_OUT',
      stockNumber: 0,
      brandName: '우드브랜드',
      vendorName: '친환경업체',
      createdAt: new Date().toISOString(),
      ItemImages: [
         { imgUrl: '/src/assets/images/나무조명.png', repImgYn: 'Y' }
      ]
   },
   {
      id: 5,
      itemNm: '재사용 가능한 장바구니',
      price: 8000,
      itemDetail: '천으로 만든 재사용 가능한 장바구니입니다. 플라스틱 봉투 사용을 줄이고 환경을 보호할 수 있습니다.',
      itemSummary: '재사용 장바구니',
      itemSellStatus: 'SELL',
      stockNumber: 100,
      brandName: '에코백',
      vendorName: '친환경상품전문점',
      createdAt: new Date().toISOString(),
      ItemImages: [
         { imgUrl: '/src/assets/images/친환경컵.png', repImgYn: 'Y' }
      ]
   },
   {
      id: 6,
      itemNm: '대나무 칫솔',
      price: 5000,
      itemDetail: '플라스틱 대신 대나무로 만든 친환경 칫솔입니다. 자연 분해가 가능하여 환경에 부담을 주지 않습니다.',
      itemSummary: '대나무 칫솔',
      itemSellStatus: 'SELL',
      stockNumber: 200,
      brandName: '밤부브랜드',
      vendorName: '친환경업체',
      createdAt: new Date().toISOString(),
      ItemImages: [
         { imgUrl: '/src/assets/images/친환경수건.png', repImgYn: 'Y' }
      ]
   },
   {
      id: 7,
      itemNm: '유리 용기 세트',
      price: 25000,
      itemDetail: '식품 저장용 유리 용기 세트입니다. 플라스틱 용기 대신 사용하여 건강하고 친환경적인 생활을 할 수 있습니다.',
      itemSummary: '유리 용기 세트',
      itemSellStatus: 'SELL',
      stockNumber: 40,
      brandName: '글래스브랜드',
      vendorName: '친환경상품전문점',
      createdAt: new Date().toISOString(),
      ItemImages: [
         { imgUrl: '/src/assets/images/태양광충전기.png', repImgYn: 'Y' }
      ]
   },
   {
      id: 8,
      itemNm: '천연 비누',
      price: 6000,
      itemDetail: '천연 원료로 만든 친환경 비누입니다. 화학 성분 없이 자연 그대로의 성분으로 만들어 피부에도 안전합니다.',
      itemSummary: '천연 비누',
      itemSellStatus: 'SELL',
      stockNumber: 150,
      brandName: '네이처브랜드',
      vendorName: '친환경업체',
      createdAt: new Date().toISOString(),
      ItemImages: [
         { imgUrl: '/src/assets/images/나무조명.png', repImgYn: 'Y' }
      ]
   },
   {
      id: 9,
      itemNm: 'LED 전구',
      price: 12000,
      itemDetail: '에너지 효율이 뛰어난 LED 전구입니다. 기존 백열등 대비 전력 소비를 80% 이상 줄일 수 있습니다.',
      itemSummary: 'LED 전구',
      itemSellStatus: 'SELL',
      stockNumber: 80,
      brandName: '에너지브랜드',
      vendorName: '친환경상품전문점',
      createdAt: new Date().toISOString(),
      ItemImages: [
         { imgUrl: '/src/assets/images/친환경컵.png', repImgYn: 'Y' }
      ]
   },
   {
      id: 10,
      itemNm: '재활용 종이 노트',
      price: 4000,
      itemDetail: '재활용 종이로 만든 노트입니다. 환경을 생각하는 학생과 직장인에게 추천하는 제품입니다.',
      itemSummary: '재활용 노트',
      itemSellStatus: 'SELL',
      stockNumber: 300,
      brandName: '리사이클브랜드',
      vendorName: '친환경업체',
      createdAt: new Date().toISOString(),
      ItemImages: [
         { imgUrl: '/src/assets/images/친환경수건.png', repImgYn: 'Y' }
      ]
   },
   {
      id: 11,
      itemNm: '천연 벌꿀',
      price: 18000,
      itemDetail: '무농약으로 키운 벌꿀입니다. 자연 그대로의 달콤함과 영양을 제공합니다.',
      itemSummary: '천연 벌꿀',
      itemSellStatus: 'SELL',
      stockNumber: 25,
      brandName: '허니브랜드',
      vendorName: '친환경상품전문점',
      createdAt: new Date().toISOString(),
      ItemImages: [
         { imgUrl: '/src/assets/images/태양광충전기.png', repImgYn: 'Y' }
      ]
   },
   {
      id: 12,
      itemNm: '대나무 스트로우',
      price: 3000,
      itemDetail: '일회용 플라스틱 스트로우 대신 사용할 수 있는 대나무 스트로우입니다. 세척 후 재사용이 가능합니다.',
      itemSummary: '대나무 스트로우',
      itemSellStatus: 'SOLD_OUT',
      stockNumber: 0,
      brandName: '밤부브랜드',
      vendorName: '친환경업체',
      createdAt: new Date().toISOString(),
      ItemImages: [
         { imgUrl: '/src/assets/images/나무조명.png', repImgYn: 'Y' }
      ]
   }
]

//전체 상품 리스트 가져오기
export const getItems = async () => {
   try {
      const response = await reEarth.get(`/item`)
      
      // 빈 배열이거나 데이터가 없을 때 목업 데이터 반환
      if (!response.data.items || response.data.items.length === 0) {
         return MOCK_ITEMS
      }
      
      return response.data.items
   } catch (error) {
      // 419 (토큰 만료) 또는 기타 인증 오류는 조용히 처리
      const status = error.response?.status
      const isAuthError = status === 419 || status === 401 || status === 403
      
      // 인증 오류가 아닌 경우에만 에러 로그 출력
      if (!isAuthError) {
         console.error('❌ API Request 오류:', error)
      }
      
      // 백엔드 서버 연결 실패 또는 인증 오류 시 목업 데이터 반환
      return MOCK_ITEMS
   }
}

// 특정 상품 가져오기
export const getItemById = async (id) => {
   try {
      console.log('🔍 getItemById API 호출 시작...', id)
      const response = await reEarth.get(`/item/${id}`)
      console.log('✅ getItemById API 응답:', response)
      console.log('📦 item 데이터:', response.data.item)
      return response
   } catch (error) {
      // 419 (토큰 만료) 또는 기타 인증 오류는 조용히 처리
      const status = error.response?.status
      const isAuthError = status === 419 || status === 401 || status === 403
      
      if (!isAuthError) {
         console.error('❌ API Request 오류:', error)
         console.error('❌ 오류 상세:', error.response?.data)
      } else {
         // 인증 오류는 개발 환경에서 흔하므로 조용히 처리
         console.log('⚠️ 인증 오류 발생 (토큰 만료 등), 목업 데이터 사용')
      }
      
      // 백엔드 서버 연결 실패 또는 인증 오류 시 목업 데이터에서 해당 ID 찾기
      console.log('🔄 목업 데이터에서 상품 찾기...')
      const item = MOCK_ITEMS.find(item => item.id === parseInt(id))
      if (item) {
         return { data: { item } }
      } else {
         throw new Error('상품을 찾을 수 없습니다.')
      }
   }
}
