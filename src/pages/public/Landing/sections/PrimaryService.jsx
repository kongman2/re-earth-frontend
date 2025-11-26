// re-earth-frontend/src/pages/public/Landing/sections/PrimaryService.jsx
import React from 'react'
import LandingSectionLayout from './LandingSectionLayout'
import PrimaryServiceSwiper from '../../../../components/randing/PrimaryServiceSwiper'
import './PrinmaryService.scss'

// 이미지 임포트
import icon1 from '../../../../assets/images/primary img1.png'
import icon2 from '../../../../assets/images/primary img2.png'
import icon3 from '../../../../assets/images/primary img3.png'
import icon4 from '../../../../assets/images/primary img4.png'

export default function PrimaryService() {
   const cards = [
      {
         id: 1,
         bgColor: '#FFCE55',
         icon: icon1,
         title: '환경은 지키고, 포인트는 쌓고',
         description: '대중교통 타고, 재활용하면 탄소중립포인트가 자동으로 적립돼요.'
      },
      {
         id: 2,
         bgColor: '#1D6FF2',
         icon: icon2,
         title: '버리면 쓰레기, 기부하면 포인트',
         description: '탄소 절감 + 포인트 + 소득공제까지, 착한 기부가 진짜 혜택이 됩니다.'
      },
      {
         id: 3,
         bgColor: '#FB6E52',
         icon: icon3,
         title: '포인트로 만나는 ESG 상품',
         description: '적립한 포인트로 환경 친화적 상품을 구매하고 더 나은 세상을 만들어가요.'
      },
      {
         id: 4,
         bgColor: '#D1E95D',
         icon: icon4,
         title: '혼자가 아닌, 함께여서 더 즐겁다',
         description: '소통하고, 나누고, 바꾸고, 즐기면서 라이프스타일로 만들어가요.'
      }
   ]

   return (
      <LandingSectionLayout
         sectionClass="ps-wrapper"
         rowClass="justify-content-center"
         titleSubtext="이렇게 해결할 수 있어요."
         titleText="Primary Service"
      >
         <PrimaryServiceSwiper cards={cards} />
      </LandingSectionLayout>
   )
}
