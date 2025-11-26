import './FAQpage.scss'
import askIcon from '../../../assets/icons/ask.svg'
import answerIcon from '../../../assets/icons/answer.svg'
import Pagination from '../../../components/common/Pagination'
import FormLayout from '../../../components/layout/FormLayout'
import faqData from './faqData'
import { useState } from 'react'
import { Icon } from '@iconify/react'

function FAQPage() {
   const [activeTab, setActiveTab] = useState('delivery')
   const [toggled, setToggled] = useState(null)
   const tabs = [
      { id: 'delivery', label: '배송' },
      { id: 'donation', label: '기부' },
      { id: 'savings', label: '인증/적립' },
      { id: 'order', label: '주문/결제' },
      { id: 'service', label: '서비스' },
      { id: 'etc', label: '기타' },
   ]

   return (
      <section id="main1" className="user-page faq-page">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-12 col-lg-10">
                  <FormLayout 
                     variant="wide" 
                     title="FAQ | 자주 묻는 질문" 
                     className="faq-form-layout"
                     onSubmit={(e) => e.preventDefault()}
                  >
                     {/* 탭 */}
                     <div className="faq--tab">
                        {tabs.map((tab) => (
                           <div 
                              key={tab.id} 
                              className={`tab ${tab.id} ${activeTab === tab.id ? 'active' : ''}`} 
                              onClick={() => setActiveTab(tab.id)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                 if (e.key === 'Enter' || e.key === ' ') {
                                    setActiveTab(tab.id);
                                 }
                              }}
                           >
                              {tab.label}
                           </div>
                        ))}
                     </div>
                     {/* 목록 */}
                     <div className="faq--board">
                        {faqData[activeTab].length > 0 ? (
                           faqData[activeTab].map((data, index) => (
                              <div className="faq--board--title" key={`content${index}`}>
                                 <div 
                                    className={`board--content ${toggled === index ? 'toggled' : ''}`} 
                                    onClick={() => setToggled(toggled === index ? null : index)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                       if (e.key === 'Enter' || e.key === ' ') {
                                          setToggled(toggled === index ? null : index);
                                       }
                                    }}
                                 >
                                    <img src={askIcon} alt="질문 아이콘" />
                                    <p>{data?.q}</p>
                                    <Icon 
                                       icon="mdi:chevron-down" 
                                       width={24} 
                                       height={24}
                                       className="faq-dropdown-icon"
                                    />
                                 </div>

                                 <div className={`board--toggle ${toggled === index ? 'open' : ''}`}>
                                    <img src={answerIcon} alt="답변 아이콘" />
                                    <p>{data?.a}</p>
                                 </div>
                              </div>
                           ))
                        ) : (
                           <p className="text-center mt-80 faq-empty">조회할 데이터가 없습니다.</p>
                        )}
                     </div>
                     <div className="faq-pagination">
                        <Pagination />
                     </div>
                  </FormLayout>
               </div>
            </div>
         </div>
      </section>
   )
}

export default FAQPage
