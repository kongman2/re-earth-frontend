import { useNavigate } from 'react-router-dom'
import donateImg from '../../../assets/images/헌옷기부.png'
import donateIcon from '../../../assets/icons/re-earth_donation_icon.png'
import InfoPageLayout from '../../../components/layout/InfoPageLayout'
import GuideCard from '../../../components/layout/GuideCard'
import Button from '../../../components/common/Button'

export default function DonationInfoPage() {
   const navigate = useNavigate()

   const goDonate = () => navigate('/donate')

   return (
      <InfoPageLayout
         heroTitle="기부하기"
         heroSub="Re:Wear(헌옷 기부하기)"
         heroTags="#recycling&nbsp;&nbsp;#헌옷기부&nbsp;&nbsp;#환경보호&nbsp;&nbsp;#탄소중립실천"
         guideTitle="기부안내"
         guideSub="Re:Wear Project (리:웨어 프로젝트) — 헌옷 기부 프로젝트"
         guideImage={
            <GuideCard variant="image">
               <img src={donateImg} alt="기부 박스" className="ttareungi-full-img" />
            </GuideCard>
         }
         guideQuote='"입던 옷, 다시 지구를 위한 가치로"'
         guideBody={`사용자는 옷을 기부하기만 하면 포인트가 자동 적립됩니다.
적립된 포인트는 기부, 친환경 쇼핑, 다양한 혜택으로 이어져 일상 속에서 탄소중립을 실천하는 선순환 구조를 완성합니다.`}
         guideCta={
            <>
               <Button variant="guide" className="d-flex align-items-center justify-content-center" fullWidth onClick={goDonate}>
                  기부하러가기
              <img className="cta-icon" src={donateIcon} alt="" aria-hidden="true" />
               </Button>
            </>
         }
         guideQuoteColor="#D1E95D"
      />
   )
}
